import {ServerService} from "services/ServerServices";
import {IOfficeService} from "services/IOfficeService";
import {Util} from "Util/Util"
import {SignalRService} from "services/SignalRService"
import {UserInfoDto, LightUserInfoDto, MailUserInfoDto} from "models/UserInfoDto"
import {OfficeWrongConnectedController} from "controllers/WrongConnectedController";


export interface IGlobalControllerScope extends ng.IRootScopeService {
    globalCtrl: GlobalController;
}


export abstract class GlobalController {

    public static NotConnectedEvent = "event:notconnected";

    public isLogged: boolean;
    public emailFromApp: string;
    public emailFromServer: string;
    public userName: string;
   
    constructor(protected $scope: IGlobalControllerScope,
        protected $q: ng.IQService, protected $location: ng.ILocationService,
        protected $state: ng.ui.IStateService,
        protected $window: ng.IWindowService,
        protected serverService: ServerService,
        protected officeService: IOfficeService, protected signalRService: SignalRService) {

        $scope.globalCtrl = this;
        $scope.$on('event:checkcompatitbility', () => {
            this.checkcompatibility();
        });

        $scope.$on('event:checkconnection', () => {
            this.serverService.getUserInfo()
                .then((userEmail) => {
                    this.userName = '';
                    this.emailFromServer = userEmail.Email;
                    this.emailFromApp = userEmail.Email;
                    this.isLogged = true;
                }, () => {
                    this.userName = '';
                    this.emailFromServer = '';
                    this.emailFromApp = '';
                    this.isLogged = false;
                    this.$state.go('notconnected');
                });
        });

        $scope.$on(GlobalController.NotConnectedEvent, () => {
            this.userName = '';
            this.isLogged = false;
            $scope.$broadcast(OfficeWrongConnectedController.RegenerateSecretKey);
            this.$state.go('notconnected');
        });
    }

   
    private checkcompatibility(): void {
        var userEmailPromise = this.serverService.getUserInfo();
        var userInfo: LightUserInfoDto = this.officeService.getMyUserInfo();
        userEmailPromise.then((infoFromServer: MailUserInfoDto) => {
            if (Util.compareCaseInsensitive(userInfo.UpnName, infoFromServer.UpnName) || Util.compareCaseInsensitive(userInfo.UpnName, infoFromServer.Email)) {
                this.userName = userInfo.DisplayName;
                this.emailFromServer = infoFromServer.Email;
                this.isLogged = true;
            } else {
                this.userName = userInfo.DisplayName;
                this.emailFromServer = infoFromServer.Email;
                this.emailFromApp = userInfo.UpnName;
                this.isLogged = false;
                this.$state.go('badconnected');
            }
        });
    }

    public isActive(viewLocation) {
        var path: string = this.$location.path();
        return viewLocation === path;
    }

    abstract clickSignout(): void;
}
