<?php
// MongoDB connection parameters

require '../../vendor/autoload.php';

$mongoUri = "mongodb://localhost:27017";
$dbName = "testthis";

try {
    $mongoClient = new MongoDB\Client($mongoUri);
    $db = $mongoClient->$dbName;
    $collectionName = "test_table";
    $collection = $db->$collectionName;
    $document = array(
        'title' => 'Sample Document',
        'description' => 'This is a sample document created with PHP and MongoDB.'
    );
    $insertResult = $collection->insertOne($document);
    echo "Database 'testthis' and collection 'test_table' created successfully.\n";
    echo "Inserted document ID: " . $insertResult->getInsertedId() . "\n";
} catch (MongoDB\Driver\Exception\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
