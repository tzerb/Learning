using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AsyncAwait
{
    class Program
    {
        static ManualResetEvent SyncEvent = new ManualResetEvent(false);
        
        static async Task Routine()
        {
            Console.WriteLine("Here");
            var t = Task.Factory.StartNew(async () =>
            {
                SyncEvent.WaitOne();
                //SyncEvent.Set();

                System.Threading.Thread.Sleep(3000);
                //Task inner = Task.Factory.StartNew(() => { });
                //return inner;
                //SyncEvent.Reset();
                Console.WriteLine("Done");
            });
            await t;
            
        }

        static void Main(string[] args)
        {
            Console.WriteLine("Hello");
            List<Task> list = new List<Task>();
            
            list.Add(Routine());
            list.Add(Routine());
            list.Add(Routine());

            //Task.WaitAll(list.ToArray());

            Console.WriteLine("Enter a key...");
            Console.ReadKey();

            SyncEvent.Set();

            Console.WriteLine("Enter a key...");
            Console.ReadKey();
        }
    }
}
