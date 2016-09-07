System.register(["controllers/WrongConnectedController", "controllers/NoOfficeGlobalController", "controllers/OfficeGlobalController", "services/OfficeService", "services/SignalRService", "services/ServerServices"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WrongConnectedController_1, NoOfficeGlobalController_1, OfficeGlobalController_1, OfficeService_1, SignalRService_1, ServerServices_1;
    var WebControllerNames, ItemsRegistrar;
    return {
        setters:[
            function (WrongConnectedController_1_1) {
                WrongConnectedController_1 = WrongConnectedController_1_1;
            },
            function (NoOfficeGlobalController_1_1) {
                NoOfficeGlobalController_1 = NoOfficeGlobalController_1_1;
            },
            function (OfficeGlobalController_1_1) {
                OfficeGlobalController_1 = OfficeGlobalController_1_1;
            },
            function (OfficeService_1_1) {
                OfficeService_1 = OfficeService_1_1;
            },
            function (SignalRService_1_1) {
                SignalRService_1 = SignalRService_1_1;
            },
            function (ServerServices_1_1) {
                ServerServices_1 = ServerServices_1_1;
            }],
        execute: function() {
            WebControllerNames = (function () {
                function WebControllerNames() {
                }
                WebControllerNames.WrongConnectedController = "WrongConnectedController";
                WebControllerNames.GlobalController = "GlobalController";
                return WebControllerNames;
            }());
            exports_1("WebControllerNames", WebControllerNames);
            ItemsRegistrar = (function () {
                function ItemsRegistrar() {
                }
                ItemsRegistrar.RegisterWebItems = function (module) {
                    var hasOfficeContext = window.hasOfficeContext === true;
                    if (hasOfficeContext) {
                        module.controller(WebControllerNames.WrongConnectedController, ["$scope", "$state", "$window", "ServerService", "SignalRService", "OfficeService", WrongConnectedController_1.OfficeWrongConnectedController]);
                        module.controller(WebControllerNames.GlobalController, ["$scope", "$q", "$location", "$state", "$timeout", "$window", "ServerService", "OfficeService", "SignalRService", OfficeGlobalController_1.OfficeGlobalController]);
                    }
                    else {
                        module.service("OfficeService", ["$q", "ServerService", OfficeService_1.OfficeService]);
                        module.controller(WebControllerNames.WrongConnectedController, ["$scope", "$window", "ServerService", WrongConnectedController_1.NoOfficeWrongConnectedController]);
                        module.controller(WebControllerNames.GlobalController, ["$scope", "$q", "$location", "$state", "$timeout", "$window", "ServerService", "SignalRService", hasOfficeContext ? OfficeGlobalController_1.OfficeGlobalController : NoOfficeGlobalController_1.NoOfficeGlobalController]);
                    }
                    module.service("ServerService", ["$http", "$q", ServerServices_1.ServerService]);
                    module.service("SignalRService", ["$q", "$timeout", "$location", "ServerService", "OfficeService", SignalRService_1.SignalRService]);
                };
                return ItemsRegistrar;
            }());
            exports_1("ItemsRegistrar", ItemsRegistrar);
        }
    }
});
//# sourceMappingURL=../../ClientApps/ItemsRegistrar.js.map