<?php
session_start(); // Start the session to access $_SESSION
require '../../../../vendor/autoload.php';

use MongoDB\Client;


$client = new Client("mongodb://localhost:27017");
$collection = $client->MEDIX->cartItems;
$medicationsCollection = $client->MEDIX->Medications;

$userId = $_SESSION['_id'];

$query = [
    'orderStatus' => 'add-cart',
    'userID' => $userId
];

$cursor = $collection->find($query);

$totalAmount = 0;
$count = 0;

foreach ($cursor as $document) {
    $count++;
    $medicationId = new MongoDB\BSON\ObjectId($document->itemId);
    $medication = $medicationsCollection->findOne(['_id' => $medicationId]);
    $totalAmount += $document->price;
}

$result = [
    'count' => $count,
    'totalAmount' => $totalAmount
];

echo json_encode($result);
?>
