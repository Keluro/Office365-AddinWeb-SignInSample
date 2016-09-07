import {AuthenticationInterceptor} from "services/ErrorHttpInterceptor";
import {ServerService} from "services/ServerServices";
import {LoaderClearer} from "Util/LoaderClearer";
import {Util} from "Util/Util"
import {Routes} from "routesRegistrar"
import {ItemsRegistrar} from "itemsRegistrar"

var addin = angular.module("addin", ['ui.router']);

//Set up our site routes
addin.config(($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $httpProvider: ng.IHttpProvider) => {
    //angular-ui-router for multiple views
    Routes.RegisterWebRoutes($stateProvider, $urlRouterProvider, true);
    $httpProvider.interceptors.push(AuthenticationInterceptor.Factory);
});

addin.run(($rootScope: ng.IRootScopeService, $http: ng.IHttpService, $q: ng.IQService, $location: ng.ILocationService) => {
    $rootScope.$on('$locationChangeSuccess', (event: any, args: any) => {
        if (!Util.endsWith(args, "waiting")) {
            //check compatibility between authentications... mailbox and server..
            //do not check connection in login phase
            $rootScope.$broadcast('event:checkcompatitbility');
        }
    });
   
    LoaderClearer.StopLoader();
});

ItemsRegistrar.RegisterAddinItems(addin);

export default addin;