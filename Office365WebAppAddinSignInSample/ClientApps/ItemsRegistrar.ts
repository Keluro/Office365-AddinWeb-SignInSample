import {NoOfficeWrongConnectedController, OfficeWrongConnectedController} from "controllers/WrongConnectedController";
import {NoOfficeGlobalController} from "controllers/NoOfficeGlobalController";
import {OfficeGlobalController} from "controllers/OfficeGlobalController";
import {OfficeService} from "services/OfficeService";
import {SignalRService} from "services/SignalRService";
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
        if (hasOfficeContext) {
            module.controller(WebControllerNames.WrongConnectedController, ["$scope", "$state", "$window", "ServerService", "SignalRService", "OfficeService", OfficeWrongConnectedController]);
            module.controller(WebControllerNames.GlobalController, ["$scope", "$q", "$location", "$state", "$timeout", "$window", "ServerService", "OfficeService", "SignalRService", OfficeGlobalController]);
        } else {
            module.service("OfficeService", ["$q", "ServerService", OfficeService]);
            module.controller(WebControllerNames.WrongConnectedController, ["$scope", "$window", "ServerService", NoOfficeWrongConnectedController]);
            module.controller(WebControllerNames.GlobalController, ["$scope", "$q", "$location", "$state", "$timeout", "$window", "ServerService", "SignalRService", hasOfficeContext ? OfficeGlobalController : NoOfficeGlobalController]);
        }
       
        module.service("ServerService", ["$http", "$q", ServerService]);
        module.service("SignalRService", ["$q", "$timeout", "$location", "ServerService", "OfficeService", SignalRService]);
    }
}
 