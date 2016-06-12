<?php
if (isset($_GET['juego'])) {
  $juego_id = $_GET['juego'];
  require_once 'connection.php';

  $sql = "SELECT opcion.data, juego.tablero, juego.dificultad FROM opcion
LEFT JOIN juego
ON opcion.juego_id = juego.juego_id
WHERE opcion.juego_id = " . $juego_id . " ORDER BY id
DESC LIMIT 0, 1
";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    // output data of each row
    $data = $result->fetch_assoc();
    header('Content-Type: application/json');
    print json_encode(array(
      'data' => $data['data'],
      'tablero' => $data['tablero'],
      'dificultad' => $data['dificultad'],
    ));
    exit();
  }
  $conn->close();
}