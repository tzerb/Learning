using System;
using Microsoft.AspNetCore.Mvc;

namespace DNXMVC6TypeScriptAngular2Example1.MVC.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Home()
        {
            return View();
        }
    }
}