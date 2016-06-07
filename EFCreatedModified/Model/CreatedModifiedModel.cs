namespace Model
{
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class UserNameEventArgs : EventArgs
    {
        public string UserName { get; set; }
    }

    public class CreatedModifiedModel : DbContext
    {
        public delegate void UserNameEventHandler(object sender, UserNameEventArgs e);

        // Declare the event.
        public event UserNameEventHandler UserNameEvent;

        // Your context has been configured to use a 'CreatedModifiedModel' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'Model.CreatedModifiedModel' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'CreatedModifiedModel' 
        // connection string in the application configuration file.
        public CreatedModifiedModel()
            : base("name=CreatedModifiedModel")
        {
        }

        public override int SaveChanges()
        {
            var entities = ChangeTracker.Entries().Where(x => x.Entity is BaseEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));

            var currentUsername = "default";
            if (UserNameEvent != null)
            {
                var e = new UserNameEventArgs();
                UserNameEvent(this, e);
                currentUsername = e.UserName;
            }

            //var currentUsername = HttpContext.Current != null && HttpContext.Current.User != null
            //    ? HttpContext.Current.User.Identity.Name
            //    : "Anonymous";

            foreach (var entity in entities)
            {
                if (entity.Entity is BaseEntity)
                {
                    if (entity.State == EntityState.Added)
                    {
                        ((BaseEntity)entity.Entity).CreatedDate = DateTime.Now;
                        ((BaseEntity)entity.Entity).CreatedBy = currentUsername;
                    }

                    ((BaseEntity)entity.Entity).ModifiedDate = DateTime.Now;
                    ((BaseEntity)entity.Entity).ModifiedBy = currentUsername;
                }
            }

            return base.SaveChanges();
        }

        public virtual DbSet<MyEntity> MyEntities { get; set; }
    }

    public class MyEntity : BaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}