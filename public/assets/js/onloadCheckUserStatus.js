$(document).ready(function() {
    checkUserStatus();
    checkPharmaStatus();
});

function checkUserStatus() {
    $.ajax({
        url: "assets/js/src/UserSession.php",
        type: "GET",
        dataType: "json",
        success: function(response) {
            var userEmail = response.UserEmail;
            var userID = response.UserID;
            if (userEmail === "" || userID === "") {
                $("#UserAcc").text("CUSTOMER ACCOUNT");
                if (window.location.pathname.includes("payment.html") || window.location.pathname.includes("user_account_tab.html") || window.location.pathname.includes("user_orders.html") ){
                    window.location.href = "LandingPage.html";
                }
                // if (window.location.pathname.includes("Home.html")) {
                //     window.location.href = "LandingPage.html";
                // }
                document.getElementById("setUserStat").value = "";
            } else {
                $("#UserAcc").text("YOUR INTERFACE");
                $("#UserAcc").text("YOUR INTERFACE").attr("href", "user_account_tab.html");
                // Redirect to Home.html if the user in LandingPage.html
                if (window.location.pathname.includes("userLogin.html")) {
                    window.location.href = "Home.html";
                    // alert("Welcome Back, " + userEmail + " !");
                } else if (window.location.pathname.includes("Home.html")) {
                    alert("Welcome Back "+ userEmail);
                    $("#UserAcc").text("YOUR INTERFACE").attr("href", "user_account_tab.html");
                    document.getElementById("setUserStat").value = userID;
                } else {
                    document.getElementById("setUserStat").value = userID;
                }
            }
            console.log(response);
        }
    });
}
function checkPharmaStatus() {
    $.ajax({
        url: "assets/js/src/PharmacySession.php",
        type: "GET",
        dataType: "json",
        success: function(PharmacyResponse) {
            var pharmaEmail = PharmacyResponse.PharmacyEmail;
            var pharmaID = PharmacyResponse.PharmacyID;
            if (pharmaEmail === "" || pharmaID === "") {
                $("#pharmaAcc").text("SELLER ACCOUNT");
                if (window.location.pathname.includes("admin_index.html")){
                    window.location.href = "LandingPage.html";
                }
                // if (window.location.pathname.includes("Home.html")) {
                //     window.location.href = "LandingPage.html";
                // }
                document.getElementById("pharmaStatus").value = "";
            } else {
                $("#pharmaAcc").text("SELLER DASHBOARD").attr("href", "admin_index.html");
                // Redirect to Home.html if the user in LandingPage.html
                if (window.location.pathname.includes("pharmacyLogin.html")) {
                    window.location.href = "admin_index.html";
                    // alert("Welcome Back, " + userEmail + " !");
                } else if (window.location.pathname.includes("admin_index.html")) {
                    // alert(PharmacyResponse.PharmacyName)
                    document.getElementById("SellerName").innerHTML = PharmacyResponse.PharmacyName;
                    // alert("Welcome Back "+ pharmaEmail);
                    $("#pharmaAcc").text("SELLER DASHBOARD").attr("href", "admin_index.html");
                    document.getElementById("pharmaStatus").value = pharmaID;
                } else {
                    document.getElementById("pharmaStatus").value = pharmaID;
                }
            }
            console.log(PharmacyResponse);
        }
    });
}

function destroySession() {
    $.ajax({
        url: "assets/js/src/destroySession.php",
        type: "POST",
        data: {destroySession: true},
        success: function(response) {
            alert("You Will be logged out from the Website...");
            window.location.href = "LandingPage.html";
        }
    });
}


function deleteAccount() {
    var userID = document.getElementById("setUserStat").value;
    $.ajax({
        url: "assets/js/src/deleteAccount.php",
        type: "POST",
        data: {userID: userID},
        success: function(response) {
            alert("Your Account has been Deleted. USER:"+userID+" will be logged out from the Website...");
            window.location.href = "LandingPage.html";
        }
    });
}