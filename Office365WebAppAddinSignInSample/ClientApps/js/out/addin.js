System.register(["services/ErrorHttpInterceptor", "Util/LoaderClearer", "Util/Util", "routesRegistrar", "itemsRegistrar"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ErrorHttpInterceptor_1, LoaderClearer_1, Util_1, routesRegistrar_1, itemsRegistrar_1;
    var addin;
    return {
        setters:[
            function (ErrorHttpInterceptor_1_1) {
                ErrorHttpInterceptor_1 = ErrorHttpInterceptor_1_1;
            },
            function (LoaderClearer_1_1) {
                LoaderClearer_1 = LoaderClearer_1_1;
            },
            function (Util_1_1) {
                Util_1 = Util_1_1;
            },
            function (routesRegistrar_1_1) {
                routesRegistrar_1 = routesRegistrar_1_1;
            },
            function (itemsRegistrar_1_1) {
                itemsRegistrar_1 = itemsRegistrar_1_1;
            }],
        execute: function() {
            addin = angular.module("addin", ['ui.router']);
            addin.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
                routesRegistrar_1.Routes.RegisterWebRoutes($stateProvider, $urlRouterProvider, true);
                $httpProvider.interceptors.push(ErrorHttpInterceptor_1.AuthenticationInterceptor.Factory);
            });
            addin.run(function ($rootScope, $http, $q, $location) {
                $rootScope.$on('$locationChangeSuccess', function (event, args) {
                    if (!Util_1.Util.endsWith(args, "waiting")) {
                        $rootScope.$broadcast('event:checkcompatitbility');
                    }
                });
                LoaderClearer_1.LoaderClearer.StopLoader();
            });
            itemsRegistrar_1.ItemsRegistrar.RegisterAddinItems(addin);
            exports_1("default",addin);
        }
    }
});
//# sourceMappingURL=../../ClientApps/addin.js.map