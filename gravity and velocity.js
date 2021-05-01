let body;

function setup() {
  createCanvas(600, 600).position(100);
  frameRate(60);
  body = new Mover(300, 100, 40);
}
function draw() {
  background(94, 219, 211);
  body.update();
  body.checkBound();
  body.display();
}
