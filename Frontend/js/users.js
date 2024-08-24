
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();

    document.getElementById('userForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addUser();
    });
});

function loadUsers() {
    fetch('http://localhost:8080/api/users')
        .then(response => response.json())
        .then(users => {
            const usersTableBody = document.querySelector('#usersTable tbody');
            usersTableBody.innerHTML = '';

            const user = users.$values || [];

            user.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.userID}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                    <td><button onclick="deleteUser(${user.userID})">Удалить</button></td>
                `;
                usersTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Ошибка при загрузке пользователей:', error));
}

function addUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            passwordHash: password,
            createdAt: new Date(),
            transactions: [],
        })
    })
    .then(response => {
        if (response.ok) {
            loadUsers();
            document.getElementById('userForm').reset();
        } else {
            console.error('Ошибка при добавлении пользователя:', response.statusText);
        }
    })
    .catch(error => console.error('Ошибка при добавлении пользователя:', error));
}

function deleteUser(userId) {
    fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            loadUsers();
        } else {
            console.error('Ошибка при удалении пользователя:', response.statusText);
        }
    })
    .catch(error => console.error('Ошибка при удалении пользователя:', error));
}
            