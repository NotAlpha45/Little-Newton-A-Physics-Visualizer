// Takes input from the input fields.
function value_input() {
  angle = float(angle_input_field.value());
  bob.set_angle((angle * Math.PI) / 180);

  g = float(gravity_input_field.value());
  bob.set_gravity(g / 10);

  string_length = float(length_input_field.value());
  bob.set_length(string_length * 100);

  damping = 1;

  bob.set_damping(damping);
}

function value_calculator() {
  let l = string_length;
  let A = (angle * Math.PI) / 180;
  // Expansional fromula of period
  period =
    2 *
    Math.PI *
    Math.sqrt(l / g) *
    (1 +
      (1 / 16) * Math.pow(A, 2) +
      (11 / 3072) * Math.pow(A, 4) +
      (173 / 737280) * Math.pow(A, 6) +
      (22931 / 951268147200) * Math.pow(A, 8));

  period = period.toFixed(5);
}

function preload() {
  img = loadImage("assets/apple.png");
}

function setup() {
  // Very important note : Do not name your canvas as 'canvas'. 'canvas' itself is an attribute
  // that is needed to capture animation via CCapture. Similar to 'width' and 'height' that are
  // built in attribute of P5js.
  drawing_canvas = createCanvas(canvasSize[0], canvasSize[1]);
  drawing_canvas.position(0, 0, "relative");
  drawing_canvas.parent(canvas_parent);
  frameRate(60);

  buffer = createGraphics(width, height);
  // buffer.background(94, 219, 211);
  buffer.background(255, 255, 255);

  angle_input_maker(
    [width + 175, element_height_anchor],
    [width + 310, input_field_height_anchor],
    30
  );

  gravity_input_maker(
    [width + 165, element_height_anchor + element_distance],
    [width + 310, input_field_height_anchor + input_field_distance],
    9.8
  );

  length_input_maker(
    [width + 175, element_height_anchor + element_distance * 2],
    [width + 310, input_field_height_anchor + input_field_distance * 2],
    2
  );

  button = button_maker(
    canvas_parent,
    [width + 310, button_height_anchor],
    "Run",
    value_input,
    run_button_attributes
  );

  bob = new Bob(200, 0, body_radius, img);
  bob.set_damping(1);

  let plot_data = {
    // Adjusted coodinate for plotting.
    y: [(bob.position.x - width / 2 + bob_position_offset) / 100],
    type: "scatter",
  };

  let data_display_settings = {
    yaxis: { range: [-10, 10] },
  };

  let graph_window_settings = {
    displayModeBar: display_graph_utilities,
  };

  Plotly.newPlot(
    "chart",
    [plot_data],
    data_display_settings,
    graph_window_settings
  );
}

function draw() {
  // background(94, 219, 211);
  background(255, 255, 255);
  // width and height are the width and height of the screen. Builtin attributes.
  // image() will blit the buffer screen on the main screen like a rectangle.
  image(buffer, 0, 0, width, height);

  value_calculator();
  text_maker(
    "⌚ Period (T): " + period.toString() + " s",
    [10, 30],
    text_size,
    "yellowgreen"
  );

  bob.display();
  bob.update();
}

// Extends the graph via extendTraces method and keeps track of datapoint for a
// dynamic plotline.
function continuous_plot() {
  Plotly.extendTraces(
    "chart",
    {
      y: [[(bob.position.x - width / 2 + bob_position_offset) / 100]],
    },
    [0]
  );

  datapoint_count++;

  let relay_settings = {
    xaxis: { range: [datapoint_count - MAX_DATAPOINT, datapoint_count] },
  };

  if (datapoint_count > MAX_DATAPOINT) {
    Plotly.relayout("chart", relay_settings);
  }
}

// Sets interval for drawing of the graph.
setInterval(continuous_plot, 1);
