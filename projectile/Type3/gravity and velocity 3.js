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

function save_value() {
  var is_called = true;

  let max_height_inp = float(max_height_input_field.value());

  let gravity_inp = float(gravity_input_field.value());

  let body_height_inp = float(height_input_field.value());

  let angle_inp = float(angle_input_field.value());

  var userdata = {
    param0: is_called,
    param1: angle_inp,
    param2: max_height_inp,
    param3: body_height_inp,
    param4: gravity_inp,
  };

  $.ajax({
    type: "POST",
    url: "projectile_page_3.php",
    data: userdata,
    success: function (data) {
      console.log(data);
    },
  });
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
  background_color = createVector(255, 255, 255);
  // Very important note : Do not name your canvas as 'canvas'. 'canvas' itself is an attribute
  // that is needed to capture animation via CCapture. Similar to 'width' and 'height' that are
  // built in attribute of P5js.
  drawing_canvas = createCanvas(canvasSize[0], canvasSize[1]);
  drawing_canvas.position(0);
  drawing_canvas.parent(canvas_parent);
  frameRate(frame_rate);

  add_canvas_elements();

  angle_input_maker(
    [width - 290, element_height_anchor],
    [width - 150, input_field_height_anchor],
    45
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
    [width - 380, input_field_height_anchor + input_field_distance * 4 + 5],
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

  button_maker(
    canvas_parent,
    width - 150,
    button_height_anchor + button_distance * 3,
    "Save Values",
    save_value,
    save_button_attributes
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
    "Initial valocity (V???): " + initial_velocity.toString() + " m/s",
    [10, 30],
    text_size,
    "magenta"
  );
  text_maker(
    "Horizontal range (R): " + horizontal_range.toString() + " m",
    [10, 70],
    text_size,
    "purple"
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
