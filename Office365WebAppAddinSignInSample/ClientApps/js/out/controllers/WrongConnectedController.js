System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var WrongConnectedController, NoOfficeNotConnectedController, OfficeWrongConnectedController;
    return {
        setters:[],
        execute: function() {
            WrongConnectedController = (function () {
                function WrongConnectedController($window) {
                    this.$window = $window;
                }
                return WrongConnectedController;
            }());
            NoOfficeNotConnectedController = (function (_super) {
                __extends(NoOfficeNotConnectedController, _super);
                function NoOfficeNotConnectedController($scope, $window, serverService) {
                    _super.call(this, $window);
                    this.$scope = $scope;
                    this.serverService = serverService;
                    this.$scope.notConnectedCtrl = this;
                    this.showPopupInstruction = false;
                    this.noPopupSignInUrl = this.serverService.getAccountSignInUrl();
                    this.showSignInButton = true;
                }
                NoOfficeNotConnectedController.prototype.signIn = function () {
                    this.$window.location.href = this.noPopupSignInUrl;
                };
                return NoOfficeNotConnectedController;
            }(WrongConnectedController));
            exports_1("NoOfficeNotConnectedController", NoOfficeNotConnectedController);
            OfficeWrongConnectedController = (function (_super) {
                __extends(OfficeWrongConnectedController, _super);
                function OfficeWrongConnectedController($scope, $state, $window, serverService, signalRService, officeService) {
                    var _this = this;
                    _super.call(this, $window);
                    this.$scope = $scope;
                    this.$state = $state;
                    this.serverService = serverService;
                    this.signalRService = signalRService;
                    this.officeService = officeService;
                    $scope.wrongNotConnectedAddinCtrl = this;
                    $scope.notConnectedCtrl = this;
                    this.emailFromServer = $scope.globalCtrl.emailFromServer;
                    this.emailFromApp = $scope.globalCtrl.emailFromApp;
                    this.regenerateId();
                    $scope.$on(OfficeWrongConnectedController.RegenerateSecretKey, function () {
                        _this.regenerateId();
                    });
                    this.useDialogApi = this.officeService.hasDialogApi();
                    this.showPopupInstruction = !this.useDialogApi;
                }
                OfficeWrongConnectedController.prototype.regenerateId = function () {
                    var _this = this;
                    this.showSignInButton = false;
                    this.signalRService.getSignalRefId().then(function (signalRRef) {
                        _this.signInUrlWithRefId = _this.serverService.getAccountSignInUrl(signalRRef);
                        _this.signOutUrlWithRefId = _this.serverService.getAccountSignOutUrl(signalRRef);
                        _this.showSignInButton = true;
                    });
                };
                OfficeWrongConnectedController.prototype.signIn = function () {
                    if (this.useDialogApi) {
                        var completeUrl = this.serverService.toFullUrl(this.signInUrlWithRefId);
                        this.officeService.showDialog(completeUrl);
                    }
                    else {
                        this.$window.open(this.signInUrlWithRefId, '_blank');
                    }
                    this.$state.go('waiting');
                };
                OfficeWrongConnectedController.prototype.signOut = function () {
                    if (this.useDialogApi) {
                        var completeUrl = this.serverService.toFullUrl(this.signOutUrlWithRefId);
                        this.officeService.showDialog(completeUrl);
                    }
                    else {
                        this.$window.open(this.signOutUrlWithRefId, '_blank');
                    }
                    this.$state.go('waiting');
                };
                OfficeWrongConnectedController.RegenerateSecretKey = "event:regeneratesecret";
                return OfficeWrongConnectedController;
            }(WrongConnectedController));
            exports_1("OfficeWrongConnectedController", OfficeWrongConnectedController);
        }
    }
});
