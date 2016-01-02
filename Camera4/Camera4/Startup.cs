using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Camera4.Startup))]
namespace Camera4
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
