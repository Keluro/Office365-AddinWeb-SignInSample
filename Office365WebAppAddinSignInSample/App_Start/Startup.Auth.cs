using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.IdentityModel.Protocols;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Notifications;
using Microsoft.Owin.Security.OpenIdConnect;
using Office365WebAppAddinSignInSample.Controllers;
using Office365WebAppAddinSignInSample.Persistence;
using Office365WebAppAddinSignInSample.Utils;
using Owin;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Office365WebAppAddinSignInSample
{
    public partial class Startup
    {
        public const string CookieName = ".AspNet.GreatSampleByKeluro";
        public const int DayExpireCookie = 30;

        public void ConfigureAuth(IAppBuilder app)
        {
            app.MapSignalR();

            app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);

            var cookieAuthenticationOptions = new CookieAuthenticationOptions()
            {
                CookieName = CookieName,
                ExpireTimeSpan = TimeSpan.FromDays(30),
                AuthenticationType = CookieAuthenticationDefaults.AuthenticationType,
                SlidingExpiration = true,
            };

            app.UseCookieAuthentication(cookieAuthenticationOptions);

            app.UseOpenIdConnectAuthentication(
                new OpenIdConnectAuthenticationOptions
                {
                    ClientId = SettingsHelper.ClientIdApp2,
                    Authority = SettingsHelper.Authority,
                    UseTokenLifetime = false,
                    TokenValidationParameters = new System.IdentityModel.Tokens.TokenValidationParameters
                    {
                        // instead of using the default validation (validating against a single issuer value, as we do in line of business apps (single tenant apps)), 
                        // we turn off validation
                        //
                        // NOTE:
                        // * In a multitenant scenario you can never validate against a fixed issuer string, as every tenant will send a different one.
                        // * If you don’t care about validating tenants, as is the case for apps giving access to 1st party resources, you just turn off validation.
                        // * If you do care about validating tenants, think of the case in which your app sells access to premium content and you want to limit access only to the tenant that paid a fee, 
                        //       you still need to turn off the default validation but you do need to add logic that compares the incoming issuer to a list of tenants that paid you, 
                        //       and block access if that’s not the case.
                        // * Refer to the following sample for a custom validation logic: https://github.com/AzureADSamples/WebApp-WebAPI-MultiTenant-OpenIdConnect-DotNet

                        ValidateIssuer = false
                    },

                    Notifications = new OpenIdConnectAuthenticationNotifications()
                    {
                        // If there is a code in the OpenID Connect response, redeem it for an access token and refresh token, and store those away. 
                        AuthorizationCodeReceived = (context) =>
                        {
                            var code = context.Code;

                            string tenantID = context.AuthenticationTicket.Identity.FindFirst(ExtendedClaimsType.TenantId).Value;
                            string userObjectId = context.AuthenticationTicket.Identity.FindFirst(ExtendedClaimsType.ObjectId).Value;
                            AuthenticationContext authContext = new AuthenticationContext(string.Format("{0}/{1}", SettingsHelper.AuthorizationUri, tenantID), new ADALTokenCache(userObjectId));

                            ClientCredential credential = SettingsHelper.GetApp2Credentials();
                            // Get the access token for AAD Graph. Doing this will also initialize the token cache associated with the authentication context
                            // In theory, you could acquire token for any service your application has access to here so that you can initialize the token cache
                            Uri redirectUri = new Uri(HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Path));
                            AuthenticationResult result = authContext.AcquireTokenByAuthorizationCode(code, redirectUri, credential, SettingsHelper.AADGraphResourceId);

                            return Task.FromResult(0);
                        },

                        RedirectToIdentityProvider = (RedirectToIdentityProviderNotification<OpenIdConnectMessage, OpenIdConnectAuthenticationOptions> context) =>
                        {
                            //If the call comes from web api and if the user is not authenticated, do not redirect returns a good old 401
                            string basePath = context.Request.Path.HasValue ? context.Request.Path.Value : null;
                            if (basePath != null && (basePath.StartsWith("/api") || basePath.StartsWith("/hangfire")))
                            {
                                context.HandleResponse();
                            }
                            else
                            {
                                string appBaseUrl = context.Request.Scheme + "://" + context.Request.Host + context.Request.PathBase;
                                if (context.Request.QueryString.HasValue && context.Request.QueryString.Value.StartsWith(AccountController.SignalRRefCst))
                                {
                                    var nameValue = HttpUtility.ParseQueryString(context.Request.QueryString.Value);
                                    string suffix = AccountController.GetCloseAutoParameters(nameValue[AccountController.SignalRRefCst]);
                                    context.ProtocolMessage.RedirectUri = appBaseUrl + SettingsHelper.PopupLoginRedirectRelativeUri + "?" + suffix;
                                    context.ProtocolMessage.PostLogoutRedirectUri = appBaseUrl + SettingsHelper.PopupLoginRedirectRelativeUri + "?" + suffix;
                                }
                                else
                                {
                                    context.ProtocolMessage.RedirectUri = appBaseUrl + SettingsHelper.LoginLogoutRedictRelativeUri;
                                    context.ProtocolMessage.PostLogoutRedirectUri = appBaseUrl + SettingsHelper.LoginLogoutRedictRelativeUri;
                                }
                            }

                            return Task.FromResult(0);
                        },
                        AuthenticationFailed = (context) =>
                        {
                            // Suppress the exception if you don't want to see the error
                            context.HandleResponse();
                            return Task.FromResult(0);
                        }
                    }

                });
        }
    }
}