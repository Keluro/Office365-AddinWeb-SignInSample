import {GlobalController, IGlobalControllerScope} from "controllers/GlobalController"
import {ServerService} from "services/ServerServices";
import {IOfficeService} from "services/IOfficeService";
import {Util} from "Util/Util";
import {SignalRService} from "services/SignalRService"
import {UserInfoDto, LightUserInfoDto, MailUserInfoDto} from "models/UserInfoDto"

//Controller used in Web app (not add-in) supports the ability to choose language.
export class OfficeGlobalController extends GlobalController {
    public useDialogApi: boolean;
    public showSignOut: boolean;
    public signOutUrl: string;

    public constructor($scope: IGlobalControllerScope, $q: ng.IQService,
        $location: ng.ILocationService, $state: ng.ui.IStateService,
        $timeout: ng.ITimeoutService, $window: ng.IWindowService,
        serverService: ServerService, protected officeService: IOfficeService,
        signalRService: SignalRService) {

        super($scope, $q, $location, $state, $window, serverService,  signalRService);
        this.useDialogApi = this.officeService.hasDialogApi();
        this.showSignOut = false;

        signalRService.getSignalRefId().then((signalRRef: string) => {
            this.signOutUrl = this.serverService.getAccountSignOutUrl(signalRRef);
            this.showSignOut = true;
        });

        $scope.$on('event:checkcompatitbility', () => {
            this.checkcompatibility();
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

    public clickSignout(): void {
        if (this.useDialogApi) {
            var completeUrl = this.serverService.toFullUrl(this.signOutUrl);
            this.officeService.showDialog(completeUrl);
        } else {
            this.$window.open(this.signOutUrl, '_target');
        }

        this.$state.go('waiting');
    }

    public clickOpenLibraryInAnotherWindow() {
        if (this.useDialogApi) {
            var completeUrl = this.serverService.toFullUrl("/");
            this.officeService.showDialog(completeUrl);
        } else {
            this.$window.open("/", "_blank");
        }
    }
}