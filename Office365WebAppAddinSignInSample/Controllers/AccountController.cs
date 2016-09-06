using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Office365WebAppAddinSignInSample.Utils;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Office365WebAppAddinSignInSample.Controllers
{
    /// <summary>
    /// It is possible to create a permanent cookie that will be sent when redirected to the AutoClose page.
    /// Remind that the AutoClose is called from a popup because we cannot do the authentication in an iframed environment (security restriction preventing from clickjacking).
    /// 
    /// When redirecting to autoclose a cookie is set before the window closes and everyone is Happy
    /// BUT! this does not work with IE in the desktop version of Outlook because the IE popup does not start with the same level of integrity thus the cookie is not viewed by our iframe. 
    /// https://social.msdn.microsoft.com/Forums/office/en-US/c36a1706-e1b8-4d29-96ce-b52fe774c692/what-is-the-recommended-solution-for-implementing-the-oauth-20-flow-in-sandboxed-app-for-office?forum=appsforoffice
    /// http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/08/10/connecting-to-office-365-from-an-office-add-in.aspx
    /// 
    /// 
    /// So we implement a solution that looks like this one 
    /// http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/08/10/connecting-to-office-365-from-an-office-add-in.aspx
    /// 
    /// A secret token is generated from the client. The authentication is performed in the popup and the secret token is passed back via signalR
    /// THANK YOU IE.
    /// </summary>
    public class AccountController : Controller
    {
        public const string SignalRRefCst = "signalrRef";

        public void SignIn(string signalrRef)
        {
            AuthenticationProperties authenticationProperties;
            if (string.IsNullOrEmpty(signalrRef))
            {
                authenticationProperties = new AuthenticationProperties
                {
                    RedirectUri = SettingsHelper.LoginLogoutRedictRelativeUri,
                    IsPersistent = true
                };
            }
            else
            {
                var queryString = GetCloseAutoParameters(signalrRef);
                authenticationProperties = new AuthenticationProperties
                {
                    RedirectUri = SettingsHelper.PopupLoginRedirectRelativeUri + "?" + queryString.ToString(),
                    IsPersistent = true
                };
            }

            HttpContext.GetOwinContext()
                .Authentication.Challenge(authenticationProperties, OpenIdConnectAuthenticationDefaults.AuthenticationType, CookieAuthenticationDefaults.AuthenticationType);
        }

        public void SignOut(string signalrRef)
        {
            AuthenticationProperties authenticationProperties;
            if (string.IsNullOrEmpty(signalrRef))
            {
                authenticationProperties = new AuthenticationProperties { RedirectUri = SettingsHelper.LoginLogoutRedictRelativeUri };
            }
            else
            {
                var queryString = GetCloseAutoParameters(signalrRef);
                authenticationProperties = new AuthenticationProperties { RedirectUri = SettingsHelper.PopupLoginRedirectRelativeUri + "?" + queryString.ToString() };
            }


            HttpContext.GetOwinContext().Authentication.SignOut(authenticationProperties,
                OpenIdConnectAuthenticationDefaults.AuthenticationType, CookieAuthenticationDefaults.AuthenticationType);
        }

        public static string GetCloseAutoParameters(string signalrRef)
        {
            NameValueCollection queryString = HttpUtility.ParseQueryString(string.Empty);
            queryString[SignalRRefCst] = signalrRef;
            return queryString.ToString();
        }

        public ActionResult CloseAuto(string signalrRef)
        {
            if (!string.IsNullOrEmpty(signalrRef))
            {
                var hubContext = GlobalHost.ConnectionManager.GetHubContext<CloseHub>();
                hubContext.Clients.Client(signalrRef).goToRoot();
            }

            return View();
        }
    }
}