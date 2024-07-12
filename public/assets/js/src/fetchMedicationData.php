<?php
require '../../../../vendor/autoload.php';

$client = new MongoDB\Client("mongodb://localhost:27017");
$collection = $client->MEDIX->Medications;

$cursor = $collection->aggregate([ ['$sample' => ['size' => 16]] ]);
$medications = iterator_to_array($cursor);

foreach ($medications as &$medication) {
    $medication['_id'] = (string)$medication['_id'];
}

header('Content-Type: application/json');
echo json_encode($medications);
?>
