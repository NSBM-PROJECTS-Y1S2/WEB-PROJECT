<?php
// MongoDB connection
require '../../../../vendor/autoload.php';
$mongoClient = new MongoDB\Client("mongodb://localhost:27017");
$collection = $mongoClient->MEDIX->users;

// Get the user data from the request
$userId = $_POST['id'];
$updateData = [
    'UserFirstName' => $_POST['firstName'],
    'UserLastName' => $_POST['lastName'],
    'UserEmail' => $_POST['email'],
    'UserPhoneNo' => $_POST['phone'],
    'UserAddress' => $_POST['address']
];

// Update the user
$result = $collection->updateOne(
    ['_id' => new MongoDB\BSON\ObjectId($userId)],
    ['$set' => $updateData]
);

if ($result->getMatchedCount() === 1) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
}
?>
