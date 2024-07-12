<?php
session_start();
require '../../../../vendor/autoload.php'; // include Composer's autoloader

use MongoDB\Client;

$client = new Client("mongodb://localhost:27017");
$cartCollection = $client->MEDIX->cartItems;

$filter = [
    'orderStatus' => 'add-cart',
    'userID' => $_SESSION['_id']
];

$options = [];

// Find all cart items with 'add-cart' status for the current user
$cartCursor = $cartCollection->find($filter, $options);

// Iterate through each cart item and delete it
foreach ($cartCursor as $cartDocument) {
    $deleteResult = $cartCollection->deleteOne(['_id' => $cartDocument['_id']]);
    // Optionally, you can check $deleteResult if needed
}

echo json_encode(['message' => 'Cart items with orderStatus "add-cart" deleted successfully']);

?>
