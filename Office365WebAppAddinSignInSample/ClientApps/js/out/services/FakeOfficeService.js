System.register(["models/UserInfoDto"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserInfoDto_1;
    var FakeOfficeService;
    return {
        setters:[
            function (UserInfoDto_1_1) {
                UserInfoDto_1 = UserInfoDto_1_1;
            }],
        execute: function() {
            FakeOfficeService = (function () {
                function FakeOfficeService($q) {
                    this.$q = $q;
                }
                FakeOfficeService.prototype.getMyUserInfo = function () {
                    var info = new UserInfoDto_1.LightUserInfoDto();
                    info.DisplayName = "Display Name";
                    info.UpnName = "emailAdress@test.com";
                    return info;
                };
                FakeOfficeService.prototype.getLocale = function () {
                    return '';
                };
                FakeOfficeService.prototype.hasDialogApi = function () {
                    return false;
                };
                FakeOfficeService.prototype.showDialog = function (completeUrl) {
                    throw Error("Cannot start dialog API here");
                };
                FakeOfficeService.prototype.closeDialog = function () {
                    throw Error("Cannot close dialog API here");
                };
                return FakeOfficeService;
            }());
            exports_1("FakeOfficeService", FakeOfficeService);
        }
    }
});
