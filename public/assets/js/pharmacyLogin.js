function CheckLoginStat() {
    let pharmaEmail = document.getElementById('pharmaEmail').value;
    let pharmaPassword = document.getElementById('pharmaPassword').value;
    $.ajax({
        type: "POST",
        url: "assets/js/src/pharmacyLogin.php",
        data: {
            pharmaEmail: pharmaEmail,
            pharmaPassword: pharmaPassword
        },
        success: function(response) {
            var parsedResponse = JSON.parse(response);
            if (parsedResponse.success) {
                alert("Login Successful, Welcome Back !");
                window.location.href = "Home.html";
            } else {
                alert(parsedResponse.message);
            }
        },
        error: function(xhr,status, error) {
            console.error("AJAX Error:", status, error);
            alert("An error occurred while processing your request.");
        }
    }); 
}