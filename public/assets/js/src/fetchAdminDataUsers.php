<?php
// MongoDB connection
require '../../../../vendor/autoload.php';
$mongoClient = new MongoDB\Client("mongodb://localhost:27017");
$collection = $mongoClient->MEDIX->users;

// Fetch users
$users = $collection->find();

// Prepare data for JSON response
$data = [];
foreach ($users as $user) {
    $data[] = [
        'ID' => $user['_id']->__toString(), // Convert ObjectId to string
        'Name' => $user['UserFirstName'] . ' ' . $user['UserLastName'],
        'Email' => $user['UserEmail'],
        'Phone' => $user['UserPhoneNo'],
        'Address' => $user['UserAddress'] // Assuming 'UserAddress' exists in your MongoDB document
    ];
}

// Output JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
