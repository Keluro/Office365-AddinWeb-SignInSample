using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Office365WebAppAddinSignInSample.Controllers
{
    public class SpaController : Controller
    {
        public ActionResult Addin()
        {
            return View();
        }

        public ActionResult Web(string id)
        {
            ViewBag.IsOfficeModule = !string.IsNullOrEmpty(id);
            return View();
        }
    }
}