<?php
session_start();

$response = array(
    'UserEmail' => isset($_SESSION['UserEmail']) ? $_SESSION['UserEmail'] : '',
    'UserID' => isset($_SESSION['UserID']) ? $_SESSION['UserID'] : ''
);

echo json_encode($response);
?>
