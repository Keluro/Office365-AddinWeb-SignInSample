using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Office365WebAppAddinSignInSample.Services
{
    // <summary>
    /// We use multiple API, in our code base let use use
    /// a strong type to wrap the access token to be sure not to feed an api with the wrong access token.
    /// </summary>
    public abstract class TokenBase
    {
        public TokenBase(string Token)
        {
            this.AccessToken = Token;
        }

        public string AccessToken { get; private set; }
    }

    public class Outlook365Token : TokenBase
    {
        public Outlook365Token(string accessToken) : base(accessToken) { }
    }
    public class GraphApiToken : TokenBase
    {
        public GraphApiToken(string accessToken) : base(accessToken) { }
    }

    public interface IConnectedUserProvider
    {
        Task<GraphApiToken> AcquireAzureGraphTokenForConnectedUserAsync();

        UserInfo GetUserInfo();

        string FirstName();

        string LastName();

        Task<MailUserInfo> GetMailUserInfo();

        bool TryGetUserInfo(out UserInfo userInfo);
    }

    public class UserInfo
    {
        public UserInfo(string upnName, string tenantId, string displayName, string nameIdentifier, string userObjectId)
        {
            this.UpnName = upnName;
            this.TenantId = tenantId;
            this.DisplayName = displayName;
            this.NameIdentifier = nameIdentifier;
            this.UserObjectId = userObjectId;
        }

        /// <summary>
        /// From now this is the only way to identify uniquely a user between Office365 tenants.
        /// </summary>
        public string UserObjectId { get; private set; }
        public string NameIdentifier { get; private set; }

        /// <summary>
        /// Logging name of the form of an email: [name]@[tenant domain name].[com|fr|org etc]
        /// </summary>
        /// <remarks>Useful because Human readable. Unique but may be mutable, the tenant may change its domain name
        /// </remarks>
        public string UpnName { get; private set; }

        /// <summary>
        /// TenantId as a Guid
        /// </summary>
        public string TenantId { get; private set; }

        /// <summary>
        /// Display name: firstname + lastname, e.g. Benoît Patra
        /// </summary>
        public string DisplayName { get; private set; }
    }

    public class MailUserInfo : UserInfo
    {
        public MailUserInfo(string upnName, string tenantId, string displayName, string nameIdentifier, string userObjectId, string email) : base(upnName, tenantId, displayName, nameIdentifier, userObjectId)
        {
            this.Email = email;
        }

        public string Email { get; set; }
    }
}