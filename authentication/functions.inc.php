<?php
$param1=NULL;
$param2=NULL;
$param3=NULL;
$param4=NULL;
$param5=NULL;
$param6=NULL;

require_once 'dbh.inc.php';

function emptyInputSignup($name,$prof,$email,$handle,$pass,$pass2)
{
    $result=true ;
    if(empty($name)||empty($prof)||empty($email)||empty($handle)||empty($pass)||empty($pass2)){
        $result == true ;
    }
    else {
        $result = false ;
    }
    return $result ;
}


function invalidHandle($handle){
    $result=true;
    if(  !preg_match("/^[a-zA-Z0-9]*$/", $handle)   ){
        $result = true;
    }
    else {
        $result = false ;
    }
    return $result ; 
}

function invalidEmail($email){
    $result=true;
    if(!filter_var($email , FILTER_VALIDATE_EMAIL)){
        $result = true ;
    }
    else {
        $result = false ;
    }
    return $result ;
}

function passMatch($pass,$pass2){
    $result=true ;
    if($pass !== $pass2 ){
        $result = true ;
    }
    else {
        $result = false ;
    }
    return $result;
}

function handleExists($conn,$handle){
    $result=false;
    $sql = "SELECT  * FROM user WHERE user_handle = '$handle' ;";
    $chk = mysqli_query($conn, $sql);
    if( mysqli_num_rows($chk)  > 0 ){
        $result = true ;
    }
    else{
        $result= false ;
    }
    return $result ;
}
function emptyInputLogin($handle,$pass){
    $result=true ;
    if(empty($handle)||empty($pass)){
        $result == true ;
    }
    else {
        $result = false ;
    }
    return $result ;
}
function passDidntMatch($conn,$handle,$pass ){
    $result=false;
    $sql = "SELECT  user_password FROM user WHERE user_handle = '$handle' ;";
    $query = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($query,MYSQLI_ASSOC);
    $pwd = $row['user_password'];
   
    if (password_verify($pass,$pwd ) == false ){
        $result = true ;
    }
    return $result ;
}
function getEmail($conn,$handle ){
    $sql = "SELECT  user_email FROM user WHERE user_handle = '$handle' ;";
    $query = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($query,MYSQLI_ASSOC);
    $email = $row['user_email'];
    return $email  ;
}
function getProfession($conn,$handle){
    $sql = "SELECT  user_profession FROM user WHERE user_handle = '$handle' ;";
    $query = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($query,MYSQLI_ASSOC);
    $profession = $row['user_profession'];
    return $profession  ;
}
function getFullname($conn,$handle){
    $sql = "SELECT  user_fullname FROM user WHERE user_handle = '$handle' ;";
    $query = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($query,MYSQLI_ASSOC);
    $fullname = $row['user_fullname'];
    return $fullname  ;
}
function getSavedProblemCount($conn , $user_id )
{
    $sql = "SELECT  COUNT(storage_id) as total FROM problem WHERE user_id = '$user_id' ;";
    $query = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($query,MYSQLI_ASSOC);

    return $row['total']; 
}
function update($conn,$name,$prof,$handle,$email){
    $sql = "UPDATE user SET user_fullname = '{$name}' , user_email = '{$email}' , user_profession= '{$prof}'  WHERE user_handle = '{$handle}'";
    $stmt = mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
}
function getParameters($conn , $storageId )
{
    $sql = "SELECT  * FROM problem WHERE storage_id = '{$storageId}`' ;";
    $query = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($query,MYSQLI_ASSOC);
    $param1=$row['param1'];
    $param2=$row['param2'];
    $param3=$row['param3'];
    $param4=$row['param4'];
    $param5=$row['param5'];
    $param6=$row['param6'];
    header("location: {$row['problem_link']}");
}
function createUser($conn, $name,$prof,$handle,$email,$pass){

    $sql = "INSERT INTO user (user_fullname, user_handle, user_email, user_profession, user_password ) VALUES (?,?,?,?,?)";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location:signup.php");
        echo "not ok";
        exit();
    }
    $hashedPwd = password_hash($pass , PASSWORD_DEFAULT);
    mysqli_stmt_bind_param($stmt , "sssss", $name,$handle,$email,$prof,$hashedPwd );
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    //header("location:..\login.php");
    return;
}

