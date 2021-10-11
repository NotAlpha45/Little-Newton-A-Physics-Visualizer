<?php
include_once 'problem_header.php';
?>


<main id="main">

  <!-- ======= About Section ======= -->
  <section id="about" class="about">
    <div class="container" data-aos="fade-up">

      <div class="section-title">
        <h2>Wave Superposition</h2>
        <p>Two waves are passing through a medium simultaneously. Given their <b>Amplitude</b>, <b>Period</b> and <b>Phase</b>, <br>describe their Superposition.</p>
      </div>

      <div class="row">
        <script src="wave/parameters.js"></script>
        <script src="wave/utility.js"></script>
        <script src="wave/sketchSuperposition.js"></script>

      </div>

    </div>
  </section><!-- End About Section -->



  <div id="preloader"></div>
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/aos/aos.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>
  <script src="assets/vendor/purecounter/purecounter.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
  <script src="assets/vendor/waypoints/noframework.waypoints.js"></script>

  <!-- Template Main JS File -->
  <script src="assets/js/main.js"></script>

  </body>

  </html>

  <?php

  require_once 'authentication/dbh.inc.php';
  require_once 'authentication/functions.inc.php';

  $param0val = isset($_POST['param0']) ? $_POST['param0'] : '';
  $param1val = isset($_POST['param1']) ? $_POST['param1'] : '';
  $param2val = isset($_POST['param2']) ? $_POST['param2'] : '';
  $param3val = isset($_POST['param3']) ? $_POST['param3'] : '';
  $param4val = isset($_POST['param4']) ? $_POST['param4'] : '';
  $param5val = isset($_POST['param5']) ? $_POST['param5'] : '';
  $param6val = isset($_POST['param6']) ? $_POST['param6'] : '';

  $url = "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
  $validUrl = str_replace("&", "&amp;", $url);

  if ($param0val) {

    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
    echo "Connected successfully";

    if (session_status() === PHP_SESSION_NONE) {
      echo "session has not start";
      session_start();
    }

    $u_id = $_SESSION["user_id"];

    echo "<script>alert($u_id)</script>";

    $sql = "INSERT INTO problem (user_id, problem_name, problem_link, param1, param2, param3, param4, param5, param6) VALUES ($u_id,'Wave Superposition','$validUrl', $param1val, $param2val, $param3val, $param4val, $param5val, $param6val)";

    if (mysqli_query($conn, $sql)) {
      echo "Records inserted successfully.";
    } else {
      echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
    }
  }

  ?>