// Takes input from the input fields.
function value_input() {
  angle = float(angle_input_field.value());
  bob.set_angle((angle * Math.PI) / 180);

  g = float(g_input_field.value());
  bob.set_gravity(g / 10);

  length = float(length_input_field.value());
  bob.set_length(length * 100);

  damping = 1;

  bob.set_damping(damping);
}

function value_calculator() {
  let l = length;
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
  canvas = createCanvas(900, 400);
  canvas.position(0);
  canvas.parent(canvas_parent);
  frameRate(60);

  buffer = createGraphics(width, height);
  buffer.background(94, 219, 211);

  angle_input_maker();

  gravity_input_maker();

  length_input_maker();

  button = button_maker(canvas_parent, [width - 170, 150], "Run", value_input);

  bob = new Bob(200, 0, 30, img);
  bob.set_damping(1);

  let plot_data = {
    // Adjusted coodinate for plotting.
    y: [(bob.position.x - width / 2 + 100) / 100],
    type: "scatter",
  };

  let graph_settings = {
    yaxis: { range: [-10, 10] },
  };

  Plotly.newPlot("chart", [plot_data], graph_settings);
}

function draw() {
  background(94, 219, 211);
  // width and height are the width and height of the screen. Builtin attributes.
  // image() will blit the buffer screen on the main screen like a rectangle.
  image(buffer, 0, 0, width, height);

  value_calculator();
  text_maker("Period (T): " + period.toString(), [10, 30], 20);

  bob.display();
  bob.update();
}

// Extends the graph via extendTraces method and keeps track of datapoint for a
// dynamic plotline.
function continuous_plot() {
  Plotly.extendTraces(
    "chart",
    {
      y: [[(bob.position.x - width / 2 + 100) / 100]],
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
