using System.Web.Http;
using ShipmentsAPI.Models;

namespace ShipmentsAPI.Controllers
{
    [Authorize]
    public class ShipmentsController : ApiController
    {        
        public IHttpActionResult Get()
        {
            return Ok(Shipment.Create());
        }
    }
}
