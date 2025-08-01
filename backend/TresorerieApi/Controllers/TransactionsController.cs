using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TresorerieApi.Models;
using TresorerieApi.Data;
using TresorerieApi.DTOs;

namespace TresorerieApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TransactionsController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/Transactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetTransactions(int pageNumber = 1, int pageSize = 10)
        {
            var transactionsQuery = _context.Transactions
                .Include(t => t.Category)
                .AsQueryable();

            var transactions = await transactionsQuery
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var result = transactions.Select(t => new TransactionDto
            {
                Id = t.Id,
                Amount = t.Amount,
                Type = t.Type,
                Description = t.Description,
                CategoryName = t.Category?.Name
            });

            return Ok(result); // return list of TransactionDto
        }


        // POST api/Transactions
        [HttpPost]
public IActionResult Create(TransactionDto dto)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    // Vérifie que la catégorie existe
    var categorie = _context.Categories.Find(dto.CategoryId);
    if (categorie == null)
        return BadRequest("Catégorie invalide");

    var transaction = new Transaction
    {
        Amount = dto.Amount,
        Type = dto.Type!,
        Description = dto.Description,
        CategoryId = dto.CategoryId
    };

    _context.Transactions.Add(transaction);
    _context.SaveChanges();

    dto.Id = transaction.Id;
    dto.CategoryName = categorie.Name;

    return CreatedAtAction(nameof(GetTransactionById), new { id = dto.Id }, dto);
}


        // GET api/Transactions/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDto>> GetTransactionById(int id)
        {
            var t = await _context.Transactions
                .Include(tr => tr.Category)
                .FirstOrDefaultAsync(tr => tr.Id == id);

            if (t == null) return NotFound();

            var dto = new TransactionDto
            {
                Id = t.Id,
                Amount = t.Amount,
                Type = t.Type,
                Description = t.Description,
                CategoryName = t.Category?.Name
            };

            return Ok(dto);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(int id, TransactionDto dto)
        {
            if (id != dto.Id)
                return BadRequest("ID mismatch");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
                return NotFound();

            var categorie = await _context.Categories.FindAsync(dto.CategoryId);
            if (categorie == null)
                return BadRequest("Catégorie invalide");

            transaction.Amount = dto.Amount;
            transaction.Type = dto.Type!;
            transaction.Description = dto.Description;
            transaction.CategoryId = dto.CategoryId;

            await _context.SaveChangesAsync();

            return NoContent(); //204
        }


        // DELETE api/Transactions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
                return NotFound();

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return NoContent(); //204
        }

    }
}
