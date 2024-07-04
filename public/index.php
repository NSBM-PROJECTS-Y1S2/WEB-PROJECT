<?php
// Define the path to the public directory
$publicDir = __DIR__;


$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$file = $publicDir . $uri;
if ($uri !== '/' && file_exists($file)) {
    return false;
}

require $publicDir . '/LandingPage.html';

