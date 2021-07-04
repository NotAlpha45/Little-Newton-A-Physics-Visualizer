let body;
let buffer;
let body_height, height_input_field, height_text;
let angle, angle_input_field, angle_text;
let initial_velocity, initial_velocity_input_field, initial_velocity_text;
let gravity, gravity_input_field, gravity_text;
let button;

function angle_input_maker() {
  angle_text = createElement("h3", "Angle (θ): ");
  angle_text.position(width - 250, 100);
  angle_text.parent("projectile_simulation");
  angle_input_field = createInput("30");
  angle_input_field.position(width - 150, 120);
  angle_input_field.size(50);
  angle_input_field.parent("projectile_simulation");
}

function velocity_input_maker() {
  initial_velocity_text = createElement("h3", "Initial Velocity (v₀): ");
  initial_velocity_text.position(width - 327, 160);
  initial_velocity_text.parent("projectile_simulation");
  initial_velocity_input_field = createInput("20");
  initial_velocity_input_field.position(width - 150, 180);
  initial_velocity_input_field.size(50);
  initial_velocity_input_field.parent("projectile_simulation");
}

function height_input_maker() {
  body_height_text = createElement("h3", "Height (h): ");
  body_height_text.position(width - 257, 130);
  body_height_text.parent("projectile_simulation");
  height_input_field = createInput("20");
  height_input_field.position(width - 150, 150);
  height_input_field.size(50);
  height_input_field.parent("projectile_simulation");
}

function gravity_input_maker() {
  gravity_text = createElement("h3", "Gravity (g):");
  gravity_text.position(width - 265, 190);
  gravity_text.parent("projectile_simulation");
  gravity_input_field = createInput("9.8");
  gravity_input_field.position(width - 150, 210);
  gravity_input_field.size(50);
  gravity_input_field.parent("projectile_simulation");
}

function button_maker(parent, posx, posy, label, func) {
  button = createButton(label);
  button.position(posx, posy);
  button.mousePressed(func);
  button.parent(parent);
}
// Sets up the screen.
function setup() {
  canvas = createCanvas(1360, 600);
  canvas.position(0);
  canvas.parent("projectile_simulation");
  frameRate(60);
  // buffer is a secondary surface that we will draw our trail on.
  buffer = createGraphics(width, height);
  buffer.background(94, 219, 211);

  body = new Mover(100, 700 - 31, 20);

  angle_input_maker();

  height_input_maker();

  velocity_input_maker();

  gravity_input_maker();

  button_maker("projectile_simulation", width - 150, 240, "Run", value_input);
  button_maker("projectile_simulation", width - 150, 270, "Reset", setup);
}

function value_input() {
  initial_velocity = float(initial_velocity_input_field.value());

  gravity = float(gravity_input_field.value()) / 9.8;

  body_height = float(height_input_field.value()) * 10;

  if (float(angle_input_field.value) == 90) {
    angle = Math.PI / 2;
  } else {
    angle = (float(angle_input_field.value()) * Math.PI) / 180;
  }

  body.setHeight(body_height);

  body.setVelocity(initial_velocity, angle);

  body.setGravity(gravity);
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
