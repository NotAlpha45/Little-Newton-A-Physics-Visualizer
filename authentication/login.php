<?php
    include_once 'authentication_header.php'
?>

	<head>
		<meta charset="utf-8">
		<title>Login</title>
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css">
        <link href="style.css" rel="stylesheet" type="text/css">
	</head>
	<body>
		<div class="login">
			<h1>Login</h1>
			<form action="login.php" method="post">
				<label for="username">
					<i class="fas fa-user"></i>
				</label>
				<input type="text" name="username" placeholder="Handle" id="username" required>
				<label for="password">
					<i class="fas fa-lock"></i>
				</label>
				<input type="password" name="password" placeholder="Password" id="password" required>
				<input type="submit" value="Login">
			</form>
			<?php 
				require_once 'Includes/dbh.inc.php';
				require_once 'Includes/functions.inc.php';
 
				
 
				if(  $_SERVER['REQUEST_METHOD'] == 'POST'  ){
				$pass = $_POST["password"];
				$handle = $_POST["username"] ;
 
				if( emptyInputLogin($handle,$pass)== true ){
					$trk="Fillup all the fields" ;
					echo "<script type='text/javascript'>alert('$trk');</script>";
				}
				else if(handleExists($conn,$handle)==false){
					$trk="Handle doesnt exist " ;
					echo "<script type='text/javascript'>alert('$trk');</script>"; 
				}
				else if(passDidntMatch($conn,$handle,$pass )== true ){
					$trk="Incorrect password or handle " ;
					echo "<script type='text/javascript'>alert('$trk');</script>"; 
				}
				else {
					$sql = "SELECT  * FROM usesrs WHERE usersHanndle = '$handle' ;";
					$query = mysqli_query($conn, $sql);
					$row = mysqli_fetch_array($query,MYSQLI_ASSOC);
					session_start();
					$_SESSION["usersid"]= $row["usersId"];
					$_SESSION["usershanndle"]= $row["usersHanndle"];
					header("location:index.php");
				}
				}
 
			 ?>
		</div>
	</body>

<?php
    include_once 'footer.php'
?> 