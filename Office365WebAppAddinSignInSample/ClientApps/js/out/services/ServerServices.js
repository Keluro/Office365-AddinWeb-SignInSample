System.register(["Util/Util"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Util_1;
    var ServerService;
    return {
        setters:[
            function (Util_1_1) {
                Util_1 = Util_1_1;
            }],
        execute: function() {
            ServerService = (function () {
                function ServerService($http, $q) {
                    this.$http = $http;
                    this.$q = $q;
                }
                ServerService.prototype.ExtractError = function (e) {
                    if (typeof e === "string") {
                        return e;
                    }
                    else if (e !== null && typeof e.ExceptionMessage === "string") {
                        return e.ExceptionMessage;
                    }
                    else if (e !== null && typeof e.Message === "string") {
                        return e.Message;
                    }
                    return '';
                };
                ServerService.prototype.getUserInfo = function () {
                    var _this = this;
                    var deferred = this.$q.defer();
                    this.$http({
                        url: '/api/AccountApi/CurrentUser',
                        method: 'GET'
                    }).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (e) {
                        deferred.reject(_this.ExtractError(e));
                    });
                    return deferred.promise;
                };
                ServerService.prototype.toFullUrl = function (relativeUrl) {
                    return window.location.origin + relativeUrl;
                };
                ServerService.prototype.getAccountSignInUrl = function (id) {
                    if (id === void 0) { id = null; }
                    if (Util_1.Util.IsNullUndefinedOrEmpty(id)) {
                        return ServerService.SignIn;
                    }
                    else {
                        return ServerService.SignIn + "?signalrRef=" + encodeURIComponent(id);
                    }
                };
                ServerService.prototype.getAccountSignOutUrl = function (id) {
                    if (id === void 0) { id = null; }
                    if (Util_1.Util.IsNullUndefinedOrEmpty(id)) {
                        return ServerService.SignOut;
                    }
                    else {
                        return ServerService.SignOut + "?signalrRef=" + encodeURIComponent(id);
                    }
                };
                ServerService.SignIn = "/Account/SignIn";
                ServerService.SignOut = "/Account/SignOut";
                return ServerService;
            }());
            exports_1("ServerService", ServerService);
        }
    }
});
//# sourceMappingURL=../../../ClientApps/services/ServerServices.js.map