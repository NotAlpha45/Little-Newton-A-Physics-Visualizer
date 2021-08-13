  
  M = createInput();
  M.position(550, 190);
  M.size(50);
  
  k = createInput();
  k.position(550, 220);
  k.size(50);
  
  
 
  button = createButton('Go');
  button.position(550, 250);
  
  
  button.mousePressed(function() {
    k = float(k.value());
    M = float(M.value());
    start = true;  
  });
  
  createCanvas(610, 1000);
  background(50);
}


function draw() {    
  frameRate(10)
  background(112, 50, 126);
  strokeWeight(3) 
  stroke(255,255,0)
  fill(45, 197, 244);
  
  
  line(100,40,100, y);
  strokeWeight(0)
  fill(255,255,0);
  image(img1, 0, 0, 250, 50);
  
  textSize(20);
