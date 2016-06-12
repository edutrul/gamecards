<?php
if (isset($_POST['data'])) {
  require_once 'connection.php';
  $data = $_POST['data'];
  $sql = "INSERT INTO opcion (data) VALUES ('" . $data . "')";
  if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
  $conn->close();
}

