<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$photos = [];
$uploadDir = '../docs/assets/uploads/';
$tagDir = $uploadDir . 'tags/';

foreach (scandir($uploadDir) as $file) {
  if (!in_array($file, ['.', '..', 'tags'])) {
    $tagFile = pathinfo($file, PATHINFO_FILENAME) . '.txt';
    $tags = file_exists($tagDir . $tagFile) ? 
            explode(',', file_get_contents($tagDir . $tagFile)) : 
            ['untagged'];
    
    $photos[] = [
      'filename' => $file,
      'tags' => $tags
    ];
  }
}

echo json_encode($photos);
?>