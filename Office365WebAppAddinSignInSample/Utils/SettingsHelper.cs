using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using Microsoft.Identity.Client;
using ADALClientCredential = Microsoft.IdentityModel.Clients.ActiveDirectory.ClientCredential;
using MSALClientCredential = Microsoft.Identity.Client.ClientCredential;

namespace Office365WebAppAddinSignInSample.Utils
{
    public class SettingsHelper
    {
        public const string GraphApiMyOrganization = GraphApi + "myorganization";
        public const string GraphApiMe = @"https://graph.windows.net/me?api-version=1.6";
        private const string _authorizationUri = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
        public const string GraphApi = "https://graph.windows.net/";
        private const string _authority = "https://login.microsoftonline.com/common/v2.0/";


        public static string ClientIdApp2
        {
            get
            {
                var clientId2 = ConfigurationManager.AppSettings["ida:ClientIdApp"];
                if (string.IsNullOrEmpty(clientId2)) { throw new ArgumentException("ClientIdApp is null or empty"); }
                return clientId2;
            }
        }

        public static string ClientSecret => ConfigurationManager.AppSettings["ida:AppKeyApp"];

        public static ADALClientCredential GetApp2Credentials()
        {
            string appkey2 = ConfigurationManager.AppSettings["ida:AppKeyApp"];
            if (string.IsNullOrEmpty(appkey2)) { throw new ArgumentException("AppKeyApp is null or empty"); }

            return new ADALClientCredential(ClientIdApp2, appkey2);
        }

        public static ConfidentialClientApplication GetClientApplication()
        {
            MSALClientCredential credential = new MSALClientCredential(ClientSecret);
            var app = new ConfidentialClientApplication(ConfigurationManager.AppSettings["ida:ClientIdApp"], "https://localhost:44301/", credential, TokenCache.DefaultSharedUserTokenCache);
            return app;
        }

        //public static ConfidentialClientApplication GetApplication()
        //{
        //    var clientCredentials = new ClientCredential(ConfigurationManager.AppSettings["ida:ClientIdApp"],
        //        ConfigurationManager.AppSettings["ida:AppKeyApp"]);

        //    return new ConfidentialClientApplication();
        //}
       
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