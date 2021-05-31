let body;

// Sets up the screen.
function setup() {
  canvas = createCanvas(1360, 600);
  canvas.position(0);
  frameRate(60);
  body = new Mover(100, 700 - 40, 40);
  body.setHeight(20);
  body.setVelocity(40, Math.PI/3);

  // buffer is a secondary surface that we will draw our trail on.
  buffer = createGraphics(width, height);
  buffer.background(94, 219, 211);
}

// Draws all the objects in a loop.
function draw() {
  background(94, 219, 211);
  // width and height are the width and height of the screen. Builtin attributes.
  // image() will blit the buffer screen on the main screen like a rectangle.
  image(buffer, 0, 0, width, height);

  body.display();
  body.update();
  body.checkBound();
  body.draw_trail(buffer);
}
