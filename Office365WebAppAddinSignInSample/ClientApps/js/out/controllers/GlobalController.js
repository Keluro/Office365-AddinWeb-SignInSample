System.register(["controllers/WrongConnectedController"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WrongConnectedController_1;
    var GlobalController;
    return {
        setters:[
            function (WrongConnectedController_1_1) {
                WrongConnectedController_1 = WrongConnectedController_1_1;
            }],
        execute: function() {
            GlobalController = (function () {
                function GlobalController($scope, $q, $location, $state, $window, serverService, signalRService) {
                    var _this = this;
                    this.$scope = $scope;
                    this.$q = $q;
                    this.$location = $location;
                    this.$state = $state;
                    this.$window = $window;
                    this.serverService = serverService;
                    this.signalRService = signalRService;
                    $scope.globalCtrl = this;
                    $scope.$on('event:checkconnection', function () {
                        _this.serverService.getUserInfo()
                            .then(function (userEmail) {
                            _this.userName = '';
                            _this.emailFromServer = userEmail.Email;
                            _this.emailFromApp = userEmail.Email;
                            _this.isLogged = true;
                        }, function () {
                            _this.userName = '';
                            _this.emailFromServer = '';
                            _this.emailFromApp = '';
                            _this.isLogged = false;
                            _this.$state.go('notconnected');
                        });
                    });
                    $scope.$on(GlobalController.NotConnectedEvent, function () {
                        _this.userName = '';
                        _this.isLogged = false;
                        $scope.$broadcast(WrongConnectedController_1.OfficeWrongConnectedController.RegenerateSecretKey);
                        _this.$state.go('notconnected');
                    });
                }
                GlobalController.prototype.isActive = function (viewLocation) {
                    var path = this.$location.path();
                    return viewLocation === path;
                };
                GlobalController.NotConnectedEvent = "event:notconnected";
                return GlobalController;
            }());
            exports_1("GlobalController", GlobalController);
        }
    }
});
//# sourceMappingURL=../../../ClientApps/controllers/GlobalController.js.map