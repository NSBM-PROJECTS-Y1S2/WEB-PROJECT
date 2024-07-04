<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo "Method Not Allowed";
    exit;
}

// $currentDateTime = date('Y-m-d H:i:s');

require '../../../../vendor/autoload.php';

$mongoUri = "mongodb://localhost:27017";
$dbName = "MEDIX";
$collectionName = "users";

try {
    $mongoClient = new MongoDB\Client($mongoUri);
    $db = $mongoClient->$dbName;
    $collection = $db->$collectionName;

    $document = array(
        'UserFirstName' => $_POST['FName'],
        'UserLastName' => $_POST['LName'],
        'UserPhoneNo' => $_POST['PhoneNo'],
        'UserEmail' => $_POST['Email'],
        'UserPassword' => $_POST['Password']
    );

    $collection->insertOne($document);
    echo "Payment successfully processed.";
} catch (MongoDB\Driver\Exception\Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>