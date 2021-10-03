//Takes value input from the input fields.
function value_input() {
  if (record_checkbox.checked()) {
    recording_enabled = true;
    record_time = int(record_input_field.value());
  }

  max_height = float(max_height_input_field.value());

  gravity = float(gravity_input_field.value()) / 9.8;

  body_height = float(height_input_field.value()) * 10;

  angle = (float(angle_input_field.value()) * Math.PI) / 180;

  value_calculator();

  body.setHeight(body_height);

  body.setVelocity(initial_velocity, angle);

  body.setGravity(gravity);
}

function value_calculator() {
  let h0 = body_height / 10;
  let g = gravity * 9.8;
  let A = angle;
  let H = max_height;

  // Initial velocity
  let t = Math.sqrt(Math.abs((2 * (H - h0)) / g));
  let v0 = (g * t) / Math.sin(A);

  initial_velocity = v0.toFixed(3);

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
  drawing_canvas = createCanvas(canvasSize[0], canvasSize[1]);
  drawing_canvas.position(0);
  drawing_canvas.parent("projectile_simulation");
  frameRate(frame_rate);
  // buffer is a secondary surface that we will draw our trail on.
  buffer = createGraphics(width, height);
  buffer.background(background_color.x, background_color.y, background_color.z);

  angle_input_maker([width - 250, 20], [width - 150, 45], 30);

  height_input_maker([width - 257, 100], [width - 150, 125], 0);

  max_height_input_maker([width - 350, 60], [width - 150, 85], 20);

  gravity_input_maker([width - 265, 140], [width - 150, 165], 9.8);

  recording_enabled = false;
  body = new Mover(100, 700 - 20, body_radius, img);

  button_maker(
    "projectile_simulation",
    width - 150,
    button_height_anchor,
    "Run",
    value_input,
    run_button_attributes
  );

  button_maker(
    "projectile_simulation",
    width - 150,
    button_height_anchor + button_distance,
    "Reset Object",
    reset_obj,
    reset_obj_button_attributes
  );
  button_maker(
    "projectile_simulation",
    width - 150,
    button_height_anchor + button_distance * 2,
    "Reset Display",
    setup,
    reset_disp_button_attributes
  );

  record_checkbox = checkbox_maker(
    "projectile_simulation",
    " Record animation (seconds)",
    false,
    [width - 250, button_height_anchor + button_distance * 3],
    recording_field_maker
  );
}

// Draws all the objects in a loop.
function draw() {
  background(background_color.x, background_color.y, background_color.z);

  // width and height are the width and height of the screen. Builtin attributes.
  // image() will blit the buffer screen on the main screen like a rectangle.
  image(buffer, 0, 0, width, height);

  value_calculator();

  text_maker(
    "Initial valocity (V₀): " + initial_velocity.toString(),
    [10, 30],
    20
  );
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
