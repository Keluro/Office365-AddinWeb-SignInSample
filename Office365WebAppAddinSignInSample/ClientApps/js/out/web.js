System.register(["services/ErrorHttpInterceptor", "services/ServerServices", "Util/Util", "Util/LoaderClearer", "routesRegistrar", "itemsRegistrar"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ErrorHttpInterceptor_1, ServerServices_1, Util_1, LoaderClearer_1, routesRegistrar_1, itemsRegistrar_1;
    var web;
    return {
        setters:[
            function (ErrorHttpInterceptor_1_1) {
                ErrorHttpInterceptor_1 = ErrorHttpInterceptor_1_1;
            },
            function (ServerServices_1_1) {
                ServerServices_1 = ServerServices_1_1;
            },
            function (Util_1_1) {
                Util_1 = Util_1_1;
            },
            function (LoaderClearer_1_1) {
                LoaderClearer_1 = LoaderClearer_1_1;
            },
            function (routesRegistrar_1_1) {
                routesRegistrar_1 = routesRegistrar_1_1;
            },
            function (itemsRegistrar_1_1) {
                itemsRegistrar_1 = itemsRegistrar_1_1;
            }],
        execute: function() {
            web = angular.module("web", ['ui.router']);
            web.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $windowProvider) {
                routesRegistrar_1.Routes.RegisterWebRoutes($stateProvider, $urlRouterProvider, false);
                $httpProvider.interceptors.push(ErrorHttpInterceptor_1.AuthenticationInterceptor.Factory);
            });
            web.run(function ($rootScope, $http, $q, $location) {
                $rootScope.$on('$locationChangeSuccess', function (event, args) {
                    if (!(Util_1.Util.endsWith(args, ServerServices_1.ServerService.SignIn) || Util_1.Util.endsWith(args, ServerServices_1.ServerService.SignOut) || Util_1.Util.endsWith(args, "waiting"))) {
                        $rootScope.$broadcast('event:checkconnection');
                    }
                });
                LoaderClearer_1.LoaderClearer.StopLoader();
            });
            itemsRegistrar_1.ItemsRegistrar.RegisterWebItems(web);
            exports_1("default",web);
        }
    }
});
//# sourceMappingURL=../../ClientApps/web.js.map