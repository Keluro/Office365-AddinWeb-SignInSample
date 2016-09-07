System.register(["controllers/GlobalController"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var GlobalController_1;
    var NoOfficeGlobalController;
    return {
        setters:[
            function (GlobalController_1_1) {
                GlobalController_1 = GlobalController_1_1;
            }],
        execute: function() {
            NoOfficeGlobalController = (function (_super) {
                __extends(NoOfficeGlobalController, _super);
                function NoOfficeGlobalController($scope, $q, $location, $state, $timeout, $window, serverService, signalRService) {
                    _super.call(this, $scope, $q, $location, $state, $window, serverService, signalRService);
                    this.showSignOut = true;
                }
                NoOfficeGlobalController.prototype.clickSignout = function () {
                    var signOutUrl = this.serverService.getAccountSignOutUrl();
                    this.$window.location.href = signOutUrl;
                };
                return NoOfficeGlobalController;
            }(GlobalController_1.GlobalController));
            exports_1("NoOfficeGlobalController", NoOfficeGlobalController);
        }
    }
});
//# sourceMappingURL=../../../ClientApps/controllers/NoOfficeGlobalController.js.map