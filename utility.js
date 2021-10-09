function button_maker(parent, posx, posy, label, func, style_attributes) {
  button = createButton(label);
  button.position(posx, posy);

  // Will apply all the attributes mentioned in the style_attributes list accordingly.
  style_attributes.forEach(function (attribute) {
    button.style(attribute);
  });

  button.mousePressed(func);
  button.parent(parent);
}

function text_maker(txt, position, size, color) {
  textSize(size);
  textStyle(BOLD);
  fill(color);
  text(txt, position[0], position[1]);
}

function input_field_maker(parent, default_val, pos, input_field_attributes) {
  field = createInput(default_val);
  field.parent(parent);
  field.position(pos[0], pos[1]);

  input_field_attributes.forEach(function (attribute) {
    field.style(attribute);
  });

  return field;
}

function checkbox_maker(parent, label, default_val, position, func) {
  checkbox = createCheckbox(label, default_val);

  checkbox.style("font-size: 20px");
  checkbox.style("color: magenta");
  checkbox.style("font-family : hack");

  checkbox.parent(parent);
  checkbox.position(position[0], position[1]);
  checkbox.mousePressed(func);
  return checkbox;
}

function element_maker(parent, header_size, text, pos, element_attributes) {
  element = createElement(header_size, text);
  element.parent(parent);
  element.position(pos[0], pos[1]);
  // element.style("font-family: cursive");
  element_attributes.forEach(function (attribute) {
    element.style(attribute);
  });
}

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

function recording_field_maker() {
  record_input_field = input_field_maker(
    canvas_parent,
    "2",
    [width, input_field_height_anchor + input_field_distance * 4],
    input_field_attributes
  );
}

function add_canvas_elements() {
  clear();
  recording_enabled = false;

  buffer = createGraphics(width, height);
  buffer.background(background_color.x, background_color.y, background_color.z);

  body = new Mover(100, 700 - 20, body_radius, img);

  capturer = make_recorder("webm", 60, true);
  frame_count = 0;
}

// Resets the object by redefining it.
function reset_obj() {
  background(94, 219, 211);
  image(buffer, 0, 0, width, height);
  body = new Mover(100, 700 - 20, body_radius, img);
  body.set_trail_color();
}

function angle_input_maker(element_pos, input_field_pos, default_val) {
  element_maker(
    canvas_parent,
    "h3",
    "📐 Angle (θ): ",
    element_pos,
    angle_element_attributes
  );
  angle_input_field = input_field_maker(
    canvas_parent,
    default_val,
    input_field_pos,
    input_field_attributes
  );
}

function velocity_input_maker(element_pos, input_field_pos, default_val) {
  element_maker(
    canvas_parent,
    "h3",
    "🏃‍♂️ Initial Velocity (v₀): ",
    element_pos,
    velocity_element_attributes
  );
  initial_velocity_input_field = input_field_maker(
    canvas_parent,
    default_val,
    input_field_pos,
    input_field_attributes
  );
}

function height_input_maker(element_pos, input_field_pos, default_val) {
  element_maker(
    canvas_parent,
    "h3",
    "📏 Height (h): ",
    element_pos,
    height_element_attributes
  );
  height_input_field = input_field_maker(
    canvas_parent,
    default_val,
    input_field_pos,
    input_field_attributes
  );
}

function gravity_input_maker(element_pos, input_field_pos, default_val) {
  element_maker(
    canvas_parent,
    "h3",
    "⏬ Gravity (g):",
    element_pos,
    gravity_element_attributes
  );
  gravity_input_field = input_field_maker(
    canvas_parent,

    default_val,
    input_field_pos,
    input_field_attributes
  );
}

function horizontal_range_input_maker(
  element_pos,
  input_field_pos,
  default_val
) {
  element_maker(
    canvas_parent,
    "h3",
    "🚗 Horizontal Range (R): ",
    element_pos,
    horizontal_range_element_attributes
  );

  horizontal_range_input_field = input_field_maker(
    canvas_parent,
    default_val,
    input_field_pos,
    input_field_attributes
  );
}

function max_height_input_maker(element_pos, input_field_pos) {
  element_maker(
    canvas_parent,
    "h3",
    "🚀 Maximum Height (H): ",
    element_pos,
    max_height_element_attributes
  );
  max_height_input_field = input_field_maker(
    canvas_parent,
    "20",
    input_field_pos,
    input_field_attributes
  );
}
