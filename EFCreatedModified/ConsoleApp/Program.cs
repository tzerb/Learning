using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Model.CreatedModifiedModel context = new Model.CreatedModifiedModel();
            context.MyEntities.Add(new Model.MyEntity { Name = "FirstEntitiy" });
            context.SaveChanges();
        }
    }
}
