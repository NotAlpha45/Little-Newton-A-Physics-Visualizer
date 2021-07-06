let body;
let buffer;
let body_height, height_input_field, height_text;
let angle, angle_input_field, angle_text;
let initial_velocity, initial_velocity_input_field, initial_velocity_text;
let gravity, gravity_input_field, gravity_text;
let button;
let img;
let max_height, flight_time, horizontal_range;

function angle_input_maker() {
  angle_text = createElement("h3", "Angle (θ): ");
  angle_text.position(width - 250, 20);
  angle_text.parent("projectile_simulation");
  angle_input_field = createInput("30");
  angle_input_field.position(width - 150, 45);
  angle_input_field.size(50);
  angle_input_field.parent("projectile_simulation");
}

function velocity_input_maker() {
  initial_velocity_text = createElement("h3", "Initial Velocity (v₀): ");
  initial_velocity_text.position(width - 327, 60);
  initial_velocity_text.parent("projectile_simulation");
  initial_velocity_input_field = createInput("20");
  initial_velocity_input_field.position(width - 150, 85);
  initial_velocity_input_field.size(50);
  initial_velocity_input_field.parent("projectile_simulation");
}

function height_input_maker() {
  body_height_text = createElement("h3", "Height (h): ");
  body_height_text.position(width - 257, 100);
  body_height_text.parent("projectile_simulation");
  height_input_field = createInput("0");
  height_input_field.position(width - 150, 125);
  height_input_field.size(50);
  height_input_field.parent("projectile_simulation");
}

function gravity_input_maker() {
  gravity_text = createElement("h3", "Gravity (g):");
  gravity_text.position(width - 265, 140);
  gravity_text.parent("projectile_simulation");
  gravity_input_field = createInput("9.8");
  gravity_input_field.position(width - 150, 165);
  gravity_input_field.size(50);
  gravity_input_field.parent("projectile_simulation");
}

function button_maker(parent, posx, posy, label, func) {
  button = createButton(label);
  button.position(posx, posy);
  button.mousePressed(func);
  button.parent(parent);
}

function text_maker(txt, position, size) {
  textSize(size);
  fill(0);
  text(txt, position[0], position[1]);
}

// Resets the object by redefining it.
function reset_obj() {
  background(94, 219, 211);
  image(buffer, 0, 0, width, height);
  body = new Mover(100, 700 - 20, 20, img);
  body.set_color();
}

//Takes value input from the input fields.
function value_input() {
  initial_velocity = float(initial_velocity_input_field.value());

  gravity = float(gravity_input_field.value()) / 9.8;

  body_height = float(height_input_field.value()) * 10;

  angle = (float(angle_input_field.value()) * Math.PI) / 180;

  body.setHeight(body_height);

  body.setVelocity(initial_velocity, angle);

  body.setGravity(gravity);
}

function value_calculator() {
  max_height = Math.pow(initial_velocity * Math.sin(angle), 2) / (2 * gravity);
  max_height = max_height.toFixed(3);
  flight_time = (2 * initial_velocity * Math.sin(angle)) / gravity;
  flight_time = flight_time.toFixed(3);
  horizontal_range =
    (Math.pow(initial_velocity, 2) * Math.sin(2 * angle)) / gravity;
  horizontal_range = horizontal_range.toFixed(3);
}

function preload() {
  img = loadImage("assets/apple.png");
}

// Sets up the screen.
function setup() {
  background_color = createVector(94, 219, 211);
  canvas = createCanvas(1360, 600);
  canvas.position(0);
  canvas.parent("projectile_simulation");
  frameRate(60);
  // buffer is a secondary surface that we will draw our trail on.
  buffer = createGraphics(width, height);
  buffer.background(background_color.x, background_color.y, background_color.z);

  body = new Mover(100, 700 - 20, 20, img);

  angle_input_maker();

  height_input_maker();

  velocity_input_maker();

  gravity_input_maker();

  button_maker("projectile_simulation", width - 150, 205, "Run", value_input);
  button_maker(
    "projectile_simulation",
    width - 150,
    245,
    "Reset Object",
    reset_obj
  );
  button_maker(
    "projectile_simulation",
    width - 150,
    285,
    "Reset Display",
    setup
  );
}

// Draws all the objects in a loop.
function draw() {
  background(background_color.x, background_color.y, background_color.z);
  // width and height are the width and height of the screen. Builtin attributes.
  // image() will blit the buffer screen on the main screen like a rectangle.
  image(buffer, 0, 0, width, height);

  value_calculator();
  text_maker("Max height (H): " + max_height.toString(), [10, 30], 20);
  text_maker(
    "Horizontal range (R): " + horizontal_range.toString(),
    [10, 60],
    20
  );
  text_maker("Flight Time (T): " + flight_time.toString(), [10, 100], 20);

  body.display();
  body.update();
  body.checkBound();
  body.draw_trail(buffer);
}
