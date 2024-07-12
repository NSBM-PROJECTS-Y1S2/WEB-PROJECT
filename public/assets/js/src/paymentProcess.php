<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo "Method Not Allowed";
    exit;
}

$currentDateTime = date('Y-m-d H:i:s');

require '../../../../vendor/autoload.php';

$mongoUri = "mongodb://localhost:27017";
$dbName = "MEDIX";
$collectionName = "payment";

try {
    $mongoClient = new MongoDB\Client($mongoUri);
    $db = $mongoClient->$dbName;
    $collection = $db->$collectionName;

    $document = array(
        'ItemName' => $_POST['ItemName'],
        'UserID' => $_POST['UserID'],
        'cardNumber' => $_POST['cardNumber'],
        'cardHolder' => $_POST['cardHolder'],
        'expirationDate' => $_POST['expirationDate'],
        'cvv' => $_POST['securityCode'],
        'zipCode' => $_POST['zipCode'],
        // 'city' => $_POST['city'],
        'state' => $_POST['state'],
        'address' => $_POST['address'],
        'email' => isset($_SESSION['UserEmail']) ? $_SESSION['UserEmail'] : '',
        'phone' => $_POST['phone'],
        'Price' => $_POST['Price'],
        'Amount' => $_POST['Amount'],
        'Method' => $_POST['Method'],
        'Status' => $_POST['Status'],
        'dateTime' => $currentDateTime
    );

    $collection->insertOne($document);
    echo "Payment successfully processed.";
} catch (MongoDB\Driver\Exception\Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
