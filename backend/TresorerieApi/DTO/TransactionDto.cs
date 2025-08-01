using System.ComponentModel.DataAnnotations;

namespace TresorerieApi.DTOs
{
    public class TransactionDto
    {
       public int Id { get; set; }

    [Required(ErrorMessage = "Le montant est obligatoire")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Le montant doit être supérieur à zéro")]
    public decimal Amount { get; set; }

    [Required(ErrorMessage = "Le type est obligatoire")]
    [StringLength(50)]
    public string? Type { get; set; }

    public string? Description { get; set; }

    [Required(ErrorMessage = "La catégorie est obligatoire")]
    public int CategoryId { get; set; }

    public string? CategoryName { get; set; }
    }
}
