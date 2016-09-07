System.register(["web"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var web_1;
    return {
        setters:[
            function (web_1_1) {
                web_1 = web_1_1;
            }],
        execute: function() {
            angular.element(document).ready(function () {
                angular.bootstrap(document, [web_1.default.name], {});
            });
        }
    }
});
