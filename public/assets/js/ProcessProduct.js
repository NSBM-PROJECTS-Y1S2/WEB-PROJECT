function uploadToDatabase(productID, productName, userID, buyOrCart) {
    $.ajax({
        url: "assets/js/src/processProduct.php",
        type: "POST",
        data: {
            productID: productID,
            productName: productName,
            userID: userID,
            buyOrCart:buyOrCart
        },
        success: function(response) {
            if (response === "success") {
                
                alert("Product has been uploaded successfully!");
                // alert()
                window.location.href = "Home.html";
            } else {
                alert("Product upload failed, please try again later.");
            }
        }
    });
}