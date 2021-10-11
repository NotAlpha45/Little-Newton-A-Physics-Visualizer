<?php
    $pageName = "SignUp";
    include_once 'header.php';
    $n = $_SESSION["user_fullname"] ;
    $h =  	$_SESSION["user_handle"] ; 
    $e = $_SESSION["user_email"];
    $p = $_SESSION["user_profession"]; 
?>


  <main id="main">

    <!-- ======= Contact Section ======= -->
    <section id="contact" class="contact">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Edit Profile</h2>
        </div>

    

        

        <div>

            <form action="edit_profile.php" method="post">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="form-group col-5">
                  <input type="text" name="username" class="form-control" id="name" placeholder = "Name: ( <?=$n?> )"  required>
                  </div>
                </div>
                  <div class="row h-100 justify-content-center align-items-center">
                <div class="form-group col-5">
                  <input type="email" class="form-control" name="email" id="email" placeholder="Email: ( <?=$e?> )" required>
                </div>
              </div>
              <div class="row h-100 justify-content-center align-items-center">
              <div class="form-group col-5">
                <input type="text" class="form-control" name="userprof" id="userprof" placeholder= "Profession: ( <?=$p?> )" required>
              </div>
              </div>  
              </div>
              <div><br></div>
              <div class="text-center"><button type="submit" class="button1">Save Changes</button></div>
            </form>

          </div>
          </div>
          <?php 
				require_once 'authentication/dbh.inc.php';
				require_once 'authentication/functions.inc.php';
 
				
 
				if(  $_SERVER['REQUEST_METHOD'] == 'POST'  ){
				
				$name = $_POST["username"] ;
    			$prof = $_POST["userprof"] ;
    			$email= $_POST["email"];
    		$handle = $_SESSION["user_handle"];
				if( !isset($name)){
					$name= $n ; 
				}
				if(!isset($prof)){ 
					$prof = $p ; 
				}
				if (!isset($email) ){
					$emai = $e ; 
				}
                update($conn, $name,$prof,$handle,$email); 
                header("location: dashboard.php");
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