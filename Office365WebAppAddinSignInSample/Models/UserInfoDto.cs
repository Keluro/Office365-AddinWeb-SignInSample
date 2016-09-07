using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace kmailteamWeb.Models
{
    public class UserInfoDto
    {
        [JsonProperty("ObjectId")]
        public string ObjectId { get; set; }

        [JsonProperty("UpnName")]
        public string UpnName { get; set; }

        [JsonProperty("DisplayName")]
        public string DisplayName { get; set; }

        [JsonProperty("ThumbnailUri")]
        public string ThumbnailUri { get; set; }
    }

    public class MailUserInfoDto : UserInfoDto
    {
        [JsonProperty("Email")]
        public string Email { get; set; }
    }

    public class ExtendedUserInfoDto : UserInfoDto
    {
        [JsonProperty("CreationDate")]
        public DateTime CreationDate { get; set; }

        [JsonProperty("TenantId")]
        public string TenantId { get; set; }
    }
}