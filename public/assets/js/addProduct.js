document.getElementById('addItem').addEventListener('click', function(event) {
    event.preventDefault();

    var productName = document.getElementById('Pname').value;
    var imageLink = document.getElementById('imgLink').value;
    var dose = document.getElementById('dose').value;
    var price = document.getElementById('price').value;
    var description = document.getElementById('AddDe').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'assets/js/src/addProduct.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
                alert('Product added successfully!');
                // Optionally, clear the form or redirect the user
                document.querySelector('form').reset();
            } else {
                console.error('Error adding product:', response.message);
                alert('Failed to add product: ' + response.message);
            }
        } else {
            console.error('Error adding product:', xhr.statusText);
            alert('Failed to add product');
        }
    };
    var data = 'productName=' + encodeURIComponent(productName) +
               '&imageLink=' + encodeURIComponent(imageLink) +
               '&dose=' + encodeURIComponent(dose) +
               '&price=' + encodeURIComponent(price) +
               '&description=' + encodeURIComponent(description);
    xhr.send(data);
});
