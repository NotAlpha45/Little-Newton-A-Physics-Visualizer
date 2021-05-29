let body;

function setup() {
  createCanvas(1360, 600).position(0);
  frameRate(20);
  body = new Mover(100, 700 - 40, 40);
  body.setHeight(600);
  body.setVelocity(30, 0);
}
function draw() {
  background(94, 219, 211);
  body.update();
  body.checkBound();
  body.display();
  console.log("Looping");
}
