<?php
    $pageName = "Login";
    include_once 'header.php';
?>
  <main id="main">

    <!-- ======= Contact Section ======= -->
    <section id="contact" class="contact">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Login</h2>
        </div>

    

        

        <div>

            <form action="login.php" method="post" >
            
                <div class="row h-100 justify-content-center align-items-center">
                <div class="form-group col-5">
                  <input type="text" name="userhandle" class="form-control" id="handle" placeholder="Handle" required>
                  </div>
                </div>
                  
              <div class="row h-100 justify-content-center align-items-center">
              <div class="form-group col-5">
              <input type="password" class="form-control" name="password" id="password" placeholder="Password" required>
              </div>
              </div>
              
              <div class="my-3">
                
              </div>
              <div class="text-center"><button type="submit">Login</button></div>
            </form>
            </div>


      

      </div>
            <?php 
				require_once 'authentication/dbh.inc.php';
				require_once 'authentication/functions.inc.php';
 
				
 
				if(  $_SERVER['REQUEST_METHOD'] == 'POST'  ){

				$pass = $_POST["password"];
				$handle = $_POST["userhandle"] ;
 
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
					$sql = "SELECT  * FROM user WHERE user_handle = '$handle' ;";
         
					$query = mysqli_query($conn, $sql);
					$row = mysqli_fetch_array($query,MYSQLI_ASSOC);
					session_start();
					$_SESSION["user_handle"]= $row["user_handle"];
          $userHandle = $_SESSION["user_handle"];
          $_SESSION["user_profession"]=$row["user_profession"];
          $_SESSION["user_email"]= $row["user_email"];
          $_SESSION["user_fullname"]=$row["user_fullname"];
					header("location:index.php");
				}
				}
 
			 ?>

          
    </section><!-- End Contact Section -->

  </main><!-- End #main -->

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