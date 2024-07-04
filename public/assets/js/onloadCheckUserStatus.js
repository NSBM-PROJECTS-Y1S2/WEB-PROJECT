window.onload = function() {
    checkUserStatus();
};

function checkUserStatus() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/js/src/session.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var userEmail = response.UserEmail;
            var userID = response.UserID;

            if (userEmail === "" || userID === "") {
                alert("Debug: Not Logged In");
                document.getElementById("UserAcc").innerHTML = "CUSTOMER ACCOUNT";
            } else {
                document.getElementById("UserAcc").innerHTML = userEmail;
                alert("Debug: Logged In");
                alert("Welcome Back, " + userEmail + " !");
            }
        }
    };
    xhr.send();
}
