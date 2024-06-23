<?php
// MongoDB connection parameters
$mongoUri = "mongodb://localhost:27017";
$dbName = "test";

// Connect to MongoDB
$mongoClient = new MongoDB\Client($mongoUri);

// Select database
$db = $mongoClient->$dbName;

// Test connection by listing the collections in the database
$collections = $db->listCollections();

// Output the list of collections
foreach ($collections as $collection) {
    echo $collection->getName() . "<br>";
}
?>
