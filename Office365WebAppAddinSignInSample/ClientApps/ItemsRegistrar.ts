import {NoOfficeNotConnectedController, OfficeWrongConnectedController} from "controllers/WrongConnectedController";
import {NoOfficeMainController} from "controllers/NoOfficeGlobalController";
import {OfficeGlobalController} from "controllers/OfficeGlobalController";
import {OfficeService} from "services/OfficeService";
import {SignalRService} from "services/SignalRService";
import {FakeOfficeService} from "services/FakeOfficeService";
import {ServerService} from "services/ServerServices";

export class WebControllerNames {
    public static WebAppController = "WebAppController";
    public static WrongConnectedController = "WrongConnectedController";
    public static GlobalController = "GlobalController";
}

export class ItemsRegistrar {
    public static RegisterWebItems(module: ng.IModule) {
        var hasOfficeContext = (<any>window).hasOfficeContext === true;

        /*CONTROLLERS*/
        //module.controller(WebControllerNames.WebAppController, ["$scope", "$state", "$stateParams", "$timeout", "ServerService", WebAppController]);
        if (hasOfficeContext) {
            module.controller(WebControllerNames.WrongConnectedController, ["$scope", "$state", "$window", "ApplicationContextService", "ServerService", "SignalRService", "OfficeService", OfficeWrongConnectedController]);
        } else {
            module.controller(WebControllerNames.WrongConnectedController, ["$scope", "$window", "ApplicationContextService", "ServerService", NoOfficeNotConnectedController]);
        }
        module.controller(WebControllerNames.GlobalController, ["$scope", "$q", "$location", "$state", "$timeout", "$window", "ServerService", "OfficeService", "LocalizedStringsService", "SignalRService", hasOfficeContext ? OfficeGlobalController : NoOfficeMainController]);

        /*SERVICES*/
        if (hasOfficeContext) {
            module.service("OfficeService", ["$q", "ServerService", OfficeService]);
        } else {
            module.service("OfficeService", ["$q", FakeOfficeService]);
        }

        module.service("ServerService", ["$http", "$q", ServerService]);
        module.service("SignalRService", ["$q", "$timeout", "$location", "ServerService", "OfficeService", SignalRService]);
    }
}
 