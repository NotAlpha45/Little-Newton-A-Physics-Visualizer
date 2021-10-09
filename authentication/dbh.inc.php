<?php

$serverName = "localhost";
$dBUsername = "root";
$dBPassword = "";
$dBName = "little_newton";

$conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName ); 

if(!$conn){
     echo "unsuccessful connection ";
     die("Connection Failed : " . mysqli_connect_error());
}
else{
    // echo "dbhSuccessfullyConnectes";
}
