using Microsoft.AspNetCore.Mvc;
using FinanceManagementSystem.Database.Models;
using FinanceManagementSystem.Services;
using FinanceManagementSystem.Models;

namespace FinanceManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        private readonly IUserService _userService;
        private readonly ICategoryService _categoryService;

        public TransactionsController(ITransactionService transactionService, IUserService userService, ICategoryService categoryService)
        {
            _transactionService = transactionService;
            _userService = userService;
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTransactions()
        {
            var transactions = await _transactionService.GetAllTransactionsAsync();
            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransactionById(int id)
        {
            var transaction = await _transactionService.GetTransactionByIdAsync(id);
            if (transaction == null)
                return NotFound();
            return Ok(transaction);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransaction(CreateTransactionRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userService.GetUserByIdAsync(request.UserID);
            if (user == null)
                return BadRequest("User not found.");

            var category = await _categoryService.GetCategoryByIdAsync(request.CategoryID);
            if (category == null)
                return BadRequest("Category not found.");

            var transaction = new Transaction
            {
                UserID = request.UserID,
                CategoryID = request.CategoryID,
                TransactionType = request.TransactionType,
                Amount = request.Amount,
                Description = request.Description,
                TransactionDate = request.TransactionDate,
                CreatedAt = DateTime.UtcNow
            };

            await _transactionService.CreateTransactionAsync(transaction);

            return CreatedAtAction(nameof(GetTransactionById), new { id = transaction.TransactionID }, transaction);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(int id, Transaction transaction)
        {
            if (id != transaction.TransactionID)
                return BadRequest();

            var updatedTransaction = await _transactionService.UpdateTransactionAsync(transaction);
            if (updatedTransaction == null)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var deleted = await _transactionService.DeleteTransactionAsync(id);
            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}
