let buffer;
let frame_rate = 60;
let body;
let body_height, height_input_field, height_text;
let angle, angle_input_field, angle_text;
let initial_velocity, initial_velocity_input_field, initial_velocity_text;
let gravity, gravity_input_field, gravity_text;
let button;
let img;
let max_height, flight_time, horizontal_range;
let record_checkbox,
  record_input_field,
  record_time,
  recording_enabled = false;
// Counts the number of frames recorded.
let frame_count;
let capturer;

function make_recorder(frmt, frame_rate, console_display) {
  return new CCapture({
    format: frmt,
    framerate: frame_rate,
    verbose: console_display,
  });
}

function capture_animation(recorder, time) {
  if (recording_enabled) {
    if (frame_count == 1) {
      recorder.start();
    }
    if (frame_count < frame_rate * time) {
      // Captures every frame until certain number of frames reached
      recorder.capture(canvas);
    } else if (frame_count == frame_rate * time) {
      // If certain frames reached, stop counting
      recorder.save();
      recorder.stop();
    }
    frame_count++;
  }
}

function element_maker(parent, header_size, text, pos) {
  element = createElement(header_size, text);
  element.parent(parent);
  element.position(pos[0], pos[1]);
}

function input_field_maker(parent, size, default_val, pos) {
  field = createInput(default_val);
  field.parent(parent);
  field.size(size);
  field.position(pos[0], pos[1]);
  return field;
}
function angle_input_maker() {
  element_maker("projectile_simulation", "h3", "Angle (θ): ", [
    width - 250,
    20,
  ]);
  angle_input_field = input_field_maker("projectile_simulation", 50, "30", [
    width - 150,
    45,
  ]);
}

function velocity_input_maker() {
  element_maker("projectile_simulation", "h3", "Initial Velocity (v₀): ", [
    width - 327,
    60,
  ]);
  initial_velocity_input_field = input_field_maker(
    "projectile_simulation",
    50,
    "20",
    [width - 150, 85]
  );
}

function height_input_maker() {
  element_maker("projectile_simulation", "h3", "Height (h): ", [
    width - 257,
    100,
  ]);
  height_input_field = input_field_maker("projectile_simulation", 50, "0", [
    width - 150,
    125,
  ]);
}

function gravity_input_maker() {
  element_maker("projectile_simulation", "h3", "Gravity (g):", [
    width - 265,
    140,
  ]);
  gravity_input_field = input_field_maker("projectile_simulation", 50, "9.8", [
    width - 150,
    165,
  ]);
}

function recording_field_maker() {
  record_input_field = input_field_maker("projectile_simulation", 50, "2", [
    width - 150,
    345,
  ]);
}

function button_maker(parent, posx, posy, label, func) {
  button = createButton(label);
  button.position(posx, posy);
  button.mousePressed(func);
  button.parent(parent);
}

function checkbox_maker(parent, label, default_val, position, func) {
  checkbox = createCheckbox(label, default_val);
  checkbox.parent(parent);
  checkbox.position(position[0], position[1]);
  checkbox.mousePressed(func);
  return checkbox;
}

function text_maker(txt, position, size) {
  textSize(size);
  fill(0);
  text(txt, position[0], position[1]);
}

//Takes value input from the input fields.
function value_input() {
  if (record_checkbox.checked()) {
    recording_enabled = true;
    record_time = int(record_input_field.value());
  }

  initial_velocity = float(initial_velocity_input_field.value());

  gravity = float(gravity_input_field.value()) / 9.8;

  body_height = float(height_input_field.value()) * 10;

  angle = (float(angle_input_field.value()) * Math.PI) / 180;

  value_calculator();

  body.setHeight(body_height);

  body.setVelocity(initial_velocity, angle);

  body.setGravity(gravity);
}

// Resets the object by redefining it.
function reset_obj() {
  background(94, 219, 211);
  image(buffer, 0, 0, width, height);
  body = new Mover(100, 700 - 20, 20, img);
  body.set_trail_color();
}

function value_calculator() {
  let h0 = body_height / 10;
  let g = gravity * 9.8;
  let A = angle;
  let v0 = initial_velocity;

  //Flight time for trown from any height
  let T1 =
    (v0 * Math.sin(A) + Math.sqrt(Math.pow(v0 * Math.sin(A), 2) + 2 * g * h0)) /
    g;

  let T2 =
    (v0 * Math.sin(A) - Math.sqrt(Math.pow(v0 * Math.sin(A), 2) + 2 * g * h0)) /
    g;
  if (T2 < 0) {
    flight_time = T1.toFixed(3);
  } else if (T1 < 0) {
    flight_time = T2.toFixed(3);
  } else {
    flight_time = T1.toFixed(3);
  }

  //Maximum height
  let t = (v0 * Math.sin(A)) / g;
  max_height = body_height + v0 * Math.sin(A) * t - 0.5 * g * Math.pow(t, 2);
  max_height = max_height.toFixed(3);

  //Maximum distance / horizontal_range
  horizontal_range = v0 * Math.cos(A) * flight_time;
  horizontal_range = horizontal_range.toFixed(3);
}

function preload() {
  img = loadImage("assets/apple.png");
}

// Sets up the screen.
function setup() {
  capturer = make_recorder("webm", 60, true);
  frame_count = 0;
  
  background_color = createVector(255, 255, 255);
  drawing_canvas = createCanvas(1360, 600);
  drawing_canvas.position(0);
  drawing_canvas.parent("projectile_simulation");
  frameRate(frame_rate);
  // buffer is a secondary surface that we will draw our trail on.
  buffer = createGraphics(width, height);
  buffer.background(background_color.x, background_color.y, background_color.z);

  body = new Mover(100, 700 - 20, 20, img);

  angle_input_maker();

  height_input_maker();

  velocity_input_maker();

  gravity_input_maker();

  recording_enabled = false;

  record_checkbox = checkbox_maker(
    "projectile_simulation",
    " Record animation (seconds)",
    false,
    [width - 250, 315],
    recording_field_maker
  );

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
    [10, 70],
    20
  );
  text_maker("Flight Time (T): " + flight_time.toString(), [10, 110], 20);

  body.display();
  body.update();
  body.checkBound();
  body.draw_trail(buffer);

  capture_animation(capturer, record_time);
}
