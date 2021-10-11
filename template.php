<?php
include_once 'problem_header.php';
?>


<main id="main">

    <!-- ======= About Section ======= -->
    <section id="about" class="about">
        <div class="container" data-aos="fade-up">

            <div class="section-title">
                <h2>Range Is Key</h2>
            </div>

            <div class="mathcontainer" id="math">

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
                        <customTag class="maxRange">70 <customTag class="unit">m</customTag>
                        </customTag>
                        .<br />
                        What is the
                        <customTag class="velocity">initial velocity</customTag>,
                        <customTag class="maxHeight">maximum height</customTag> and
                        <customTag class="flight_time">flight time</customTag> of the object?
                    </p>
                </div>
            </div>

            <div class="row">
                <div class="container1" id="projectile_simulation"></div>

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
    <script src="projectile/mover.js"></script>
    <script src="projectile/parameters.js"></script>
    <script src="projectile/utility.js"></script>
    <script src="projectile/Type2/gravity and velocity 2.js"></script>

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

        $sql = "INSERT INTO problem (user_id, problem_name, problem_link, param1, param2, param3, param4) VALUES ($u_id,'projectile2','$validUrl', $param1val, $param2val, $param3val, $param4val)";

        if (mysqli_query($conn, $sql)) {
            echo "Records inserted successfully.";
        } else {
            echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
        }
    }

    ?>