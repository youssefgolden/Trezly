using Microsoft.EntityFrameworkCore;
using TresorerieApi.Models;

namespace TresorerieApi.Data
{
    public class AppDbContext : DbContext
    {
        // Le constructeur reçoit les options de configuration (ex: chaîne de connexion)
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSet représente ta table Transactions dans la base
        public DbSet<Transaction> Transactions { get; set; }

        public DbSet<Categorie> Categories { get; set; }

    }
}
