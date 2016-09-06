import {UserInfoDto, LightUserInfoDto} from "models/UserInfoDto"

export interface IOfficeLocaleService {
    getLocale(): string;
}


export interface IOfficeService {   
    getMyUserInfo(): LightUserInfoDto;

    hasDialogApi(): boolean;

    showDialog(url: string): void;

    closeDialog(): void;
}