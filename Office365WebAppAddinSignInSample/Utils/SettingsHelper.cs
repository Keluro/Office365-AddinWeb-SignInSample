using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using Microsoft.IdentityModel.Clients.ActiveDirectory;

namespace Office365WebAppAddinSignInSample.Utils
{
    public class SettingsHelper
    {
        public const string GraphApiMyOrganization = GraphApi + "myorganization";
        public const string GraphApiMe = @"https://graph.windows.net/me?api-version=1.6";
        private const string _authorizationUri = "https://login.windows.net";
        public const string GraphApi = "https://graph.windows.net/";
        private const string _authority = "https://login.windows.net/common/";


        public static string ClientIdApp2
        {
            get
            {
                var clientId2 = ConfigurationManager.AppSettings["ida:ClientIdApp"];
                if (string.IsNullOrEmpty(clientId2)) { throw new ArgumentException("ClientIdApp is null or empty"); }
                return clientId2;
            }
        }
        public static ClientCredential GetApp2Credentials()
        {
            string appkey2 = ConfigurationManager.AppSettings["ida:AppKeyApp"];
            if (string.IsNullOrEmpty(appkey2)) { throw new ArgumentException("AppKeyApp is null or empty"); }

            return new ClientCredential(ClientIdApp2, appkey2);
        }
       
        public static string AuthorizationUri
        {
            get
            {
                return _authorizationUri;
            }
        }

        public static string Authority
        {
            get
            {
                return _authority;
            }
        }

        public static string AADGraphResourceId
        {
            get
            {
                return GraphApi;
            }
        }

        public static string LoginLogoutRedictRelativeUri
        {
            get { return "/"; }
        }

        public static string PopupLoginRedirectRelativeUri
        {
            get { return "/Account/CloseAuto"; }
        }
    }
}