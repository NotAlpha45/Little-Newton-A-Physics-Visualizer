<?php
    $pageName = "Dashboard";
    include_once 'header.php';
    require_once 'authentication/dbh.inc.php';
		require_once 'authentication/functions.inc.php';
?>
  <main id="main">

    <!-- ======= About Section ======= -->
    <section id="about" class="about">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Profile</h2>
        </div>

        <div class="row">
          <div class="col-lg-4">
            <img src="assets/img/about.png" class="img-fluid" alt="" width = "320px" height = "320px">
          </div>
          <div class="col-lg-8 pt-4 pt-lg-0 content">
            <h3><?php echo $_SESSION["user_handle"];?></h3>
            <div>
              <br>
            </div>
            
            <div class="row">
              <div class="col-lg-6">
                <ul>
                  <li><i class="bi bi-rounded-right"></i> <strong>Name:</strong> <?=getFullname($conn, $_SESSION["user_handle"]);?> </li>
                  <li><i class="bi bi-rounded-right"></i> <strong>Email:</strong> <?=getEmail($conn, $_SESSION["user_handle"]);?></li>
                  <li><i class="bi bi-rounded-right"></i> <strong>Profession:</strong> <?=getProfession($conn, $_SESSION["user_handle"]);?></li>
                  <li><i class="bi bi-rounded-right"></i> <strong>Saved Problems:</strong> <?=getSavedProblemCount($conn, $_SESSION["user_id"]);?></li>
                </ul>
                <a href="edit_profile.php" class="btn-about">Edit Profile</a>
              </div>
              
            </div>
            
          </div>
        </div>

      </div>
    </section><!-- End About Section -->

    <!-- ======= Saved Problems Section ======= -->
    <section id="resume" class="resume">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Saved Problems</h2>
        </div>

        <div class="row">
          <div class="col-lg-6">
          <h3 class="resume-title">Problem List</h3>
            <div class="resume-item">
              
              <p>
              <ul>
                <?php
                    $i=0; 
                    $sql = "SELECT  * FROM problem WHERE user_id = '{$_SESSION["user_id"]}' ;";
                    $result = mysqli_query($conn, $sql);
                
                while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                  echo "<li><a href=\"{$row['problem_link']}\"><h5>{$row['problem_name']}</h5></a><p><b>Parameters: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{$row['param1']}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{$row['param2']}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{$row['param3']}
                  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{$row['param4']}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{$row['param5']}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{$row['param6']}</b></p></li>";
                    $i=$i+1; 
                }
                
                ?>
              </ul>
              </p>
            </div>

            
          </div>
          
        </div>

      </div>
    </section><!-- End Resume Section -->

    
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