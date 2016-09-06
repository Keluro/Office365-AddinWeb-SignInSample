import {GlobalController, IGlobalControllerScope} from "controllers/GlobalController"
import {ServerService} from "services/ServerServices";
import {IOfficeService} from "services/IOfficeService";
import {Util} from "Util/Util"
import {SignalRService} from "services/SignalRService"

//Controller used in Web app (not add-in) supports the ability to choose language.
export class NoOfficeMainController extends GlobalController {
    public selectedLangValue: string;
    public langs: [{ Value: string; Display: string }];

    public isSuperAdmin: boolean;
    public showSignOut: boolean;

    public constructor($scope: IGlobalControllerScope,
        $q: ng.IQService, $location: ng.ILocationService, $state: ng.ui.IStateService, $timeout: ng.ITimeoutService, $window: ng.IWindowService,
        serverService: ServerService, officeService: IOfficeService, signalRService: SignalRService) {
        super($scope, $q, $location, $state, $window, serverService, officeService, signalRService);

        //The chosen language will be the one used by the add-in and stored in localstorage.
      
        this.showSignOut = true;
    }

    public clickSignout() {
        var signOutUrl = this.serverService.getAccountSignOutUrl();
        this.$window.location.href = signOutUrl;
    }
}