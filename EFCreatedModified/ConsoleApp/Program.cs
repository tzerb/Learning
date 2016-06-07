using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {

            Model.CreatedModifiedModel context = new Model.CreatedModifiedModel();
            context.UserNameEvent += (s, e) =>
            {
                e.UserName = WindowsIdentity.GetCurrent().Name;
            };
            context.MyEntities.Add(new Model.MyEntity { Name = "FirstEntitiy" });
            context.SaveChanges();
        }

        private static void Context_UserNameEvent(object sender, EventArgs e)
        {
            throw new NotImplementedException();
        }
    }
}
