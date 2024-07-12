<?php
require '../../../../vendor/autoload.php';

$client = new MongoDB\Client("mongodb://localhost:27017");
$collection = $client->MEDIX->cartItems;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $itemId = $_POST['orderId'];
    $price = $_POST['price'];
    $orderStatus = $_POST['orderStat'];

    $result = $collection->insertOne([
        'itemId' => $itemId,
        'price' => $price,
        'createdAt' => new MongoDB\BSON\UTCDateTime(),
        'userID' => $_POST['userID'],
        'orderStatus' => $orderStatus
    ]);

    if ($result->getInsertedCount() > 0) {
        echo json_encode(['status' => 'success', 'message' => 'Order added to cart']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add order to cart']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
