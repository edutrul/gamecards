<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="AME CARDS | Diviertete programando">
    <meta name="author" content="">
    <!--<meta property="og:image" content="http://s33.">-->

    <title>GAME CARDS | Diviertete programando</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/heroic-features.css" rel="stylesheet">
    <link href="css/custom-styles.css" rel="stylesheet">

    <!-- CUSTOM JS -->
    <script src="js/jquery.js"></script>
    <script src="js/isotope.pkgd.min.js"></script>
    <script src="js/custom.js"></script>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/">Niño: Jorgito</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav game-cards-filters">
                    <li>
                        <a href="/" data-filter=".element-item">Todos</a>
                    </li>
                    <li>
                        <a href="/" data-filter=".facil">Huevo</a>
                    </li>
                    <li>
                        <a href="/" data-filter=".intermedio">Polluelo</a>
                    </li>
                    <li>
                        <a href="/" data-filter=".dificil">Pichon</a>
                    </li>
                    <li>
                        <a href="resultado.html" class="sorprendeme">EL GAVILAN!</a>
                    </li>
                    <li>
                        <a href="crear-laberinto.html" class="link">CREAR LABERINTO</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Page Content -->
    <div class="container">
<?php
require_once 'connection.php';

$sql = "SELECT * FROM juego";
$result = $conn->query($sql);
$juegos = array();

if ($result->num_rows > 0) {
  // output data of each row
    while ($row = $result->fetch_object()) {
      $juegos[] = $row;
    }
}
$conn->close();
?>
      
        <!-- Page Features -->
          <div class="row grid">
            <?php foreach ($juegos as $juego):?>
              <div class="element-item col-md-4 <?php print $juego->dificultad ?>">
                  <figure class="snip1174 red col-md-4">
                    <img src="images/juegos/<?php print $juego->imagen; ?>" alt="angrybird juego" />
                    <figcaption>
                      <h2 class="nombre"><?php print $juego->titulo; ?></h2>
                      <br>
                      <span class="descripcion"><?php print $juego->descripcion; ?></span><br>
                      <a href="/dashboard.html?juego=<?php print $juego->juego_id; ?>" target="_blank">Ver repeticion</a>
                    </figcaption>
                  </figure>
              </div>
            <?php endforeach; ?>
          </div>
        <!-- /.row -->

        <hr>

        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright game-cards, realizado en ANGELHACK 2016</p>
                </div>
            </div>
        </footer>

    </div>
    <!-- /.container -->

    <!-- jQuery -->

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

</body>

</html>
