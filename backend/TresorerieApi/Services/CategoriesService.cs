using System.Collections.Generic;
using TresorerieApi.Models;
using TresorerieApi.Data;
using TresorerieApi.DTOs;
using TresorerieApi.Services;

namespace TresorerieApi.Services
{
    public class CategoriesService
    {
        private readonly AppDbContext _context;

        //controllers
        public CategoriesService(AppDbContext context)
        {
            _context = context;
        }

        public List<CategorieDto> GetAllCategories()
        {
            // go to the Categories table on bdd, using Entity Framework (EF)
            // _context is an instance of AppDbContext
            // projection for return only data we want
            var categories = _context.Categories
                .Select(c => new CategorieDto
                {
                    Id = c.Id,
                    Name = c.Name
                }).ToList();



            return categories;
        }

        public CategorieDto? GetCategoryById(int id)
        {
            // go to the Categories table on bdd and select only data we need.
            var category = _context.Categories
                .Where(c => c.Id == id)
                .Select(c => new CategorieDto
                {
                    Id = c.Id,
                    Name = c.Name
                }).FirstOrDefault();
            // return only the first result
            return category;

        }

        public CategorieDto CreateCategory(CategorieDto dto)
        {
            // new instance of Categorie with data from dto
            var categorie = new Categorie
            {
                Name = dto.Name
            };

            //add this categorie with DbContext
            _context.Categories.Add(categorie);

            // save
            _context.SaveChanges();

            // update id on the DTO from id of categorie
            dto.Id = categorie.Id;

            // return data
            return dto;
        }


        // public to be accesible for controllers
        public void UpdateCategory(int id, CategorieDto dto)
        {
            // check that the id is the same than the dto one
            if (id != dto.Id) throw new ArgumentException("Error updating category");

            // search if we have already a category with this id
            var existingCategory = _context.Categories.Find(id);

            //if not, throw an error
            if (existingCategory == null) throw new InvalidOperationException("Error category not found");

            // update the name and save
            existingCategory.Name = dto.Name;
            _context.SaveChanges();
        }

        public void DeleteCategory(int id)
        {   
            // found the targeted category
            var categorie = _context.Categories.Find(id);

            //i f category not found, throw an error
            if (categorie == null) throw new ArgumentException("Error category not found");

            var hasTransactions = _context.Transactions.Any(transaction => transaction.CategoryId == id);
            if (hasTransactions)
            {
                
                throw new InvalidOperationException("You can't delete this category because it has linked transactions.");
            }

            _context.Categories.Remove(categorie);
            _context.SaveChanges();

        }
        
       
    }
}
