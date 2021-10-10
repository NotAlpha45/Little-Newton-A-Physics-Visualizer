function style_applier(element, style_list) {
  style_list.forEach(function (style_parameter) {
    element.style(style_parameter);
  });
}

function text_maker(text_to_show, position, size, color) {
  textSize(size);
  fill(color);
  text(text_to_show, position[0], position[1]);
}

function checkbox_maker(label, default_val, position, func) {
  checkbox = createCheckbox(label, default_val);

  checkbox.style("font-size: 20px");
  checkbox.style("color: magenta");
  checkbox.style("font-family : hack");

  checkbox.position(position[0], position[1]);
  checkbox.mousePressed(func);
  return checkbox;
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
    "2",
    [320, record_checkbox_height_anchor],
    input_field_attributes
  );
}

function input_field_maker(default_val, pos, input_field_attributes) {
  field = createInput(default_val);

  field.position(pos[0], pos[1]);

  input_field_attributes.forEach(function (attribute) {
    field.style(attribute);
  });

  return field;
}

function show_parameters() {
  text_maker("First Wave: ", [10, 20 + 20], 24, "red");

  text_maker(
    `Amplitude: ${amf} m`,
    [10, text_height_anchor + 20],
    20,
    "darkorange"
  );

  text_maker(
    `Period: ${pef} s`,
    [10, text_height_anchor + text_distance + 20],
    20,
    "purple"
  );

  text_maker(
    `Phase: ${ph.value()}°`,
    [10, text_height_anchor + text_distance * 2 + 20],
    20,
    "maroon"
  );

  text_maker("Second Wave: ", [10, 180 + 20], 24, "blue");

  text_maker(
    `Amplitude: ${amf2} m`,
    [
      10,
      text_height_anchor + text_distance * 2 + text_seperation_distance + 20,
    ],
    20,
    "darkorange"
  );

  text_maker(
    `Period: ${pef2} s`,
    [
      10,
      text_height_anchor + text_distance * 3 + text_seperation_distance + 20,
    ],
    20,
    "purple"
  );

  text_maker(
    `Phase: ${ph2.value()}°`,
    [
      10,
      text_height_anchor + text_distance * 4 + text_seperation_distance + 20,
    ],
    20,
    "maroon"
  );
}
