using System;
using Microsoft.AspNet.Mvc;

namespace DNXMVC6TypeScriptAngular2Example1.MVC.Controllers
{
    public class ApplicationController : Controller
    {
        public IActionResult GetConfig()
        {
            var model = new Models.ConfigModel();

            model.ApplicationName = "DNX MVC6 TypeScript Angular2 example";
            model.Version = "1.2";

            return Json(model);
        }
    }
}