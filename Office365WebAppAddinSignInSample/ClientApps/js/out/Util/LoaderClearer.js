System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var LoaderClearer;
    return {
        setters:[],
        execute: function() {
            LoaderClearer = (function () {
                function LoaderClearer() {
                }
                LoaderClearer.ClearInterval = function () {
                    var winAny = window;
                    window.clearInterval(winAny.loaderInterval);
                    $(".loader-container").hide();
                    $("#web-app").show();
                };
                return LoaderClearer;
            }());
            exports_1("LoaderClearer", LoaderClearer);
        }
    }
});
//# sourceMappingURL=../../../ClientApps/Util/LoaderClearer.js.map