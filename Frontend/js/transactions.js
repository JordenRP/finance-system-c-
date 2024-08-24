document.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
    loadUsersAndCategories(); // Загрузка пользователей и категорий

    document.getElementById('transactionForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addTransaction();
    });
});

function loadTransactions() {
    fetch('http://localhost:8080/api/transactions')
        .then(response => response.json())
        .then(transactions => {
            const transactionsTableBody = document.querySelector('#transactionsTable tbody');
            transactionsTableBody.innerHTML = '';

            const transaction = transactions.$values || [];

            transaction.forEach(transaction => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${transaction.transactionID}</td>
                    <td>${transaction.transactionType}</td>
                    <td>${transaction.category.name}</td>
                    <td>${transaction.amount}</td>
                    <td>${transaction.description}</td>
                    <td>${new Date(transaction.transactionDate).toLocaleDateString()}</td>
                    <td><button onclick="deleteTransaction(${transaction.transactionID})">Удалить</button></td>
                `;
                transactionsTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Ошибка при загрузке транзакций:', error));
}

function loadUsersAndCategories() {
    // Загрузка пользователей
    fetch('http://localhost:8080/api/users')
        .then(response => response.json())
        .then(users => {
            const userSelect = document.getElementById('userId');

            const user = users.$values || [];

            user.forEach(user => {
                const option = document.createElement('option');
                option.value = user.userID;
                option.textContent = user.username;
                userSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Ошибка при загрузке пользователей:', error));

    // Загрузка категорий
    fetch('http://localhost:8080/api/categories')
        .then(response => response.json())
        .then(categories => {
            const categorySelect = document.getElementById('categoryId');
            const category = categories.$values || [];

            category.forEach(category => {
                const option = document.createElement('option');
                option.value = category.categoryID;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Ошибка при загрузке категорий:', error));
}

function addTransaction() {
    const userId = document.getElementById('userId').value;
    const categoryId = document.getElementById('categoryId').value;
    const transactionType = document.getElementById('transactionType').value;
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('transactionDescription').value;
    const transactionDate = document.getElementById('transactionDate').value;

    console.log(userId)
    fetch('http://localhost:8080/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userID: parseInt(userId),
            categoryID: parseInt(categoryId),
            transactionType: transactionType,
            amount: parseFloat(amount),
            description: description,
            transactionDate: transactionDate
        })
    })
        .then(response => {
            if (response.ok) {
                loadTransactions();
                document.getElementById('transactionForm').reset();
            } else {
                console.error('Ошибка при добавлении транзакции:', response.statusText);
            }
        })
        .catch(error => console.error('Ошибка при добавлении транзакции:', error));
}

function deleteTransaction(transactionId) {
    fetch(`http://localhost:8080/api/transactions/${transactionId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                loadTransactions();
            } else {
                console.error('Ошибка при удалении транзакции:', response.statusText);
            }
        })
        .catch(error => console.error('Ошибка при удалении транзакции:', error));
}
