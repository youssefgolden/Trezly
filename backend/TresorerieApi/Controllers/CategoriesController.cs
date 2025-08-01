using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TresorerieApi.Models;
using TresorerieApi.Data;
using TresorerieApi.DTOs;

namespace TresorerieApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var categories = _context.Categories
                .Select(c => new CategorieDto
                {
                    Id = c.Id,
                    Name = c.Name
                }).ToList();

            return Ok(categories);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var categorie = _context.Categories
                .Where(c => c.Id == id)
                .Select(c => new CategorieDto
                {
                    Id = c.Id,
                    Name = c.Name
                })
                .FirstOrDefault();

            if (categorie == null) return NotFound();
            return Ok(categorie);
        }

        [HttpPost]
        public IActionResult Create(CategorieDto dto)
        {
            var categorie = new Categorie
            {
                Name = dto.Name
            };

            _context.Categories.Add(categorie);
            _context.SaveChanges();

            dto.Id = categorie.Id; // mettre à jour l’id généré

            return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, CategorieDto dto)
        {
            if (id != dto.Id) return BadRequest();

            var existingCategory = _context.Categories.Find(id);
            if (existingCategory == null) return NotFound();

            existingCategory.Name = dto.Name;
            _context.SaveChanges();

            return NoContent();
        }

       

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var categorie = _context.Categories.Find(id);
            if (categorie == null) return NotFound();
            
            var hasTransactions = _context.Transactions.Any(transaction => transaction.CategoryId == id);
            if (hasTransactions)
            {
                return BadRequest("You can't delete this category because it has linked transactions.");
            }

            _context.Categories.Remove(categorie);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
