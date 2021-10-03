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

function text_maker(txt, position, size) {
  textSize(size);
  fill(0);
  text(txt, position[0], position[1]);
}

function input_field_maker(parent, size, default_val, pos) {
  field = createInput(default_val);
  field.parent(parent);
  field.size(size);
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

function element_maker(parent, header_size, text, pos) {
  element = createElement(header_size, text);
  element.parent(parent);
  element.position(pos[0], pos[1]);
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

function angle_input_maker(element_pos, input_field_pos, default_val) {
  element_maker("projectile_simulation", "h3", "Angle (θ): ", element_pos);
  angle_input_field = input_field_maker(
    "projectile_simulation",
    50,
    default_val,
    input_field_pos
  );
}

function velocity_input_maker(element_pos, input_field_pos, default_val) {
  element_maker(
    "projectile_simulation",
    "h3",
    "Initial Velocity (v₀): ",
    element_pos
  );
  initial_velocity_input_field = input_field_maker(
    "projectile_simulation",
    50,
    default_val,
    input_field_pos
  );
}

function height_input_maker(element_pos, input_field_pos, default_val) {
  element_maker("projectile_simulation", "h3", "Height (h): ", element_pos);
  height_input_field = input_field_maker(
    "projectile_simulation",
    50,
    default_val,
    input_field_pos
  );
}

function gravity_input_maker(element_pos, input_field_pos, default_val) {
  element_maker("projectile_simulation", "h3", "Gravity (g):", element_pos);
  gravity_input_field = input_field_maker(
    "projectile_simulation",
    50,
    default_val,
    input_field_pos
  );
}

function recording_field_maker() {
  record_input_field = input_field_maker("projectile_simulation", 50, "2", [
    width - 150,
    button_height_anchor + button_distance * 4,
  ]);
}

// Resets the object by redefining it.
function reset_obj() {
  background(94, 219, 211);
  image(buffer, 0, 0, width, height);
  body = new Mover(100, 700 - 20, body_radius, img);
  body.set_trail_color();
}

function horizontal_range_input_maker(
  element_pos,
  input_field_pos,
  default_val
) {
  element_maker(
    "projectile_simulation",
    "h3",
    "Horizontal Range (R): ",
    element_pos
  );

  horizontal_range_input_field = input_field_maker(
    "projectile_simulation",
    50,
    default_val,
    input_field_pos
  );
}

function max_height_input_maker(element_pos, input_field_pos) {
  element_maker(
    "projectile_simulation",
    "h3",
    "Maximum Height (H): ",
    element_pos
  );
  max_height_input_field = input_field_maker(
    "projectile_simulation",
    50,
    "20",
    input_field_pos
  );
}
