import {GlobalController} from "controllers/GlobalController"

export class AuthenticationInterceptor {
    public static $inject = ["$q", "$rootScope"];

    public static Factory( $q: ng.IQService, $rootScope: ng.IRootScopeService) {
        return new AuthenticationInterceptor($q, $rootScope);
    }

    constructor( private $q: ng.IQService, private $rootScope: ng.IRootScopeService) {
        
    }

   
    public responseError = (responseFailure): ng.IPromise<any> => {
        if (responseFailure.status === 401) {
            this.$rootScope.$broadcast(GlobalController.NotConnectedEvent);
        }
        return this.$q.reject(responseFailure);
    }
}
