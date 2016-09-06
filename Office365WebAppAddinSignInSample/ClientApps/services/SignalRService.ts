import {ServerService} from "services/ServerServices";
import {Util} from "Util/Util"
import {IOfficeService, IOfficeLocaleService} from "services/IOfficeService"

export class SignalRService {

    private static signalRRef: string;
    private static hub: any;
    public constructor(private $q: ng.IQService, private $timeout: ng.ITimeoutService, private $location: ng.ILocationService,
        private serverService: ServerService, private officeService: IOfficeService) {

    }

    public getSignalRefId(): ng.IPromise<string> {
        var deferred: ng.IDeferred<string> = this.$q.defer();
        var any$: any = $;
        var connection = any$.connection;
        var hub = connection.closeHub;

        hub.client.goToRoot = () => {
            if (this.officeService.hasDialogApi()) {
                this.officeService.closeDialog();
            }

            this.$timeout(() => { this.$location.url("/"); }, 500);
        };

        connection.hub.start().done(() => {
            deferred.resolve(connection.hub.id);
        });

        return deferred.promise;
    }
}