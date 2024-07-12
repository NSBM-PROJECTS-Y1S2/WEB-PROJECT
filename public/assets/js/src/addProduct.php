<?php
// MongoDB connection
require '../../../../vendor/autoload.php';
$mongoClient = new MongoDB\Client("mongodb://localhost:27017");
$collection = $mongoClient->MEDIX->Medications;

// Get the form data
$productName = $_POST['productName'];
$imageLink = $_POST['imageLink'];
$dose = $_POST['dose'];
$price = $_POST['price'];
$description = $_POST['description'];

// Create a new document for the product
$newProduct = [
    'category' => 'Custom', // Add the appropriate category if required
    'medication' => $productName,
    'brandName' => 'Custom', // Add the appropriate brand name if required
    'doseData' => $dose,
    'details' => $description,
    'sideEffects' => 'Custom', // Add the appropriate side effects if required
    'warnings' => 'Custom', // Add the appropriate warnings if required
    'storage' => 'Custom', // Add the appropriate storage instructions if required
    'importantDetails' => 'Custom', // Add the appropriate important details if required
    'imageLink' => $imageLink,
    'prescription' => 'required', // Set the appropriate prescription requirement if required
    'price' => $price // Adding price to the product
];

// Insert the new product into the Medications collection
$result = $collection->insertOne($newProduct);

if ($result->getInsertedCount() === 1) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add product']);
}
?>
