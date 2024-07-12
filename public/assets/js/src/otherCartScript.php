<?php
require '../../../../vendor/autoload.php';

use MongoDB\Client;

session_start(); // Start the session to access $_SESSION

$client = new Client("mongodb://localhost:27017");
$collection = $client->MEDIX->cartItems;
$medicationsCollection = $client->MEDIX->Medications;

$userId = $_SESSION['UserID']; // Retrieve UserID from session

$query = [
    'orderStatus' => 'add-cart',
    'UserID' => $userId // Add UserID to the query
];

$cursor = $collection->find($query);

$totalAmount = 0;
$count = 0;

foreach ($cursor as $document) {
    $count++;
    $medicationId = new MongoDB\BSON\ObjectId($document->itemId);
    $medication = $medicationsCollection->findOne(['_id' => $medicationId]);
    
    // Calculate the total amount from the price section of cartItems
    $totalAmount += $document->price;

    // You can include additional logic here if needed for medication details
    // if ($medication) {
    //     // Additional logic if required
    // }
}

$result = [
    'count' => $count,
    'totalAmount' => $totalAmount
];

echo json_encode($result);
?>
