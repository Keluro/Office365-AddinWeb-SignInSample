import {IOfficeService, IOfficeLocaleService} from "services/IOfficeService"
import {ServerService} from "services/ServerServices"
import {Util} from "Util/Util"
import {UserInfoDto, LightUserInfoDto} from "models/UserInfoDto"


export class OfficeService implements IOfficeService {

    public constructor(private $q: ng.IQService, private serverService: ServerService) {
    }

    getEwsUrl(): string {
        var mailbox: any = Office.context.mailbox;
        return mailbox.ewsUrl;
    }

    getMyUserInfo(): LightUserInfoDto {
        var profile: Office.UserProfile = Office.context.mailbox.userProfile;
        var info = new LightUserInfoDto();
        info.DisplayName = profile.displayName;
        info.UpnName = profile.emailAddress;
        return info;
    }


    hasDialogApi(): boolean {
        var context: any = Office.context;
        try {
            return context.requirements.isSetSupported('DialogAPI', '1.1');
        } catch (ex) {
            return false;
        }
    }

    showDialog(completeUrl: string): void {
        var context: any = Office.context;
        context.ui.displayDialogAsync(completeUrl, { width: 50, height: 50, requireHTTPS: true }, function (asyncResult) {
            var dialog = asyncResult.value;
            var winAny: any = <any>window;
            winAny.dialog = dialog;
        });
    }

    closeDialog(): void {
        var winAny: any = window;
        if (typeof winAny.dialog !== "undefined") {
            winAny.dialog.close();
        }
    }
}

export class OfficeLocaleService implements IOfficeLocaleService {
    public constructor() {
    }

    getLocale(): string {
        return Office.context.displayLanguage;
    }
}
