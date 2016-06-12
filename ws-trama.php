<?php
if (isset($_POST['data']) && isset($_POST['juego'])) {
  require_once 'connection.php';
  $data = $_POST['data'];
  $juego_id = $_POST['juego'];
  $sql = "INSERT INTO opcion (data, juego_id) VALUES ('" . $data . "', " . $juego_id . ")";
  if ($conn->query($sql) === TRUE) {
    print "New record created successfully";
  } else {
    print "Error: " . $sql . "<br>" . $conn->error;
  }
  $conn->close();
}

