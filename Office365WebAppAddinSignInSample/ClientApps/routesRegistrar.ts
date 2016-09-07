import {WebControllerNames} from "ItemsRegistrar"
export class Routes {
    public static RegisterWebRoutes($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider): void {
        $stateProvider
            .state('logged', <ng.ui.IState>{
                url: "/",
                abstract: true,
                views: {
                    "global@": {
                        templateUrl: '/ClientApps/views/WebApp.html',
                        controller: WebControllerNames.WebAppController
                    }
                }
            })
            .state('notconnected', <ng.ui.IState>{
                url: "/notconnected",
                views: {
                    "global@": {
                        templateUrl: '/ClientApps/views/NotConnected.html',
                        controller: WebControllerNames.WrongConnectedController
                    }
                }
            })
            .state('badconnected', <ng.ui.IState>{
                url: "/badconnected",
                views: {
                    "global@": {
                        templateUrl: '/ClientApps/views/BadConnected.html',
                        controller: WebControllerNames.WrongConnectedController
                    }
                }
            })
            .state('waiting', <ng.ui.IState>{
                url: "/waiting",
                views: {
                    "global@": { templateUrl: '/ClientApps/views/Waiting.html' }
                }
            });
        $urlRouterProvider.otherwise('/');
    }

    public static RegisterAddinRoutes($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider): void {
        //$stateProvider
        //    .state('logged', <ng.ui.IState>{
        //        url: "/",
        //        views: {
        //            "global@": { templateUrl: '/AppRead/views/PrimaryAddin.html' },
        //            "main@logged": {
        //                templateUrl: '/AppRead/views/MainAddin.html',
        //                controller: AddinControllerNames.MainAddinController
        //            }
        //        }
        //    })
        //    .state('notconnected', <ng.ui.IState>{
        //        url: "/notconnected",
        //        views: {
        //            "global@": {
        //                templateUrl: '/AppRead/views/NotConnected.html',
        //                controller: AddinControllerNames.WrongConnectedController
        //            }
        //        }
        //    })
        //    .state('badconnected', <ng.ui.IState>{
        //        url: "/badconnected",
        //        views: {
        //            "global@": {
        //                templateUrl: '/AppRead/views/BadConnected.html',
        //                controller: AddinControllerNames.WrongConnectedController
        //            }
        //        }
        //    })
        //    .state('waiting', <ng.ui.IState>{
        //        url: "/waiting",
        //        views: {
        //            "global@": { templateUrl: '/AppRead/views/Waiting.html' }
        //        }
        //    });
        //$urlRouterProvider.otherwise('/');
    }
}