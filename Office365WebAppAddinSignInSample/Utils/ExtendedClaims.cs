using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Office365WebAppAddinSignInSample.Utils
{
    public class ExtendedClaimsType
    {
        public const string TenantId = "http://schemas.microsoft.com/identity/claims/tenantid";

        public const string ObjectId = "http://schemas.microsoft.com/identity/claims/objectidentifier";

        public const string PreferredUsername = "preferred_username";
    }
}