using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Office365WebAppAddinSignInSample.Persistence
{
    public class UserTokenCache
    {
        [Key]
        public string UserObjectId { get; set; }
        public byte[] CachedBits { get; set; }
        public DateTime LastWrite { get; set; }
    }
}