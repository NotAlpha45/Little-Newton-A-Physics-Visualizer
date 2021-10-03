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
  max_height = h0 + v0 * Math.sin(A) * t - 0.5 * g * Math.pow(t, 2);
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
  background_color = createVector(255, 255, 255);
  drawing_canvas = createCanvas(canvasSize[0], canvasSize[1]);
  drawing_canvas.position(0);
  drawing_canvas.parent("projectile_simulation");
  frameRate(frame_rate);
  // buffer is a secondary surface that we will draw our trail on.
  buffer = createGraphics(width, height);
  buffer.background(background_color.x, background_color.y, background_color.z);

  body = new Mover(100, 700 - 20, body_radius, img);

  capturer = make_recorder("webm", 60, true);
  frame_count = 0;

  angle_input_maker(
    [width - 250, element_height_anchor],
    [width - 150, input_field_height_anchor],
    30
  );

  velocity_input_maker(
    [width - 327, element_height_anchor + element_distance],
    [width - 150, input_field_height_anchor + input_field_distance],
    20
  );

  height_input_maker(
    [width - 257, element_height_anchor + element_distance * 2],
    [width - 150, input_field_height_anchor + input_field_distance * 2],
    0
  );

  gravity_input_maker(
    [width - 265, element_height_anchor + element_distance * 3],
    [width - 150, input_field_height_anchor + input_field_distance * 3],
    9.8
  );

  recording_enabled = false;

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
