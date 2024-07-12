<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

require '../../../../vendor/autoload.php';

$email = $_POST['pharmaEmail'];
$password = $_POST['pharmaPassword'];

$mongoUri = "mongodb://localhost:27017";
$dbName = "MEDIX";
$collectionName = "Pharmacy";

try {
    $mongoClient = new MongoDB\Client($mongoUri);
    $db = $mongoClient->$dbName;
    $collection = $db->$collectionName;

    $pharmacy = $collection->findOne(['PharmacyEmail' => $email]);

    if ($pharmacy) {
        if ($password == $pharmacy['PharmacyPassword']) {
            $_SESSION['PharmacyEmail'] = $pharmacy['PharmacyEmail'];
            $_SESSION['_id'] = (string)$pharmacy['_id'];
            $_SESSION['PharmacyName'] = $pharmacy['PharmacyName'];

            echo json_encode(['success' => true, 'message' => 'Login successful']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid password']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
} catch (Exception $ex) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $ex->getMessage()]);
}
?>