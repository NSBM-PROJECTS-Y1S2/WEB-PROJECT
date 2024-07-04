<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

require '../../../../vendor/autoload.php';
session_start();

$email = $_POST['email'];
$password = $_POST['password'];

$mongoUri = "mongodb://localhost:27017";
$dbName = "MEDIX";
$collectionName = "users";

try {
    $mongoClient = new MongoDB\Client($mongoUri);
    $db = $mongoClient->$dbName;
    $collection = $db->$collectionName;

    $user = $collection->findOne(['UserEmail' => $email]);

    if ($user) {
        if ($password == $user['UserPassword']) {
            $_SESSION['UserEmail'] = $user['UserEmail'];
            $_SESSION['_id'] = (string) $user['_id'];

            echo json_encode(['success' => true, 'message' => 'Login successful']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid password']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>
