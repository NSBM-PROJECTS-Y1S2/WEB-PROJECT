<?php
session_start();

$response = array(
    'UserEmail' => isset($_SESSION['UserEmail']) ? $_SESSION['UserEmail'] : '',
    'UserID' => isset($_SESSION['_id']) ? $_SESSION['_id'] : '',
    'PharmacyEmail' => isset($_SESSION['PharmacyEmail']) ? $_SESSION['PharmacyEmail'] : '',
    'PharmacyID' => isset($_SESSION['_id']) ? $_SESSION['_id'] : ''
);
echo json_encode($response);
?>
