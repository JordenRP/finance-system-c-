using FinanceManagementSystem.Database.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinanceManagementSystem.Services
{
    public interface ITransactionService
    {
        Task<IEnumerable<Transaction>> GetAllTransactionsAsync();
        Task<Transaction> GetTransactionByIdAsync(int transactionId);
        Task CreateTransactionAsync(Transaction transaction);
        Task<Transaction> UpdateTransactionAsync(Transaction transaction);
        Task<bool> DeleteTransactionAsync(int transactionId);
    }
}
