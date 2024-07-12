$(document).ready(function() {
    $.ajax({
        url: 'assets/js/src/userDetails.php',
        type: 'GET',
        success: function(data) {
            const userDetails = JSON.parse(data);
            if (!userDetails.error) {
                const fullName = userDetails.UserFirstName + ' ' + userDetails.UserLastName;
                $('#tbName').text(fullName);
                $('#tbContact').text(userDetails.UserPhoneNo);
                $('#email').text(userDetails.UserEmail);
                $('#passw').text(userDetails.UserPassword);
            } else {
                $('#tbName').text('Error loading data');
                $('#tbContact').text('Error loading data');
            }
        },
        error: function() {
            $('#tbName').text('Error loading data');
            $('#tbContact').text('Error loading data');
        }
    });
});