<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple Pendulum</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="node_modules/p5.min.js"></script>
    <script src="node_modules/plotly.js-dist-min/plotly.min.js"></script>
    <link rel="stylesheet" href="pendulum_page_style.css" />
</head>

<body>
    <div class="mathcontainer" id="math">
        <h1 class="heading1">Strting With Time</h1>
        <h2 class="heading2">
            A simple pendulum with known
            <customTag class="given">effective length</customTag> and
            <customTag class="given">initial angle</customTag>

        </h2>

        <div class="description" id="description">
            <p>A simple pendulum has an
                <customTag class="effectiveLength">effective length</customTag> of
                <customTag class="effectiveLength">2 <customTag class="unit">m</customTag>
                </customTag>
                and was set in motion at an
                <customTag class="angle">angle</customTag> of <customTag class="angle">30°</customTag>.
            </p>
            <p>
                How much is the
                <customTag class="period">period</customTag>
                of the pendulum? How would the graph of it's
                <customTag class="motionpath">motionpath</customTag>
                look like?
            </p>
        </div>
    </div>
    <div class="container1" id="pendulum_simulation">
        <div class="section1" id="pendulum_display"></div>
    </div>
    </div>
    <div class="container2" id="chart"></div>

    <script src="bob.js"></script>
    <script src="parameters.js"></script>
    <script src="utility.js"></script>
    <script src="pendulum_main.js"></script>
    <!-- <script src="chart_fiddling.js"></script> -->
</body>

</html>

<?php

require_once '../authentication/dbh.inc.php';
require_once '../authentication/functions.inc.php';

$param0val = isset($_POST['param0']) ? $_POST['param0'] : '';
$param1val = isset($_POST['param1']) ? $_POST['param1'] : '';
$param2val = isset($_POST['param2']) ? $_POST['param2'] : '';
$param3val = isset($_POST['param3']) ? $_POST['param3'] : '';


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

    $sql = "INSERT INTO problem (user_id, problem_name, param1, param2, param3) VALUES ($u_id,'pendulum_page.php', $param1val, $param2val, $param3val)";

    if (mysqli_query($conn, $sql)) {
        echo "Records inserted successfully.";
    } else {
        echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
    }
}

?>