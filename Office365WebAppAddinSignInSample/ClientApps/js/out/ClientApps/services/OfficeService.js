System.register(["models/UserInfoDto"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserInfoDto_1;
    var OfficeService, OfficeLocaleService;
    return {
        setters:[
            function (UserInfoDto_1_1) {
                UserInfoDto_1 = UserInfoDto_1_1;
            }],
        execute: function() {
            OfficeService = (function () {
                function OfficeService($q, serverService) {
                    this.$q = $q;
                    this.serverService = serverService;
                }
                OfficeService.prototype.getEwsUrl = function () {
                    var mailbox = Office.context.mailbox;
                    return mailbox.ewsUrl;
                };
                OfficeService.prototype.getMyUserInfo = function () {
                    var profile = Office.context.mailbox.userProfile;
                    var info = new UserInfoDto_1.LightUserInfoDto();
                    info.DisplayName = profile.displayName;
                    info.UpnName = profile.emailAddress;
                    return info;
                };
                OfficeService.prototype.hasDialogApi = function () {
                    var context = Office.context;
                    try {
                        return context.requirements.isSetSupported('DialogAPI', '1.1');
                    }
                    catch (ex) {
                        return false;
                    }
                };
                OfficeService.prototype.showDialog = function (completeUrl) {
                    var context = Office.context;
                    context.ui.displayDialogAsync(completeUrl, { width: 50, height: 50, requireHTTPS: true }, function (asyncResult) {
                        var dialog = asyncResult.value;
                        var winAny = window;
                        winAny.dialog = dialog;
                    });
                };
                OfficeService.prototype.closeDialog = function () {
                    var winAny = window;
                    if (typeof winAny.dialog !== "undefined") {
                        winAny.dialog.close();
                    }
                };
                return OfficeService;
            }());
            exports_1("OfficeService", OfficeService);
            OfficeLocaleService = (function () {
                function OfficeLocaleService() {
                }
                OfficeLocaleService.prototype.getLocale = function () {
                    return Office.context.displayLanguage;
                };
                return OfficeLocaleService;
            }());
            exports_1("OfficeLocaleService", OfficeLocaleService);
        }
    }
});
