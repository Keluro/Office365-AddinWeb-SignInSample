using kmailteamWeb.Models;
using Office365WebAppAddinSignInSample.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Office365WebAppAddinSignInSample.Controllers
{
    [Authorize]
    public class AccountApiController : ApiController
    {
        private readonly IConnectedUserProvider _connectedUserProvider;
        public AccountApiController()
        {
            _connectedUserProvider = new ConnectedUserProvider();
        }

       


        [HttpGet]
        public async Task<MailUserInfoDto> CurrentUser()
        {
            var info = await _connectedUserProvider.GetMailUserInfo();
            return new MailUserInfoDto()
            {
                ObjectId = info.UserObjectId,
                DisplayName = info.DisplayName,
                UpnName = info.UpnName,
                Email = info.Email
            };
        }
    }
}