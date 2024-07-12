<?php
require '../../../../vendor/autoload.php';

use MongoDB\Client;

$client = new Client("mongodb://localhost:27017");
$collection = $client->MEDIX->cartItems;
$medicationsCollection = $client->MEDIX->Medications;

$query = [
    'orderStatus' => 'buy-now'
];
$options = [
    'sort' => ['createdAt' => -1],
    'limit' => 1
];

$result = $collection->findOne($query, $options);

if ($result) {
    // Fetch additional details from Medications collection based on itemID
    $medicationId = new MongoDB\BSON\ObjectId($result->itemId);
    $medication = $medicationsCollection->findOne(['_id' => $medicationId]);

    if ($medication) {
        $result->itemName = $medication->medication;
        $result->itemID = (string)$medication->_id;
        $result->itemLink = $medication->imageLink;
        echo json_encode($result);
    } else {
        echo json_encode(['error' => 'Medication details not found']);
    }
} else {
    echo json_encode(['error' => 'No data found']);
}
?>
