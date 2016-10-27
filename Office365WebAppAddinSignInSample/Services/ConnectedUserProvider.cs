using Newtonsoft.Json;
using Office365WebAppAddinSignInSample.Persistence;
using Office365WebAppAddinSignInSample.Utils;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.IdentityModel.Clients.ActiveDirectory;

namespace Office365WebAppAddinSignInSample.Services
{
    public class ConnectedUserProvider : IConnectedUserProvider
    {
        public ConnectedUserProvider()
        {

        }

        private static async Task<string> AcquireTokenNoContextAsync(string resource, string errorTrace, string tenantId, string userObjectId, bool allowFallbackToApp1)
        {
            string authority = string.Format("{0}/{1}", SettingsHelper.AuthorizationUri, tenantId);
            AuthenticationContext authContext = new AuthenticationContext(authority, new ADALTokenCache(userObjectId));
            try
            {
                var result = await authContext.AcquireTokenSilentAsync(resource, SettingsHelper.GetApp2Credentials(),
                    new UserIdentifier(userObjectId, UserIdentifierType.UniqueId));
                return result.AccessToken;
            }
            catch (AdalException exception)
            {
                Trace.TraceError(errorTrace);
                Trace.TraceError("Cannot acquire token on app2");
     
                    Trace.TraceError("...do not fall back on app1");
                    if (exception.ErrorCode == AdalError.FailedToAcquireTokenSilently)
                    {
                        authContext.TokenCache.Clear();
                    }
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.Unauthorized));
            }
        }


        private async Task<string> AcquireTokenAsync(string resource, string errorTrace)
        {
            var nameIdentifier = this.NameIdentifier();
            var userObjectId = this.GetUserObjectId();
            var tenantId = this.GetTenantId();
            return await AcquireTokenNoContextAsync(resource, errorTrace, tenantId, userObjectId, false);
        }

        public async Task<GraphApiToken> AcquireAzureGraphTokenForConnectedUserAsync()
        {
            return new GraphApiToken(await this.AcquireTokenAsync(SettingsHelper.GraphApi, "CANNOT retrieve Azure Graph Token silently"));
        }

        //http://stackoverflow.com/questions/36747534/nameidentifier-vs-objectidentifier
        private string GetTenantId()
        {
            return ClaimsPrincipal.Current.FindFirst(ExtendedClaimsType.TenantId).Value;
        }

        private string GetUserObjectId()
        {
            return ClaimsPrincipal.Current.FindFirst(ExtendedClaimsType.ObjectId).Value;
        }

        private string NameIdentifier()
        {
            return ClaimsPrincipal.Current.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        private string UpnName()
        {
            return ClaimsPrincipal.Current.FindFirst(ClaimTypes.Upn).Value;
        }

        public string FirstName()
        {
            return ClaimsPrincipal.Current.FindFirst(ClaimTypes.GivenName).Value;
        }

        public string LastName()
        {
            return ClaimsPrincipal.Current.FindFirst(ClaimTypes.Surname).Value;
        }

        private string DisplayName()
        {
            return ClaimsPrincipal.Current.FindFirst("name").Value;
        }

        public UserInfo GetUserInfo()
        {
            return new UserInfo(this.UpnName(), this.GetTenantId(), this.DisplayName(), this.NameIdentifier(), this.GetUserObjectId());
        }

        private static MediaTypeWithQualityHeaderValue Json = new MediaTypeWithQualityHeaderValue("application/json");
        private static async Task<HttpResponseMessage> SendRequest(string url, HttpMethod method, TokenBase accessToken)
        {
            using (var client = new HttpClient())
            {
                using (var request = new HttpRequestMessage(method, url))
                {
                    
                    request.Headers.Accept.Add(Json);
                    if (accessToken != null)
                    {
                        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken.AccessToken);
                    }
                    var response = await client.SendAsync(request);
                    return response;
                }
            }
        }

        public async Task<string> FetchInfoFromMeEndpoint(GraphApiToken token)
        {
            var response = await ConnectedUserProvider.SendRequest(SettingsHelper.GraphApiMe, HttpMethod.Get, token);
            return await response.Content.ReadAsStringAsync();
        }

        public async Task<MailUserInfo> GetMailUserInfo()
        {
            var accessToken = await this.AcquireAzureGraphTokenForConnectedUserAsync();
            var id = this.GetUserObjectId();
            var strGraphResult = await this.FetchInfoFromMeEndpoint(accessToken);
            dynamic graphResult = JsonConvert.DeserializeObject(strGraphResult);

            var claimUpn = this.UpnName();

            if (graphResult.userPrincipalName != this.UpnName())
            {
                throw new Exception(string.Format("upn incompatibility {0}, {1}", graphResult.UpnName, claimUpn));
            }

            return new MailUserInfo(graphResult.UpnName, this.GetTenantId(), this.DisplayName(), this.NameIdentifier(), id, (string) graphResult.mail);
        }

        public bool TryGetUserInfo(out UserInfo userInfo)
        {
            if (ClaimsPrincipal.Current.FindFirst(ExtendedClaimsType.ObjectId) == null)
            {
                userInfo = null;
                return false;
            }
            else
            {
                userInfo = this.GetUserInfo();
                return true;
            }
        }
    }
}
