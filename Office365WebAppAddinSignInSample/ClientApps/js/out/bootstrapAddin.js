System.register(["addin"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var addin_1;
    return {
        setters:[
            function (addin_1_1) {
                addin_1 = addin_1_1;
            }],
        execute: function() {
            angular.element(document).ready(function () {
                angular.bootstrap(document, [addin_1.default.name], {});
            });
        }
    }
});
//# sourceMappingURL=../../ClientApps/bootstrapAddin.js.map