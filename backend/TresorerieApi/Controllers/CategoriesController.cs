using Microsoft.AspNetCore.Mvc;
using TresorerieApi.Data;
using TresorerieApi.DTOs;
using TresorerieApi.Services;

namespace TresorerieApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly CategoriesService _categoriesService;

        public CategoriesController(AppDbContext context, CategoriesService categoriesService)
        {
            // _context = context;
            _categoriesService = categoriesService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {   
            // old, removed after creating service
            // var categories = _context.Categories
            //     .Select(c => new CategorieDto
            //     {
            //         Id = c.Id,
            //         Name = c.Name
            //     }).ToList();
            var categories = _categoriesService.GetAllCategories();

            return Ok(categories);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {   
            
            // var categorie = _context.Categories
            //     .Where(c => c.Id == id)
            //     .Select(c => new CategorieDto
            //     {
            //         Id = c.Id,
            //         Name = c.Name
            //     })
            //     .FirstOrDefault();
            var category = _categoriesService.GetCategoryById(id);

            if (category == null) return NotFound();
            return Ok(category);
        }

        [HttpPost]
        public IActionResult Create(CategorieDto dto)
        {
            // var categorie = new Categorie
            // {
            //     Name = dto.Name
            // };

            // _context.Categories.Add(categorie);
            // _context.SaveChanges();

            // dto.Id = categorie.Id; // mettre à jour l’id généré

            var created = _categoriesService.CreateCategory(dto);

            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
            
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, CategorieDto dto)
        {
            try
            {
                _categoriesService.UpdateCategory(id, dto);
                // return 200, all is ok , return void 
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                // return 400 pb on the request
                return BadRequest(ex.Message);
            }
           catch (InvalidOperationException ex)
           {
            // return 404 the category dont existe
            return NotFound(ex.Message);
           }
        }



        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _categoriesService.DeleteCategory(id);
                // return 200, all is ok , return void 
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                // return 400 pb on the request

                return BadRequest(ex.Message);
            }
             catch (ArgumentException ex)
            {
            // return 404 the category dont existe
                return NotFound(ex.Message);
            }
        }
    }
}
