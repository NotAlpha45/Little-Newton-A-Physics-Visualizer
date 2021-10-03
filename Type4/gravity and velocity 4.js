body_height = 100;

//Takes value input from the input fields.
function value_input() {
  if (record_checkbox.checked()) {
    recording_enabled = true;
    record_time = int(record_input_field.value());
  }

  max_height = float(max_height_input_field.value());

  horizontal_range = float(horizontal_range_input_field.value());

  body_height = float(height_input_field.value()) * 10;

  gravity = float(gravity_input_field.value()) / 9.8;

  value_calculator();

  body.setHeight(body_height);

  // Converting angle to radian before passing.
  body.setVelocity(initial_velocity, (angle * Math.PI) / 180);

  body.setGravity(gravity);
}

function value_calculator() {
  let h0 = body_height / 10;
  let g = gravity * 9.8;
  let R = horizontal_range;
  let H = max_height;

  // Flight time
  let T;
  let T1 = (Math.sqrt(Math.abs(2 * g * (H - h0))) + Math.sqrt(2 * g * H)) / g;
  let T2 = (Math.sqrt(Math.abs(2 * g * (H - h0))) - Math.sqrt(2 * g * H)) / g;
  if (T1 < 0) {
    T = T2;
  } else if (T2 < 0) {
    T = T1;
  } else {
    T = T1;
  }
  flight_time = T.toFixed(3);

  // Angle
  let t = Math.sqrt(Math.abs((2 * (H - h0)) / g));
  let A = Math.atan((g * t * T) / R);
  angle = ((A * 180) / Math.PI).toFixed(3);

  // Initial velocity
  let v0 = (g * t) / Math.sin(A);
  initial_velocity = v0.toFixed(3);
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

  body = new Mover(100, 700 - 20, body_radius, img);
  recording_enabled = false;

  horizontal_range_input_maker(
    [width - 350, element_height_anchor],
    [width - 150, input_field_height_anchor],
    30
  );

  max_height_input_maker(
    [width - 350, element_height_anchor + element_distance],
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
  // image() will blit the buffer screen on the main screen like a recthorizontal_range.
  image(buffer, 0, 0, width, height);

  value_calculator();

  text_maker(
    "Initial velocity (v₀): " + initial_velocity.toString(),
    [10, 30],
    20
  );
  text_maker("Angle (θ): " + angle.toString(), [10, 70], 20);
  text_maker("Flight Time (T): " + flight_time.toString(), [10, 110], 20);

  body.display();
  body.update();
  body.checkBound();
  body.draw_trail(buffer);

  capture_animation(capturer, record_time);
}
