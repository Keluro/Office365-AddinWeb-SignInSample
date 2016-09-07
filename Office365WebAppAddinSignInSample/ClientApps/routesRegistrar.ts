import {ControllerNames} from "ItemsRegistrar"
export class Routes {
    public static RegisterWebRoutes($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, isAddin: boolean): void {
        $stateProvider
            .state('logged', <ng.ui.IState>{
                url: "/",
                views: {
                    "main@": {
                        templateUrl: isAddin ? '/ClientApps/views/Addin.html' : '/ClientApps/views/WebApp.html',
                    }
                }
            })
            .state('notconnected', <ng.ui.IState>{
                url: "/notconnected",
                views: {
                    "main@": {
                        templateUrl: '/ClientApps/views/NotConnected.html',
                        controller: ControllerNames.WrongConnectedController
                    }
                }
            })
            .state('badconnected', <ng.ui.IState>{
                url: "/badconnected",
                views: {
                    "main@": {
                        templateUrl: '/ClientApps/views/BadConnected.html',
                        controller: ControllerNames.WrongConnectedController
                    }
                }
            })
            .state('waiting', <ng.ui.IState>{
                url: "/waiting",
                views: {
                    "main@": { templateUrl: '/ClientApps/views/Waiting.html' }
                }
            });
        $urlRouterProvider.otherwise('/');
    }
}