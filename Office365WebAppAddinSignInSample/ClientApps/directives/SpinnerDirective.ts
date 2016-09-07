import {Util} from "Util/Util"

export enum SpinnerSize {
    'small',
    'large'
}

export class SpinnerDirective implements ng.IDirective {
    public restrict: string = 'E';
    public template: string = '<div><img ng-src="{{ spinnerUrl }}" alt="Loading" height="{{ size }}" width="{{ size }}"></div>';

    public scope: any = {
        
    }

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new SpinnerDirective();
        return directive;
    }

    public link(
        scope: ISpinnerScope,
        instanceElement: ng.IAugmentedJQuery,
        attrs: ISpinnerAttributes): void {

        switch (attrs.uifSize) {
            case 'large':
                scope.size = 35;
                break;
            default:
                scope.size = 20;
        }
        scope.spinnerUrl = "/Content/loader.gif";
    }
}
interface ISpinnerScope extends ng.IScope {
    size: number;
    spinnerUrl: string;
}

interface ISpinnerAttributes extends ng.IAttributes {
    uifSize?: string;
}
