<?php
// MongoDB connection
require '../../../../vendor/autoload.php';
$mongoClient = new MongoDB\Client("mongodb://localhost:27017");
$collection = $mongoClient->MEDIX->users;

// Get the user ID from the request
$userId = $_POST['id'];

// Delete the user
$result = $collection->deleteOne(['_id' => new MongoDB\BSON\ObjectId($userId)]);

if ($result->getDeletedCount() === 1) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
}
?>
