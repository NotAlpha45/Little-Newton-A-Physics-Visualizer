function save_value() {
  var is_called = true;

  let am_inp = float(am.value());

  let pe_inp = float(pe.value());

  let ph_inp = float(ph.value());

  let am2_inp = float(am2.value());

  let pe2_inp = float(pe2.value());

  let ph2_inp = float(ph2.value());

  var userdata = {
    param0: is_called,
    param1: am_inp,
    param2: pe_inp,
    param3: ph_inp,
    param4: am2_inp,
    param5: pe2_inp,
    param6: ph2_inp,
  };

  $.ajax({
    type: "POST",
    url: "wave-superposition.php",
    data: userdata,
    success: function (data) {
      console.log(data);
    },
  });
}

function setup() {
  // Very important note : Do not name your canvas as 'canvas'. 'canvas' itself is an attribute
  // that is needed to capture animation via CCapture. Similar to 'width' and 'height' that are
  // built in attribute of P5js.
  drawing_canvas = createCanvas(1200, 400);

  frameRate(frame_rate);

  recording_enabled = false;
  capturer = make_recorder("webm", 60, true);
  frame_count = 0;

  record_checkbox = checkbox_maker(
    " Record animation (seconds)",
    false,
    [10, record_checkbox_height_anchor],
    recording_field_maker
  );

  am = createInput();
  am.position(width, input_field_height_anchor);
  style_applier(am, input_field_attributes);

  pe = createInput();
  pe.position(width, input_field_height_anchor + input_field_distance);
  style_applier(pe, input_field_attributes);

  ph = createInput();
  ph.position(width, input_field_height_anchor + input_field_distance * 2);
  style_applier(ph, input_field_attributes);

  am2 = createInput();
  am2.position(
    width,
    input_field_height_anchor +
      input_field_distance * 2 +
      input_field_seperation_distance
  );
  style_applier(am2, input_field_attributes2);

  pe2 = createInput();
  pe2.position(
    width,
    input_field_height_anchor +
      input_field_distance * 3 +
      input_field_seperation_distance
  );
  style_applier(pe2, input_field_attributes2);

  ph2 = createInput();
  ph2.position(
    width,
    input_field_height_anchor +
      input_field_distance * 4 +
      input_field_seperation_distance
  );
  style_applier(ph2, input_field_attributes2);

  run_button = createButton("Run");
  run_button.position(width, button_height_anchor);
  style_applier(run_button, run_button_attributes);

  button_maker(
    [width, button_height_anchor + button_distance],
    "Save Values",
    save_value,
    save_button_attributes
  );

  run_button.mousePressed(function () {
    amf = float(am.value());
    pef = float(pe.value());
    phf = float(ph.value());

    amf2 = float(am2.value());
    pef2 = float(pe2.value());
    phf2 = float(ph2.value());
    start = true;

    if (record_checkbox.checked()) {
      recording_enabled = true;
      record_time = int(record_input_field.value());
    }
  });
}

function draw() {
  background(255, 255, 255);
  if (!start) {
    text_maker("First Wave: ", [width - 140, 20], 24, "teal");

    text_maker("Amplitude: ", [width - 120, text_height_anchor], 20, "darkred");

    text_maker(
      "Period: ",
      [width - 85, text_height_anchor + text_distance],
      20,
      "darkgreen"
    );

    text_maker(
      "Phase: ",
      [width - 80, text_height_anchor + text_distance * 2],
      20,
      "darkblue"
    );

    text_maker("Second Wave: ", [width - 160, 180], 24, "maroon");

    text_maker(
      "Amplitude: ",
      [
        width - 120,
        text_height_anchor + text_distance * 2 + text_seperation_distance,
      ],
      20,
      "red"
    );

    text_maker(
      "Period: ",
      [
        width - 85,
        text_height_anchor + text_distance * 3 + text_seperation_distance,
      ],
      20,
      "green"
    );

    text_maker(
      "Phase: ",
      [
        width - 80,
        text_height_anchor + text_distance * 4 + text_seperation_distance,
      ],
      20,
      "blue"
    );
  }

  if (start) {
    noStroke();
    show_parameters();

    translate(0, 200);

    let y1 = 0,
      y2 = 0;
    for (let x1 = 200; x1 < width; x1 += 1.25 * r) {
      y1 = sin(phf + (TWO_PI * x1) / pef) * amf;
      y2 = sin(phf2 + (TWO_PI * x1) / pef2) * amf2;
      y = y1 + y2;

      fill(255, 0, 0);
      stroke(255, 0, 0);
      strokeWeight(r / 2);
      circle(x1, y, r);
      line(x1, 0, x1, y);

      strokeWeight(r / 3);
      fill(0, 0, 255);
      stroke(0, 0, 255);
      circle(x1, y1, r);
      line(x1, 0, x1, y1);

      strokeWeight(r / 3);
      fill(0, 255, 0);
      stroke(0, 255, 0);
      circle(x1, y2, r);
      line(x1, 0, x1, y2);
    }
    phf += 0.01;
    phf2 += 0.01;

    capture_animation(capturer, record_time);
  }
}
