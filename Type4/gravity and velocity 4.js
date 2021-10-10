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
  background_color = createVector(255, 255, 255);
  // Very important note : Do not name your canvas as 'canvas'. 'canvas' itself is an attribute
  // that is needed to capture animation via CCapture. Similar to 'width' and 'height' that are
  // built in attribute of P5js.
  drawing_canvas = createCanvas(canvasSize[0], canvasSize[1]);
  drawing_canvas.position(0);
  drawing_canvas.parent(canvas_parent);
  frameRate(frame_rate);

  add_canvas_elements();

  horizontal_range_input_maker(
    [width - 405, element_height_anchor + element_distance],
    [width - 150, input_field_height_anchor],
    30
  );

  max_height_input_maker(
    [width - 405, element_height_anchor + element_distance],
    [width - 150, input_field_height_anchor + input_field_distance],
    20
  );

  height_input_maker(
    [width - 305, element_height_anchor + element_distance * 2],
    [width - 150, input_field_height_anchor + input_field_distance * 2],
    0
  );

  gravity_input_maker(
    [width - 310, element_height_anchor + element_distance * 3],
    [width - 150, input_field_height_anchor + input_field_distance * 3],
    9.8
  );

  record_checkbox = checkbox_maker(
    canvas_parent,
    " Record animation (seconds)",
    false,
    [width - 350, input_field_height_anchor + input_field_distance * 4 + 5],
    recording_field_maker
  );

  button_maker(
    canvas_parent,
    width - 150,
    button_height_anchor,
    "Run",
    value_input,
    run_button_attributes
  );

  button_maker(
    canvas_parent,
    width - 150,
    button_height_anchor + button_distance,
    "Reset Object",
    reset_obj,
    reset_obj_button_attributes
  );
  button_maker(
    canvas_parent,
    width - 150,
    button_height_anchor + button_distance * 2,
    "Reset Display",
    add_canvas_elements,
    reset_disp_button_attributes
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
    "Initial velocity (v₀): " + initial_velocity.toString() + " m/s",
    [10, 30],
    text_size,
    "magenta"
  );
  text_maker(
    "Angle (θ): " + angle.toString() + "°",
    [10, 70],
    text_size,
    "blue"
  );
  text_maker(
    "Flight Time (T): " + flight_time.toString() + " s",
    [10, 110],
    text_size,
    "yellowgreen"
  );

  body.display();
  body.update();
  body.checkBound();
  body.draw_trail(buffer);

  capture_animation(capturer, record_time);
}
