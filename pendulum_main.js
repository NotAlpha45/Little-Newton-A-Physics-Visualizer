let bob;
function setup() {
  canvas = createCanvas(800, 600);
  canvas.position(0);
  frameRate(60);
  buffer = createGraphics(width, height);
  buffer.background(94, 219, 211);
  bob = new Bob(300, Math.PI/6, 30);
  bob.set_damping(0.9995);

}

function draw() {
  background(94, 219, 211);
  // width and height are the width and height of the screen. Builtin attributes.
  // image() will blit the buffer screen on the main screen like a rectangle.
  image(buffer, 0, 0, width, height);
  bob.display();
//   bob.draw_trail(buffer);
  bob.update();
}
