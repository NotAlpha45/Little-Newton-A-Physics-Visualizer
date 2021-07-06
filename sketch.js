let particles = [];
let springs = [];
let spacing = 70;
let k = 0.01;
let kk;

let gravity;

function setup() {
  createCanvas(700, 1000);
  for (let i = 0; i < 4; i++) {
  kk  = createInput();
  kk.position(560, 360);
  kk.size(50);
  
  button = createButton('Go');
  button.position(550, 390);
 
    button.mousePressed(function() {
    k = float(kk.value());
  });
 
    
    
    particles[i] = new Particle(width / 2, i * spacing);
    if (i !== 0) {
      let a = particles[i];
      let b = particles[i - 1];
      let spring = new Spring(k, spacing, a, b );
      springs.push(spring);
    }
  }

  particles[0].locked = true;
  

  gravity = createVector(0, 0.1);
}

function draw() {
  background(112, 50, 126);
  textSize(21);
  //textWidth(0)
  text("Spring Constant k", 380,250);

  for (let s of springs) {
    s.update();
    s.show();
  }

  noFill();
  stroke(252, 238, 33);
  strokeWeight(8);
  beginShape();
  let head = particles[0];
  curveVertex(head.position.x, head.position.y);
  for (let p of particles) {
    p.applyForce(gravity);
    p.update();
     noFill();
    curveVertex(p.position.x, p.position.y);
    p.show();
  }
  let tail = particles[particles.length - 1];
   noFill();
  curveVertex(tail.position.x, tail.position.y);
  endShape();

  fill(45, 197, 244);
  tail.position.x=width/2;
  ellipse(tail.position.x, tail.position.y, 12);
  textSize(20);
  textStyle(NORMAL);
  strokeWeight(0);
    text("Combined Spring Constant:",380, 170 );
    textSize(22);
    text(k/3, 380,200)

  if (mouseIsPressed) {
    tail.position.y= mouseY;
    tail.velocity.set(0, 0);

    text("Displacement:",380, 100 );
    text(mouseY-140,380,130);
  }
}
