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

        public AccountApiController()
        {
        }

        [HttpGet]
        public async Task<string> CurrentUser()
        {
            //var info = await _connectedUserProvider.GetMailUserInfo(_office365WebCalls);
            //return new MailUserInfoDto()
            //{
            //    ObjectId = info.UserObjectId,
            //    DisplayName = info.DisplayName,
            //    UpnName = info.UpnName,
            //    Email = info.Email,
            //    ThumbnailUri = MicrosoftRestCallsManager.GetThumbnailClientUrl(info.UpnName)
            //};
            return "Mr hardcoded";
        }
    }
}