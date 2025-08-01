using System.Collections.Generic;
using TresorerieApi.Models; 

namespace TresorerieApi.Models
{
    public class Categorie
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public List<Transaction>? Transactions { get; set; }      
    }
}
