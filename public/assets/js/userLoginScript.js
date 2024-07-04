function CheckForLoginStat() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    $.ajax({
        type: "POST",
        url: "assets/js/src/userLoginProcess.php",
        data: {
            email: email,
            password: password
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
        error: function(xhr, status, error) {
            console.error("AJAX Error:", status, error);
            alert("An error occurred while processing your request.");
        }
    }); 
}