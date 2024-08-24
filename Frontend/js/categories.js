
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();

    document.getElementById('categoryForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addCategory();
    });
});

function loadCategories() {
    fetch('http://localhost:8080/api/categories')
        .then(response => response.json())
        .then(categories => {
            const categoriesTableBody = document.querySelector('#categoriesTable tbody');
            categoriesTableBody.innerHTML = '';

            const category = categories.$values || [];

            category.forEach(category => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${category.categoryID}</td>
                    <td>${category.name}</td>
                    <td>${category.description}</td>
                    <td><button onclick="deleteCategory(${category.categoryID})">Удалить</button></td>
                `;
                categoriesTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Ошибка при загрузке категорий:', error));
}

function addCategory() {
    const name = document.getElementById('categoryName').value;
    const description = document.getElementById('categoryDescription').value;

    fetch('http://localhost:8080/api/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            description: description,
            transactions: [],
        })
    })
    .then(response => {
        if (response.ok) {
            loadCategories();
            document.getElementById('categoryForm').reset();
        } else {
            console.error('Ошибка при добавлении категории:', response.statusText);
        }
    })
    .catch(error => console.error('Ошибка при добавлении категории:', error));
}

function deleteCategory(categoryId) {
    fetch(`http://localhost:8080/api/categories/${categoryId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            loadCategories();
        } else {
            console.error('Ошибка при удалении категории:', response.statusText);
        }
    })
    .catch(error => console.error('Ошибка при удалении категории:', error));
}
            