<?php
    $pageName = "SignUp";
    include_once 'header.php';
?>


  <main id="main">

    <!-- ======= Contact Section ======= -->
    <section id="contact" class="contact">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Sign Up</h2>
        </div>

    

        

        <div>

            <form action="signup.php" method="post">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="form-group col-5">
                  <input type="text" name="username" class="form-control" id="name" placeholder="Name" required>
                  </div>
                </div>
                <div class="row h-100 justify-content-center align-items-center">
                <div class="form-group col-5">
                  <input type="text" name="userhandle" class="form-control" id="handle" placeholder="Handle" required>
                  </div>
                </div>
                  <div class="row h-100 justify-content-center align-items-center">
                <div class="form-group col-5">
                  <input type="email" class="form-control" name="email" id="email" placeholder="Email" required>
                </div>
              </div>
              <div class="row h-100 justify-content-center align-items-center">
              <div class="form-group col-5">
                <input type="text" class="form-control" name="userprof" id="userprof" placeholder="Profession" required>
              </div>
              </div>
              <div class="row h-100 justify-content-center align-items-center">
              <div class="form-group col-5">
              <input type="password" class="form-control" name="password" id="password" placeholder="Password" required>
              </div>
              </div>
              <div class="row h-100 justify-content-center align-items-center">
              <div class="form-group col-5">
              <input type="password" class="form-control" name="password2" id="password" placeholder="Retype Password" required>
              </div>
              </div>
              <div class="my-3">
                
              </div>
              <div class="text-center"><button type="submit" class="btn-about">Sign Up</button></div>
            </form>

          </div>
          </div>
          <?php 
				require_once 'authentication/dbh.inc.php';
				require_once 'authentication/functions.inc.php';
 
				
 
				if(  $_SERVER['REQUEST_METHOD'] == 'POST'  ){
				$pass = $_POST["password"];
    			$pass2 =$_POST["password2"] ;
				$name = $_POST["username"] ;
    			$prof = $_POST["userprof"] ;
    			$email= $_POST["email"];
    			$handle= $_POST["userhandle"] ;
 
				if( emptyInputSignup($name,$prof,$email,$handle,$pass,$pass2)== true ){
					$trk="Empty fields exist" ;
					echo "<script type='text/javascript'>alert('$trk');</script>";
				}
				else if(passMatch($pass , $pass2)!==false){ 
					$trk="Passwords didnt match." ;
					echo "<script type='text/javascript'>alert('$trk');</script>"; 
				}
				else if (invalidEmail($email)== true ){
					$trk="Invalid Email Id " ;
					echo "<script type='text/javascript'>alert('$trk');</script>"; 
				}
				else if (invalidHandle($handle)== true ){
					$trk="Handle not valid" ;
					echo "<script type='text/javascript'>alert('$trk');</script>"; 
				}
				else if(handleExists($conn,$handle)==true){
					$trk="Handle already exists " ;
					echo "<script type='text/javascript'>alert('$trk');</script>"; 
				}
				else {
          echo $name;
					createUser($conn, $name,$prof,$handle,$email,$pass); 
					header("location:login.php");
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