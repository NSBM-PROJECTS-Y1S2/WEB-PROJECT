
var inhibitor = 0;

// $.ajax({
//     type: "GET",
//     url: "assets/js/src/paymentProcess.php",
// });

function paymentCalculation(){
    var qty = document.getElementById("itmQty").value;
    amount =price * qty;
    document.getElementById("amount").innerHTML = amount;
    var totalAmount = amount + shipFee;
    document.getElementById("totAmount").innerHTML = totalAmount;
}

function uploadDataToMongo() {
    let ItemName = document.getElementById("retrieveItemID").value;
    let cardNumber = document.getElementById("cardNumber").value;
    let cardHolder = document.getElementById("cardHolder").value;
    let expirationDate = document.getElementById("expDT").value;
    let securityCode = document.getElementById("cvv").value;
    let zipCode = document.getElementById("zipcode").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let address = document.getElementById("state").value;
    // let email = document.getElementById("email").value;
    let phone = document.getElementById("phoneNumber").value;
    var price = document.getElementById("totAmount").innerText;
    var amount = document.getElementById("itmQty").innerText;
    let UserID = document.getElementById("setUserStat").value;
    let Method;
    let Status;
    
    if (inhibitor == 1) {
        Method = "Cash On Delivery";
        Status = "Pending";
    } else if (inhibitor == 2) {
        Method = "Debit Card";
        Status = "Paid";
    } else {
        Method = "Credit Card";
        Status = "Paid";
    }
    

    $.ajax({
        type: "POST",
        url: "assets/js/src/paymentProcess.php",
        data: {
            ItemName: ItemName,
            UserID: UserID,
            cardNumber: cardNumber,
            cardHolder: cardHolder,
            expirationDate: expirationDate,
            securityCode: securityCode,
            zipCode: zipCode,
            city: city,
            state: city,
            address: address,
            // email: email,
            phone: phone,
            Price: price,
            Amount: amount,
            Method: Method,
            Status: Status
        },
        success: function(response) {
            console.log("Payment Succeeded: " + response);
            alert("Payment Accepted !, Thank you for using our services...");
            window.location.href = "Home.html";
            // clearCart();
            // window.location.href = 'index.html'; // Redirect user after successful payment
        },
        error: function(xhr, status, error) {
            console.error("An Error Occurred: " + error);
            alert("Fatal Error! Please try again later.");
        }
    });
    clearAllCartItems();
    // alert("Ajax End Reached");
}

function validateInputData() {
    // Input Validation
    let cardNumber = document.getElementById("cardNumber").value;
    let cardHolder = document.getElementById("cardHolder").value;
    let expirationDate = document.getElementById("expDT").value;
    let securityCode = document.getElementById("cvv").value;

    let cardNumberPattern = /^[0-9]{16}$/;
    let cardHolderPattern = /^[a-zA-Z\s]{1,}$/;
    let expirationDatePattern = /^[0-9]{2}\/[0-9]{2}$/;
    let securityCodePattern = /^[0-9]{3}$/;
    if (inhibitor == 0 || inhibitor == 2) {
        if (!cardNumber.match(cardNumberPattern)) {
            alert("Invalid card number");
            return;
        }

        if (!cardHolder.match(cardHolderPattern)) {
            alert("Invalid card holder");
            return;
        }

        if (!expirationDate.match(expirationDatePattern)) {
            alert("Invalid expiration date");
            return;
        }

        if (!securityCode.match(securityCodePattern)) {
            alert("Invalid security code");
            return;
        }
        try {
            uploadDataToMongo();
        }
        catch (error) {
            console.error("An Error Occurred: " + error);
            alert("Fatal Error! Please try again later.");
        }
        // alert("Payment successful");
    } else {
        uploadDataToMongo();
        alert("You have Selected Cash On Delivery method. Thanks for using our services...")
    }
    // document.getElementById("paymentForm").reset();
}

document.addEventListener('DOMContentLoaded', function () {
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const cardContainer = document.getElementById('cardContainer');

    paymentMethods.forEach(method => {
      method.addEventListener('change', function () {
        if (this.value === 'cashOnDelivery') {
          cardContainer.style.display = 'none';
          inhibitor = 1;
        } else if (this.value === 'debitCard'){
          inhibitor = 2;
          cardContainer.style.display = 'block';
        } else {
          cardContainer.style.display = 'block';
          inhibitor = 0;
        }
      });
    });
  });