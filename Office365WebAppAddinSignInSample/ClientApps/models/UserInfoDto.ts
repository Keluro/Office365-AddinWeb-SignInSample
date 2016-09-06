export class LightUserInfoDto {
    constructor() { }
    DisplayName: string;
    UpnName: string;
    ObjectId: string;
}

export class UserInfoDto extends LightUserInfoDto {
    constructor() {
        super();
    }

    ThumbnailUri: string;
}

export class MailUserInfoDto extends UserInfoDto {
    constructor() {
        super();
    }

    Email: string;
}