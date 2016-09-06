import {Util} from "Util/Util"
import {MailUserInfoDto} from "models/UserInfoDto"


export class ServerService {
    constructor(private $http: ng.IHttpService, private $q: ng.IQService) {

    }

    private ExtractError(e: any): string {
        if (typeof e === "string") {
            return e;
        } else if (e !== null && typeof e.ExceptionMessage === "string") {
            return e.ExceptionMessage;
        }
        else if (e !== null && typeof e.Message === "string") {
            return e.Message;
        }
        return '';
    }

    getUserInfo(): ng.IPromise<MailUserInfoDto> {
        var deferred: ng.IDeferred<MailUserInfoDto> = this.$q.defer();
        this.$http({
            url: '/api/AccountApi/CurrentUser',
            method: 'GET'
        }).success((result: MailUserInfoDto) => {
            deferred.resolve(result);
        }).error(e => {
            deferred.reject(this.ExtractError(e));
        });
        return deferred.promise;
    }

    toFullUrl(relativeUrl: string): string {
        return window.location.origin + relativeUrl;
    }

    public static SignIn = "/Account/SignIn";

    getAccountSignInUrl(id: string = null): string {
        if (Util.IsNullUndefinedOrEmpty(id)) {
            return ServerService.SignIn;
        } else {
            return ServerService.SignIn + "?signalrRef=" + encodeURIComponent(id);
        }
    }

    public static SignOut = "/Account/SignOut";
    getAccountSignOutUrl(id: string = null): string {
        if (Util.IsNullUndefinedOrEmpty(id)) {
            return ServerService.SignOut;
        } else {
            return ServerService.SignOut + "?signalrRef=" + encodeURIComponent(id);
        }
    }

   
   
}