using System.Web;
using System.Web.Optimization;

namespace Office365WebAppAddinSignInSample
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            var cssPath = new string[]
            {
                "~/bower_components/office-ui-fabric/dist/css/fabric.css",
                "~/bower_components/office-ui-fabric/dist/css/fabric.components.css",
                "~/Content/style.css",
            };

            var webBundle = new StyleBundle("~/css").Include(cssPath);
            bundles.Add(webBundle);

            string[] libPath = new string[]{
                 "~/Scripts/jquery-1.10.2.js",
                "~/bower_components/angular/angular.js",
                "~/bower_components/angular-ui-router/release/angular-ui-router.js",
                "~/Scripts/jquery.signalR-2.2.0.min.js"
            };

            bundles.Add(new ScriptBundle("~/js").Include(libPath));

            BundleTable.EnableOptimizations = false;
        }
    }
}
