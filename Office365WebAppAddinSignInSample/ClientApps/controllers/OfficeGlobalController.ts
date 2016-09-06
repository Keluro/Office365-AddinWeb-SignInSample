import {GlobalController, IGlobalControllerScope} from "controllers/GlobalController"
import {ServerService} from "services/ServerServices";
import {IOfficeService} from "services/IOfficeService";
import {Util} from "Util/Util";
import {SignalRService} from "services/SignalRService"

//Controller used in Web app (not add-in) supports the ability to choose language.
export class OfficeGlobalController extends GlobalController {
    public useDialogApi: boolean;
    public showSignOut: boolean;
    public signOutUrl: string;

    public constructor($scope: IGlobalControllerScope,
        $q: ng.IQService, $location: ng.ILocationService, $state: ng.ui.IStateService, $timeout: ng.ITimeoutService, $window: ng.IWindowService,
        serverService: ServerService, officeService: IOfficeService, signalRService: SignalRService) {
        super($scope, $q, $location, $state, $window, serverService, officeService,  signalRService);
        
        this.useDialogApi = this.officeService.hasDialogApi();

        this.showSignOut = false;

        signalRService.getSignalRefId().then((signalRRef: string) => {
            this.signOutUrl = this.serverService.getAccountSignOutUrl(signalRRef);
            this.showSignOut = true;
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