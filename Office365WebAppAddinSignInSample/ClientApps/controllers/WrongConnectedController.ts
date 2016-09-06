import {ServerService} from "services/ServerServices";
import {Util} from "Util/Util"
import {GlobalController, IGlobalControllerScope} from "controllers/GlobalController";
import {SignalRService} from "services/SignalRService"
import {IOfficeService} from "services/IOfficeService"

export interface INotConnectedControllerScope extends IGlobalControllerScope {
    notConnectedCtrl: INotConnectedController;
}

export interface INotConnectedController {
    showSignInButton: boolean;
    showPopupInstruction: boolean;
    signIn: () => void;

}

class WrongConnectedController {
    
    constructor(protected $window: ng.IWindowService) {
    }

}

export class NoOfficeNotConnectedController extends WrongConnectedController implements INotConnectedController {

    public showSignInButton: boolean;
    public showPopupInstruction: boolean;
    private noPopupSignInUrl: string;

    public constructor(private $scope: INotConnectedControllerScope,
        $window: ng.IWindowService,
        private serverService: ServerService) {
        super($window);
        this.$scope.notConnectedCtrl = this;

        this.showPopupInstruction = false;
        this.noPopupSignInUrl = this.serverService.getAccountSignInUrl();
        this.showSignInButton = true;
    }

    public signIn() {
        this.$window.location.href = this.noPopupSignInUrl; //no popup in the web app
    }
}


export interface IAddInWrongConnectedControllerScope extends INotConnectedControllerScope {
    wrongNotConnectedAddinCtrl: OfficeWrongConnectedController;
}

export class OfficeWrongConnectedController extends WrongConnectedController implements INotConnectedController {
    public emailFromServer: string;
    public emailFromApp: string;
    public showSignInButton: boolean;
    public showPopupInstruction: boolean;

    private signInUrlWithRefId: string;
    private signOutUrlWithRefId: string;
    private useDialogApi: boolean;

    public static RegenerateSecretKey: string = "event:regeneratesecret";

    constructor(private $scope: IAddInWrongConnectedControllerScope,
        private $state: ng.ui.IStateService,
        $window: ng.IWindowService,
        private serverService: ServerService,
        private signalRService: SignalRService, private officeService: IOfficeService) {
        super($window);
        $scope.wrongNotConnectedAddinCtrl = this;
        $scope.notConnectedCtrl = this;

        this.emailFromServer = $scope.globalCtrl.emailFromServer;
        this.emailFromApp = $scope.globalCtrl.emailFromApp;

        this.regenerateId();

        $scope.$on(OfficeWrongConnectedController.RegenerateSecretKey, () => {
            this.regenerateId();
        });

        this.useDialogApi = this.officeService.hasDialogApi();
        this.showPopupInstruction = !this.useDialogApi;
    }

    private regenerateId(): void {
        this.showSignInButton = false;
        this.signalRService.getSignalRefId().then((signalRRef: string) => {
            this.signInUrlWithRefId = this.serverService.getAccountSignInUrl(signalRRef);
            this.signOutUrlWithRefId = this.serverService.getAccountSignOutUrl(signalRRef);
            this.showSignInButton = true;
        });
    }

    public signIn() {
        if (this.useDialogApi) {
            var completeUrl = this.serverService.toFullUrl(this.signInUrlWithRefId);
            this.officeService.showDialog(completeUrl);
        } else {
            this.$window.open(this.signInUrlWithRefId, '_blank');
        }
        this.$state.go('waiting');
    }

    public signOut() {
        if (this.useDialogApi) {
            var completeUrl = this.serverService.toFullUrl(this.signOutUrlWithRefId);
            this.officeService.showDialog(completeUrl);
        } else {
            this.$window.open(this.signOutUrlWithRefId, '_blank');
        }
        this.$state.go('waiting');
    }
}
