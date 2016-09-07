System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SignalRService;
    return {
        setters:[],
        execute: function() {
            SignalRService = (function () {
                function SignalRService($q, $timeout, $location, serverService, officeService) {
                    this.$q = $q;
                    this.$timeout = $timeout;
                    this.$location = $location;
                    this.serverService = serverService;
                    this.officeService = officeService;
                }
                SignalRService.prototype.getSignalRefId = function () {
                    var _this = this;
                    var deferred = this.$q.defer();
                    var any$ = $;
                    var connection = any$.connection;
                    var hub = connection.closeHub;
                    hub.client.goToRoot = function () {
                        if (_this.officeService.hasDialogApi()) {
                            _this.officeService.closeDialog();
                        }
                        _this.$timeout(function () { _this.$location.url("/"); }, 500);
                    };
                    connection.hub.start().done(function () {
                        deferred.resolve(connection.hub.id);
                    });
                    return deferred.promise;
                };
                return SignalRService;
            }());
            exports_1("SignalRService", SignalRService);
        }
    }
});
//# sourceMappingURL=../../../ClientApps/services/SignalRService.js.map