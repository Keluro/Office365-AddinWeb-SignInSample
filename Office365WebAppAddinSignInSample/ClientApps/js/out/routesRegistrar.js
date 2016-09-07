System.register(["ItemsRegistrar"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ItemsRegistrar_1;
    var Routes;
    return {
        setters:[
            function (ItemsRegistrar_1_1) {
                ItemsRegistrar_1 = ItemsRegistrar_1_1;
            }],
        execute: function() {
            Routes = (function () {
                function Routes() {
                }
                Routes.RegisterWebRoutes = function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state('logged', {
                        url: "/",
                        abstract: true,
                        views: {
                            "global@": {
                                templateUrl: '/AppRead/views/WebApp.html',
                                controller: ItemsRegistrar_1.WebControllerNames.WebAppController
                            }
                        }
                    })
                        .state('notconnected', {
                        url: "/notconnected",
                        views: {
                            "global@": {
                                templateUrl: '/AppRead/views/NotConnected.html',
                                controller: ItemsRegistrar_1.WebControllerNames.WrongConnectedController
                            }
                        }
                    })
                        .state('waiting', {
                        url: "/waiting",
                        views: {
                            "global@": { templateUrl: '/AppRead/views/Waiting.html' }
                        }
                    });
                    $urlRouterProvider.otherwise('/');
                };
                Routes.RegisterAddinRoutes = function ($stateProvider, $urlRouterProvider) {
                };
                return Routes;
            }());
            exports_1("Routes", Routes);
        }
    }
});
//# sourceMappingURL=../../ClientApps/routesRegistrar.js.map