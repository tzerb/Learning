using ShipmentsAPI.Models;
using System.Web.Http;

namespace ShipmentsAPI.Controllers
{
    [Authorize]
    public class BillingController : ApiController
    {
        public IHttpActionResult Get()
        {
            return Ok(Billing.Create());
        }
    }
}
