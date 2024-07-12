<?php
session_start();
require '../../../../vendor/autoload.php';

try {
    $client = new MongoDB\Client("mongodb://localhost:27017");
    $collection = $client->MEDIX->users;

    if (isset($_POST['userID'])) {
        $userId = new MongoDB\BSON\ObjectId($_POST['userID']);
        $deleteResult = $collection->deleteOne(['_id' => $userId]);

        if ($deleteResult->getDeletedCount() === 1) {
            // Account successfully deleted, destroy session
            session_unset();
            session_destroy();
            echo json_encode(['success' => 'Account deleted successfully']);
        } else {
            echo json_encode(['error' => 'Account not found']);
        }
    } else {
        echo json_encode(['error' => 'Invalid user ID']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => 'An error occurred: ' . $e->getMessage()]);
}
?>
