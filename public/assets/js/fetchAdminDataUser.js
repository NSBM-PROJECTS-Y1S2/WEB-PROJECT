function fetchUsers() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'assets/js/src/fetchAdminDataUsers.php', true);
    xhr.onload = function() {
        if (xhr.status == 200) {
            var users = JSON.parse(xhr.responseText);
            var tableBody = document.querySelector('#userTable tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            users.forEach(function(user) {
                var userIdAsString = user.ID.toString();
                var row = `<tr>
                    <td>${userIdAsString}</td>
                    <td>${user.Name}</td>
                    <td>${user.Email}</td>
                    <td>${user.Phone}</td>
                    <td><button class="btn btn-sm edit-btn" data-id="${userIdAsString}">Edit</button></td>
                    <td><button class="btn btn-sm delete-btn" data-id="${userIdAsString}">Delete</button></td>
                </tr>`;
                tableBody.innerHTML += row;
            });

            // Add event listeners for edit buttons
            document.querySelectorAll('.edit-btn').forEach(function(button) {
                button.addEventListener('click', function() {
                    var userId = this.getAttribute('data-id');
                    // Open edit modal or form
                    openEditForm(userId);
                });
            });

            // Add event listeners for delete buttons
            document.querySelectorAll('.delete-btn').forEach(function(button) {
                button.addEventListener('click', function() {
                    var userId = this.getAttribute('data-id');
                    deleteUser(userId);
                });
            });
        } else {
            console.error('Error fetching users:', xhr.statusText);
        }
    };
    xhr.send();
}

function deleteUser(userId) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'assets/js/src/deleteUser.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
                fetchUsers(); // Refresh the user list
            } else {
                console.error('Error deleting user:', response.message);
            }
        } else {
            console.error('Error deleting user:', xhr.statusText);
        }
    };
    xhr.send('id=' + encodeURIComponent(userId));
}

function openEditForm(userId) {
    var firstName = prompt('Enter new first name:');
    var lastName = prompt('Enter new last name:');
    var email = prompt('Enter new email:');
    var phone = prompt('Enter new phone number:');
    var address = prompt('Enter new address:');

    if (firstName && lastName && email && phone && address) {
        editUser(userId, firstName, lastName, email, phone, address);
    } else {
        alert('All fields are required!');
    }
}

function editUser(userId, firstName, lastName, email, phone, address) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'assets/js/src/editUser.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
                fetchUsers(); // Refresh the user list
            } else {
                console.error('Error editing user:', response.message);
            }
        } else {
            console.error('Error editing user:', xhr.statusText);
        }
    };
    var data = 'id=' + encodeURIComponent(userId) +
               '&firstName=' + encodeURIComponent(firstName) +
               '&lastName=' + encodeURIComponent(lastName) +
               '&email=' + encodeURIComponent(email) +
               '&phone=' + encodeURIComponent(phone) +
               '&address=' + encodeURIComponent(address);
    xhr.send(data);
}   

// Call fetchUsers to populate the table initially
fetchUsers();
