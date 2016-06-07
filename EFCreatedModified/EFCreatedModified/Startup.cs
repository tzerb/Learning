using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EFCreatedModified.Startup))]
namespace EFCreatedModified
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
