using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Office365WebAppAddinSignInSample.Controllers
{
    public class CloseHub : Hub
    {
        public void Initialize()
        {

        }

        public void GoToRoot(string signalrRef)
        {
            Clients.Client(signalrRef).goToRoot();
        }
    }
}