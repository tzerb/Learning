using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using Microsoft.AspNet.Builder;
//using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

//https://app.pluralsight.com/player?course=asp-dot-net-5-understanding&author=roland-guijt&name=asp-dot-net-5-understanding-m2&clip=0&mode=live
//http://www.mithunvp.com/angular-2-in-asp-net-5-typescript-visual-studio-2015/

namespace WebApplication4
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {

            loggerFactory.AddConsole(minLevel: LogLevel.Information);
            var logger = loggerFactory.CreateLogger("info");

            app.Run(async (context) =>
            {
                logger.LogInformation("Before");
                await context.Response.WriteAsync("Hello World!");
                logger.LogInformation("After");
            });
        }

        //public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
