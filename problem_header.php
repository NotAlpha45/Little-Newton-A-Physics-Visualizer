<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();

  if(!isset($param1)){
      $param1 = 'θ';
      $param2 = 'x';
      $param3 = 'y';
      $param4 = 'z';
      $param5 = 'a';
      $param6 = 'b';
      $param7 = 'c';

  }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Little Newton</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="assets/img/favicon.png" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/aos/aos.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="assets/css/style.css" rel="stylesheet">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.3.1/p5.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  
  <script src="projectile/node_modules/ccapture_src/CCapture.js"></script>
  <script src="projectile/node_modules/ccapture_src/webm-writer-0.2.0.js"></script>
  <script src="projectile/node_modules/ccapture_src/download.js"></script>

  <script src="pendulum/node_modules/plotly.js-dist-min/plotly.min.js"></script>



  <meta charset="utf-8" />
</head>

<body>

  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top">
    <div class="container-fluid d-flex justify-content-between align-items-center">

      <h1 class="logo me-auto me-lg-0"><a href="problems.php"><i class="bx bx-arrow-back"></i></a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      
      <nav id="navbar" class="navbar order-last order-lg-0">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li><a class = "<?php if($pageName == "Home") { echo "active"; } ?>" href="index.php">Home</a></li>
          <li><a class = "<?php if($pageName == "Categories") { echo "active"; } ?>" href="categories.php">Categories</a></li>
          <li><a class = "<?php if($pageName == "Problems") { echo "active"; } ?>" href="problems.php">Problems</a></li>
          <li><a class = "<?php if($pageName == "About") { echo "active"; } ?>" href="about.php">About</a></li>
          <!--<li><a href="portfolio.php">Portfolio</a></li>
          <li><a href="contact.php">Contact</a></li>-->
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->

      <div class="navbar order-last order-lg-0">
      
        <ul>
        <?php 
        
        if(isset($_SESSION["user_handle"])){ 

          echo "<li><a href=\"dashboard.php\">Dashboard</a></li> <li><a href=\"authentication/logout.php\">Logout</a></li>";
          
        }

        else{
          echo "<li><a href=\"login.php\">Login</a></li>
          <li><a href=\"signup.php\">Sign Up</a></li>";
        }

        ?>
        
        </ul>
      </div>

    </div>


  </header><!-- End Header -->