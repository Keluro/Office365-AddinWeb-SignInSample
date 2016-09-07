System.register(["controllers/GlobalController", "Util/Util"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var GlobalController_1, Util_1;
    var OfficeGlobalController;
    return {
        setters:[
            function (GlobalController_1_1) {
                GlobalController_1 = GlobalController_1_1;
            },
            function (Util_1_1) {
                Util_1 = Util_1_1;
            }],
        execute: function() {
            OfficeGlobalController = (function (_super) {
                __extends(OfficeGlobalController, _super);
                function OfficeGlobalController($scope, $q, $location, $state, $timeout, $window, serverService, officeService, signalRService) {
                    var _this = this;
                    _super.call(this, $scope, $q, $location, $state, $window, serverService, signalRService);
                    this.officeService = officeService;
                    this.useDialogApi = this.officeService.hasDialogApi();
                    this.showSignOut = false;
                    signalRService.getSignalRefId().then(function (signalRRef) {
                        _this.signOutUrl = _this.serverService.getAccountSignOutUrl(signalRRef);
                        _this.showSignOut = true;
                    });
                    $scope.$on('event:checkcompatitbility', function () {
                        _this.checkcompatibility();
                    });
                }
                OfficeGlobalController.prototype.checkcompatibility = function () {
                    var _this = this;
                    var userEmailPromise = this.serverService.getUserInfo();
                    var userInfo = this.officeService.getMyUserInfo();
                    userEmailPromise.then(function (infoFromServer) {
                        if (Util_1.Util.compareCaseInsensitive(userInfo.UpnName, infoFromServer.UpnName) || Util_1.Util.compareCaseInsensitive(userInfo.UpnName, infoFromServer.Email)) {
                            _this.userName = userInfo.DisplayName;
                            _this.emailFromServer = infoFromServer.Email;
                            _this.isLogged = true;
                        }
                        else {
                            _this.userName = userInfo.DisplayName;
                            _this.emailFromServer = infoFromServer.Email;
                            _this.emailFromApp = userInfo.UpnName;
                            _this.isLogged = false;
                            _this.$state.go('badconnected');
                        }
                    });
                };
                OfficeGlobalController.prototype.clickSignout = function () {
                    if (this.useDialogApi) {
                        var completeUrl = this.serverService.toFullUrl(this.signOutUrl);
                        this.officeService.showDialog(completeUrl);
                    }
                    else {
                        this.$window.open(this.signOutUrl, '_target');
                    }
                    this.$state.go('waiting');
                };
                OfficeGlobalController.prototype.clickOpenLibraryInAnotherWindow = function () {
                    if (this.useDialogApi) {
                        var completeUrl = this.serverService.toFullUrl("/");
                        this.officeService.showDialog(completeUrl);
                    }
                    else {
                        this.$window.open("/", "_blank");
                    }
                };
                return OfficeGlobalController;
            }(GlobalController_1.GlobalController));
            exports_1("OfficeGlobalController", OfficeGlobalController);
        }
    }
});
//# sourceMappingURL=../../../ClientApps/controllers/OfficeGlobalController.js.map