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
                        views: {
                            "main@": {
                                templateUrl: '/ClientApps/views/WebApp.html',
                            }
                        }
                    })
                        .state('notconnected', {
                        url: "/notconnected",
                        views: {
                            "main@": {
                                templateUrl: '/ClientApps/views/NotConnected.html',
                                controller: ItemsRegistrar_1.WebControllerNames.WrongConnectedController
                            }
                        }
                    })
                        .state('badconnected', {
                        url: "/badconnected",
                        views: {
                            "main@": {
                                templateUrl: '/ClientApps/views/BadConnected.html',
                                controller: ItemsRegistrar_1.WebControllerNames.WrongConnectedController
                            }
                        }
                    })
                        .state('waiting', {
                        url: "/waiting",
                        views: {
                            "main@": { templateUrl: '/ClientApps/views/Waiting.html' }
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