System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SpinnerSize, SpinnerDirective;
    return {
        setters:[],
        execute: function() {
            (function (SpinnerSize) {
                SpinnerSize[SpinnerSize['small'] = 0] = 'small';
                SpinnerSize[SpinnerSize['large'] = 1] = 'large';
            })(SpinnerSize || (SpinnerSize = {}));
            exports_1("SpinnerSize", SpinnerSize);
            SpinnerDirective = (function () {
                function SpinnerDirective() {
                    this.restrict = 'E';
                    this.template = '<div><img ng-src="{{ spinnerUrl }}" alt="Loading" height="{{ size }}" width="{{ size }}"></div>';
                    this.scope = {};
                }
                SpinnerDirective.factory = function () {
                    var directive = function () { return new SpinnerDirective(); };
                    return directive;
                };
                SpinnerDirective.prototype.link = function (scope, instanceElement, attrs) {
                    switch (attrs.uifSize) {
                        case 'large':
                            scope.size = 35;
                            break;
                        default:
                            scope.size = 20;
                    }
                    scope.spinnerUrl = "/Content/loader.gif";
                };
                return SpinnerDirective;
            }());
            exports_1("SpinnerDirective", SpinnerDirective);
        }
    }
});
//# sourceMappingURL=../../../ClientApps/directives/SpinnerDirective.js.map