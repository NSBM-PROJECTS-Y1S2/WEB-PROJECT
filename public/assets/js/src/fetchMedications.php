<?php
// Database connection
require '../../../../vendor/autoload.php';
$mongo = new MongoDB\Client("mongodb://localhost:27017");
$db = $mongo->MEDIX;
$collection = $db->Medications;

$medications = $collection->find()->toArray();

echo json_encode($medications);
?>
