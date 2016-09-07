System.register(["controllers/GlobalController"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GlobalController_1;
    var AuthenticationInterceptor;
    return {
        setters:[
            function (GlobalController_1_1) {
                GlobalController_1 = GlobalController_1_1;
            }],
        execute: function() {
            AuthenticationInterceptor = (function () {
                function AuthenticationInterceptor($q, $rootScope) {
                    var _this = this;
                    this.$q = $q;
                    this.$rootScope = $rootScope;
                    this.responseError = function (responseFailure) {
                        if (responseFailure.status === 401) {
                            _this.$rootScope.$broadcast(GlobalController_1.GlobalController.NotConnectedEvent);
                        }
                        return _this.$q.reject(responseFailure);
                    };
                }
                AuthenticationInterceptor.Factory = function ($q, $rootScope) {
                    return new AuthenticationInterceptor($q, $rootScope);
                };
                AuthenticationInterceptor.$inject = ["$q", "$rootScope"];
                return AuthenticationInterceptor;
            }());
            exports_1("AuthenticationInterceptor", AuthenticationInterceptor);
        }
    }
});
