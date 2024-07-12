document.addEventListener('DOMContentLoaded', function() {
    fetchCartItems();
});


// function sendPost(){
//     if (event.target.id === 'addBtn') {
//         var medicationId = event.target.parentElement.parentElement.parentElement.parentElement.id;
//         var xhr = new XMLHttpRequest();
//         xhr.open('POST', 'assets/js/src/add_to_cart.php', true);
//         xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//         xhr.onload = function() {
//             if (xhr.status == 200) {
//                 fetchCartItems();
//             }
//         };
//         xhr.send('medicationId=' + medicationId);
//     }
// };


function fetchCartItems() {
    var xhr = new XMLHttpRequest();
    // Send a POST request to the server with the User ID
    xhr.open('GET', 'assets/js/src/fetch_cart_items.php', true);
    xhr.onload = function() {
        if (xhr.status == 200) {
            var items = JSON.parse(xhr.responseText);
            displayCartItems(items);
        }
    };
    xhr.send();
}

function redirectToPay() {
    window.location = 'payment.html?status=buyaddcart';
}

function displayCartItems(items) {
    var container = document.getElementById('cartData');
    container.innerHTML = `
        <p class="text-center" id="mainHead">WELCOME TO YOUR CART</p>
        <div class="row" id="cartItemsRow"></div>
    `;

    var cartItemsRow = document.getElementById('cartItemsRow');

    items.forEach(function(item) {
        var medication = item.medicationDetails;
        var itemHTML = `
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-4">
                                <img src="${medication.imageLink}" alt="product-image" class="img-fluid">
                            </div>
                            <div class="col-8">
                                <h5 class="card-title">${medication.brandName}</h5>
                                <p class="card-text">${medication.details}</p>
                                <p class="card-text">Price: Rs. ${item.price}</p>
                                <p class="card-text">Quantity: 1</p>
                                <button class="btn btn-sm btn-primary" id="addBtn">Add Item</button>
                                <button class="btn btn-sm btn-danger" id="removeBtn">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cartItemsRow.innerHTML += itemHTML;
    });

    container.innerHTML += `<button class="btn" id="checkoutBtn" onclick="redirectToPay()">PROCEED TO CHECKOUT</button>`;
}


// Increase the quantity of the item in the cart
document.getElementById('cartData').addEventListener('click', function(event) {
    if (event.target.id === 'addBtn') {
        var medicationId = event.target.parentElement.parentElement.parentElement.parentElement.id;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'assets/js/src/add_to_cart.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status == 200) {
                fetchCartItems();
            }
        };
        xhr.send('medicationId=' + medicationId);
    }
});