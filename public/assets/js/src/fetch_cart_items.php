<?php
session_start();
require '../../../../vendor/autoload.php'; // include Composer's autoloader

use MongoDB\Client;

$client = new Client("mongodb://localhost:27017");
$cartCollection = $client->MEDIX->cartItems;
$medicationsCollection = $client->MEDIX->Medications;

$filter = [
    'orderStatus' => 'add-cart',
    'userID' => $_SESSION['_id']
];

$options = [];

$cartCursor = $cartCollection->find($filter, $options);

$items = [];
foreach ($cartCursor as $cartDocument) {
    $itemId = $cartDocument['itemId'];
    $medicationDocument = $medicationsCollection->findOne(['_id' => new MongoDB\BSON\ObjectId($itemId)]);
    
    if ($medicationDocument) {
        $cartDocument['medicationDetails'] = $medicationDocument;
    }

    $items[] = $cartDocument;
}

echo json_encode($items);
?>
