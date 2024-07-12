<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo "Method Not Allowed";
    exit;
}

$currentDateTime = date('Y-m-d H:i:s');

require '../../../../vendor/autoload.php';
session_start();
$mongoUri = "mongodb://localhost:27017";
$dbName = "MEDIX";
$collectionName = "cartItems";

try {
    $mongoClient = new MongoDB\Client($mongoUri);
    $db = $mongoClient->$dbName;
    $collection = $db->$collectionName;


    $document = array(
        'productID' => $_POST['productID'],
        'productName' => $_POST['productName'],
        'userID' => $_POST['userID'],
        'buyOrCart' => $_POST['orderStat']
    );

    $collection->insertOne($document);
    echo "Payment successfully processed.";
} catch (MongoDB\Driver\Exception\Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
