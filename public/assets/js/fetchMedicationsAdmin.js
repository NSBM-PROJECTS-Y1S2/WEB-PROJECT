function fetchMedications() {
    $.ajax({
        url: 'assets/js/src/fetchMedications.php',
        method: 'GET',
        dataType: 'json',
        success: function(medications) {
            var container = $('.row');
            container.empty(); // Clear existing content

            medications.forEach(function(medication) {
                var card = `<div class="col-6">
                    <div class="card">
                        <img src="${medication.image}" alt="product-image" class="img-fluid" id="productImage">
                        <div class="card-body">
                            <h5 class="card-title">${medication.name}</h5>
                            <p class="card-text">${medication.description}</p>
                            <p class="card-text">Price: Rs. ${medication.price}</p>
                            <p class="card-text">Quantity: ${medication.quantity}</p>
                            <button class="btn btn-danger" id="removeBtn">Remove</button>
                        </div>
                    </div>
                </div>`;
                container.append(card);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error fetching medications:', error);
        }
    });
}

fetchMedications();
