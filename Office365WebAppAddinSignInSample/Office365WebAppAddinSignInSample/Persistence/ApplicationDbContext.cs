using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Office365WebAppAddinSignInSample.Persistence
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext()
          : base("DefaultConnection")
        {
        }

        public ApplicationDbContext(string connectionString)
            : base(connectionString)
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }


        public DbSet<UserTokenCache> UserTokenCaches2 { get; set; }

    }
}