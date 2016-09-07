System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var LightUserInfoDto, UserInfoDto, MailUserInfoDto;
    return {
        setters:[],
        execute: function() {
            LightUserInfoDto = (function () {
                function LightUserInfoDto() {
                }
                return LightUserInfoDto;
            }());
            exports_1("LightUserInfoDto", LightUserInfoDto);
            UserInfoDto = (function (_super) {
                __extends(UserInfoDto, _super);
                function UserInfoDto() {
                    _super.call(this);
                }
                return UserInfoDto;
            }(LightUserInfoDto));
            exports_1("UserInfoDto", UserInfoDto);
            MailUserInfoDto = (function (_super) {
                __extends(MailUserInfoDto, _super);
                function MailUserInfoDto() {
                    _super.call(this);
                }
                return MailUserInfoDto;
            }(UserInfoDto));
            exports_1("MailUserInfoDto", MailUserInfoDto);
        }
    }
});
//# sourceMappingURL=../../../ClientApps/models/UserInfoDto.js.map