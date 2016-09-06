import {UserInfoDto, LightUserInfoDto} from "models/UserInfoDto"
import {IOfficeService} from "services/IOfficeService"

export class FakeOfficeService implements IOfficeService {

    public constructor(private $q: ng.IQService) {
    }

    getMyUserInfo(): LightUserInfoDto {
        var info = new LightUserInfoDto();
        info.DisplayName = "Display Name";
        info.UpnName = "emailAdress@test.com";
        return info;
    }

    getLocale(): string {
        return '';
    }

    hasDialogApi(): boolean {
        return false;
    }

    showDialog(completeUrl: string): void {
        throw Error("Cannot start dialog API here");
    }

    closeDialog(): void {
        throw Error("Cannot close dialog API here");
    }
}
