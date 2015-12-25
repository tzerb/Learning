using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShipmentsAPI.Models
{
    public class Billing
    {
        public int Id { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }

        public static List<Billing> Create()
        {
            return new List<Billing>
            {
                new Billing
                {
                    Id = 123,
                    Destination = "Billing",
                    Origin = "Billing"
                },
                new Billing
                {
                    Id = 343,
                    Destination = "Billing",
                    Origin = "Billing"
                }
            };
        }
    }
}