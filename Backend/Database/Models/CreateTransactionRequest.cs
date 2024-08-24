namespace FinanceManagementSystem.Models
{
    public class CreateTransactionRequest
    {
        public int UserID { get; set; }
        public int CategoryID { get; set; }
        public string TransactionType { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime TransactionDate { get; set; }
    }
}
