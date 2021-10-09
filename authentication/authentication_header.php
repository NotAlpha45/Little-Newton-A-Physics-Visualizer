<?php
session_start();
?>


<!DOCTYPE html>
<html lang = "en" dir = "ltr">
<head>
    <meta charset = "utf-8">
    </style>
    <title>Little Newton</title>
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Lobster">
    <link href="styleHeader.css" rel="stylesheet" type="text/css">
    <style>
    h1 {
        font-family: 'Lobster', serif;
        font-size: 48px;
    }
    </style>
    <style>
     div {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "segoe ui", roboto, oxygen, ubuntu, cantarell, "fira sans", "droid sans", "helvetica neue", Arial, sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }
     </style>
    <style>
        body {
    background-color: #FFD580;
    }
    </style>
    <style>
    
    </style>


    
</head>
<body>
    <nav>
        <div class = "wrapper">
            <a href = "index.php">Welcome!</a>
            <button class="button" type="submit" form="form1" value="Submit"><a href = "index.php">Catagories</a></button>
            <?php
            if(isset($_SESSION["usershanndle"])){
                echo "Hey there! ";
                echo  "     <button class='button' type='submit' form='form1' value='Submit'><a href = 'logout.php'>Logout</a></button>";

            }
            else {
                echo  "     <button class='button' type='submit' form='form1' value='Submit'><a href = 'signup.php'>Signup</a></button>";
                echo  "     <button class='button' type='submit' form='form1' value='Submit'><a href = 'login.php'>Login</a></button>";
                //echo  "<a href = 'signup.php'>SignUp</a>    ";
                //echo "<a href = 'login.php'>Login</a> ";
            }
            ?>
            
        </div>
    </nav>
    <div class = "wrapper">
        