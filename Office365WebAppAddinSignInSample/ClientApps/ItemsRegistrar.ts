import {NoOfficeWrongConnectedController, OfficeWrongConnectedController} from "controllers/WrongConnectedController";
import {NoOfficeGlobalController} from "controllers/NoOfficeGlobalController";
import {OfficeGlobalController} from "controllers/OfficeGlobalController";
import {OfficeService} from "services/OfficeService";
import {SignalRService} from "services/SignalRService";
import {ServerService} from "services/ServerServices";

export class ControllerNames {
    public static WrongConnectedController = "WrongConnectedController";
    public static GlobalController = "GlobalController";
}

export class ItemsRegistrar {
    public static RegisterWebItems(module: ng.IModule) {
        //this command is set when we display the web app in Outlook modules
        //http://dev.office.com/docs/add-ins/outlook/extension-module-outlook-add-ins
        var hasOfficeContext = (<any>window).hasOfficeContext === true; 
        ItemsRegistrar.Register(module, hasOfficeContext);
    }

    private static Register(module: ng.IModule, hasOfficeContext): void {
        /*CONTROLLERS*/
        if (hasOfficeContext) {
            module.service("OfficeService", ["$q", "ServerService", OfficeService]);
            module.controller(ControllerNames.WrongConnectedController, ["$scope", "$state", "$window", "ServerService", "SignalRService", "OfficeService", OfficeWrongConnectedController]);
            module.controller(ControllerNames.GlobalController, ["$scope", "$q", "$location", "$state", "$timeout", "$window", "ServerService", "OfficeService", "SignalRService", OfficeGlobalController]);
        } else {
            module.controller(ControllerNames.WrongConnectedController, ["$scope", "$window", "ServerService", NoOfficeWrongConnectedController]);
            module.controller(ControllerNames.GlobalController, ["$scope", "$q", "$location", "$state", "$timeout", "$window", "ServerService", "SignalRService", hasOfficeContext ? OfficeGlobalController : NoOfficeGlobalController]);
        }

        module.service("ServerService", ["$http", "$q", ServerService]);
        module.service("SignalRService", ["$q", "$timeout", "$location", "ServerService", "OfficeService", SignalRService]);
    }

    public static RegisterAddinItems(module: ng.IModule) {
        ItemsRegistrar.Register(module, true);
    }
}
 