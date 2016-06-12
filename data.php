<?php
require_once 'connection.php';

$sql = "SELECT data FROM opcion ORDER BY id DESC LIMIT 0, 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  $data = $result->fetch_assoc();
  header('Content-Type: application/json');
  print json_encode($data);
  exit();
}
$conn->close();