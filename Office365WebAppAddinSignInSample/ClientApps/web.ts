import {AuthenticationInterceptor} from "services/ErrorHttpInterceptor";
import {ServerService} from "services/ServerServices";
import {Util} from "Util/Util"
import {LoaderClearer} from "Util/LoaderClearer";
import {Routes} from "routesRegistrar"
import {ItemsRegistrar} from "itemsRegistrar"

var web = angular.module("web", ['ui.router']);

//Set up our site routes
web.config(($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $httpProvider: ng.IHttpProvider, $windowProvider: any) => {
    //angular-ui-router for multiple views
    Routes.RegisterWebRoutes($stateProvider, $urlRouterProvider, false);
    $httpProvider.interceptors.push(AuthenticationInterceptor.Factory);
});

web.run(($rootScope: ng.IRootScopeService, $http: ng.IHttpService, $q: ng.IQService, $location: ng.ILocationService) => {
    $rootScope.$on('$locationChangeSuccess', (event: any, args: string) => {
        if (!(Util.endsWith(args, ServerService.SignIn) || Util.endsWith(args, ServerService.SignOut) || Util.endsWith(args, "waiting"))) { //do not check connection in login phase
            $rootScope.$broadcast('event:checkconnection');
        }
    });
    LoaderClearer.StopLoader();
});

ItemsRegistrar.RegisterWebItems(web);

export default web;