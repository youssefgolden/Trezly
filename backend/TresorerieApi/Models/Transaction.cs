namespace TresorerieApi.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string? Type { get; set; }
        public string? Description { get; set; }

        public int? CategoryId { get; set; } // Clé étrangère
        public Categorie? Category { get; set; } // Propriété de navigation
        

    }
}
