//Takes value input from the input fields.
function value_input() {
  if (record_checkbox.checked()) {
    recording_enabled = true;
    record_time = int(record_input_field.value());
  }

  horizontal_range = float(horizontal_range_input_field.value());

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
  let R = horizontal_range;

  // Initial velocity
  // let v0 = Math.sqrt((R * g) / (2 * Math.sin(A) * Math.cos(A)));

  let v0 = Math.sqrt(
    (g * R * R) / ((R * Math.tan(A) + h0) * 2 * Math.cos(A) * Math.cos(A))
  );

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

  //Maximum height
  let t = (v0 * Math.sin(A)) / g;
  max_height = h0 + v0 * Math.sin(A) * t - 0.5 * g * Math.pow(t, 2);
  max_height = max_height.toFixed(3);
}

function preload() {
  img = loadImage("assets/apple.png");
}

// Sets up the screen.
function setup() {

  background_color = createVector(255, 255, 255);
  drawing_canvas = createCanvas(canvasSize[0], canvasSize[1]);
  drawing_canvas.position("relative");
  drawing_canvas.parent(canvas_parent);
  frameRate(frame_rate);
  // buffer is a secondary surface that we will draw our trail on.

  add_canvas_elements();

  angle_input_maker(
    [width - 290, element_height_anchor],
    [width - 150, input_field_height_anchor],
    30
  );

  horizontal_range_input_maker(
    [width - 405, element_height_anchor + element_distance],
    [width - 150, input_field_height_anchor + input_field_distance],
    70
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

  record_checkbox = checkbox_maker(
    canvas_parent,
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
    "Initial valocity (V₀): " + initial_velocity.toString() + " m/s",
    [10, 30],
    text_size,
    "magenta"
  );

  text_maker(
    "Max height (H): " + max_height.toString() + " m",
    [10, 70],
    text_size,
    "darkorange"
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
