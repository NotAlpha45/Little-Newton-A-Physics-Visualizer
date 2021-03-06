<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gravity and velocity 2</title>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.js"></script> -->
    <script src="node_modules/p5.min.js"></script>
    <script src="node_modules/ccapture_src/CCapture.js"></script>
    <script src="node_modules/ccapture_src/webm-writer-0.2.0.js"></script>
    <script src="node_modules/ccapture_src/download.js"></script>
    <link rel="stylesheet" href="projectile_page_style.css" />
  </head>
  <body>
    <div class="mathcontainer" id="math">
      <h1 class="heading1">Range Is The Key</h1>
      <h2 class="heading2">
        A simple projectile with unknown
        <customTag class="notGiven">velocity</customTag> And known
        <customTag class="given"> horizontal range</customTag>
      </h2>
      <div class="description" id="description">
        <p>
          An object is thrown from the ground at an
          <customTag class="angle">angle</customTag> of
          <customTag class="angle">30°</customTag> in order to reach a
          <customTag class="maxRange">horizontal range</customTag> of
          <customTag class="maxRange"
            >70 <customTag class="unit">m</customTag></customTag
          >
          .<br />
          What is the
          <customTag class="velocity">initial velocity</customTag>,
          <customTag class="maxHeight">maximum height</customTag> and
          <customTag class="flight_time">flight time</customTag> of the object?
        </p>
      </div>
    </div>
    <div class="container1" id="projectile_simulation"></div>
    <script src="mover.js"></script>
    <script src="parameters.js"></script>
    <script src="utility.js"></script>
    <script src="Type2/gravity and velocity 2.js"></script>
  </body>
</html>
