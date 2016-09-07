import {GlobalController, IGlobalControllerScope} from "controllers/GlobalController"
import {ServerService} from "services/ServerServices";
import {IOfficeService} from "services/IOfficeService";
import {Util} from "Util/Util"
import {SignalRService} from "services/SignalRService"

export class NoOfficeGlobalController extends GlobalController {
    public showSignOut: boolean;

    public constructor($scope: IGlobalControllerScope, $q: ng.IQService,
        $location: ng.ILocationService, $state: ng.ui.IStateService,
        $timeout: ng.ITimeoutService, $window: ng.IWindowService,
        serverService: ServerService, signalRService: SignalRService) {

        super($scope, $q, $location, $state, $window, serverService, signalRService);
        this.showSignOut = true;
    }

    public clickSignout() {
        var signOutUrl = this.serverService.getAccountSignOutUrl();
        this.$window.location.href = signOutUrl;
    }
}