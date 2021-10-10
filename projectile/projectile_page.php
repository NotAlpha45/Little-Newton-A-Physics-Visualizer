<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gravity and velocity 1</title>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.js"></script> -->
    <script src="node_modules/p5.min.js"></script>
    <script src="node_modules/ccapture_src/CCapture.js"></script>
    <script src="node_modules/ccapture_src/webm-writer-0.2.0.js"></script>
    <script src="node_modules/ccapture_src/download.js"></script>
    <link rel="stylesheet" href="projectile_page_style.css" />
  </head>
  <body>
  <header id="header" class="fixed-top">
    <div class="container-fluid d-flex justify-content-between align-items-center">

      <h1 class="logo me-auto me-lg-0"><a href="problems.php"><i class="bx bx-arrow-back"></i></a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar order-last order-lg-0">
       
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->


    </div>
    

  </header><!-- End Header -->
    <div class="mathcontainer" id="math">
      <h1 class="heading1">Starting With The Basics</h1>
      <h2 class="heading2">
        A simple projectile with known
        <customTag class="given"> initial height </customTag>,
        <customTag class="given"> initial velocity </customTag> and
        <customTag class="given"> initial angle </customTag>
      </h2>
      <div class="description" id="description">
        <p>
          An object is thrown from the ground at an
          <customTag class="angle"> angle </customTag> of
          <customTag class="angle"> 30° </customTag> and
          <customTag class="velocity">velocity</customTag> of
          <customTag class="velocity"
            >20 <customTag class="unit">m/s</customTag></customTag
          >
          .
          <br />
          What is the <customTag class="maxHeight"> maximum height</customTag>,
          <customTag class="maxRange">horizontal range </customTag>
          and <customTag class="flight_time">flight time</customTag> of the
          object?
        </p>
      </div>
    </div>
    <div class="container1" id="projectile_simulation"></div>
    <script src="mover.js"></script>
    <script src="parameters.js"></script>
    <script src="utility.js"></script>
    <script src="Type1/gravity and velocity.js"></script>
  </body>
</html>
