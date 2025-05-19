<?php
header('Access-Control-Allow-Origin: *');

// Simple password check (replace with proper auth in production)
if ($_POST['password'] !== 'popcorn123') {
  http_response_code(401);
  die('Unauthorized');
}

$uploadDir = '../docs/assets/uploads/';
$tagDir = $uploadDir . 'tags/';

// Create directories if they don't exist
if (!file_exists($tagDir)) {
  mkdir($tagDir, 0777, true);
}

// Process each uploaded file
foreach ($_FILES['photos']['tmp_name'] as $key => $tmpName) {
  $ext = pathinfo($_FILES['photos']['name'][$key], PATHINFO_EXTENSION);
  $filename = uniqid() . '.' . $ext;
  $destination = $uploadDir . $filename;
  
  if (move_uploaded_file($tmpName, $destination)) {
    // Save tags
    $tagFile = pathinfo($filename, PATHINFO_FILENAME) . '.txt';
    file_put_contents($tagDir . $tagFile, $_POST['tags']);
  }
}

echo 'Photos uploaded successfully!';
?>