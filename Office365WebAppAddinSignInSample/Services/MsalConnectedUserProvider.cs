using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using Office365WebAppAddinSignInSample.Utils;

namespace Office365WebAppAddinSignInSample.Services
{
    public class MsalConnectedUserProvider : IConnectedUserProvider
    {
        public Task<GraphApiToken> AcquireAzureGraphTokenForConnectedUserAsync()
        {
            throw new NotImplementedException();
        }

        //http://stackoverflow.com/questions/36747534/nameidentifier-vs-objectidentifier
        private string GetTenantId() => ClaimsPrincipal.Current.FindFirst(ExtendedClaimsType.TenantId).Value;

        private string GetUserObjectId() => ClaimsPrincipal.Current.FindFirst(ExtendedClaimsType.ObjectId).Value;

        private string NameIdentifier() => ClaimsPrincipal.Current.FindFirst(ClaimTypes.NameIdentifier).Value;

        private string UpnName() => ClaimsPrincipal.Current.FindFirst(ExtendedClaimsType.PreferredUsername).Value;

        public string FirstName() => ClaimsPrincipal.Current.FindFirst(ClaimTypes.GivenName).Value;

        public string LastName() => ClaimsPrincipal.Current.FindFirst(ClaimTypes.Surname).Value;
        public async Task<MailUserInfo> GetMailUserInfo()
        {
            var app = SettingsHelper.GetClientApplication();
            var token = await app.AcquireTokenSilentAsync(new string[] { "mail.read", "User.ReadBasic.All" });

            var http = new HttpClient();
            http.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.Token);

            var message = await http.GetStringAsync("https://graph.microsoft.com/v1.0/me");
            dynamic result = JsonConvert.DeserializeObject<dynamic>(message);
            return new MailUserInfo(UpnName(), GetTenantId(), DisplayName(), NameIdentifier(), GetUserObjectId(), result.mail.Value);
        }

        private string DisplayName() => ClaimsPrincipal.Current.FindFirst("name").Value;

        public UserInfo GetUserInfo()
        {
            return new UserInfo(this.UpnName(), this.GetTenantId(), this.DisplayName(), this.NameIdentifier(), this.GetUserObjectId());
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