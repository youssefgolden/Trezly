using System.ComponentModel.DataAnnotations;

namespace TresorerieApi.DTOs
{
    public class CategorieDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(100, ErrorMessage = "Name cannot contain more than 100 characters")]
        public string Name { get; set; }
    }

}
