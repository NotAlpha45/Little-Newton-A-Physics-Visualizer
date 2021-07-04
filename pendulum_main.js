let bob;
let datapoint_count = 0;
let MAX_DATAPOINT = 500;
let angle, angle_input_field, angle_element;
let g, g_input_field, g_element;
let length, length_input_field, length_element;
let damping, damping_input_field, damping_element;
let button;

function setup() {
  canvas = createCanvas(900, 400);
  canvas.position(0);
  canvas.parent("pendulum_display");
  frameRate(60);

  buffer = createGraphics(width, height);
  buffer.background(94, 219, 211);

  // angle_element is the h2 tag element beside the input field
  angle_element = createElement("h2", "Angle: ");
  angle_element.position(width - 250, 0);
  angle_element.parent("pendulum_display");
  // angle_input_field takes the entered value.
  angle_input_field = createInput("30");
  angle_input_field.position(width - 180, 30);
  angle_input_field.changed(value_input);
  angle_input_field.parent("pendulum_display");

  g_element = createElement("h2", "g: ");
  g_element.position(width - 202, 40);
  g_element.parent("pendulum_display");
  g_input_field = createInput("9.8");
  g_input_field.position(width - 180, 70);
  g_input_field.changed(value_input);
  g_input_field.parent("pendulum_display");

  length_element = createElement("h2", "length: ");
  length_element.position(width - 254, 80);
  length_element.parent("pendulum_display");
  length_input_field = createInput("20");
  length_input_field.position(width - 180, 110);
  length_input_field.changed(value_input);
  length_input_field.parent("pendulum_display");

  damping_element = createElement("h2", "damping: ");
  damping_element.position(width - 282, 120);
  damping_element.parent("pendulum_display");
  damping_input_field = createInput("1");
  damping_input_field.position(width - 180, 150);
  damping_input_field.changed(value_input);
  damping_input_field.parent("pendulum_display");

 
  button = createButton("Run");
  button.position(width - 170, 190);
  button.mousePressed(value_input);
  button.parent("pendulum_display");


  bob = new Bob(200, 0, 30);
  bob.set_damping(1);

  let plot_data = {
    y: [bob.position.x - width / 2 + 100],
    type: "scatter",
  };

  let graph_settings = {
    yaxis: { range: [-200, 200] },
  };

  Plotly.newPlot("chart", [plot_data], graph_settings);
}

// Takes input from the input fields.
function value_input() {
  angle = float(angle_input_field.value());
  bob.set_angle((angle * Math.PI) / 180);

  g = float(g_input_field.value());
  bob.set_gravity(g / 10);

  length = float(length_input_field.value());
  bob.set_length(length * 10);

  damping = float(damping_input_field.value());

  if (damping > 1) {
    damping = 1;
  } else if (damping < 0) {
    damping = 0;
  }

  bob.set_damping(damping);
}

function draw() {
  background(94, 219, 211);
  // width and height are the width and height of the screen. Builtin attributes.
  // image() will blit the buffer screen on the main screen like a rectangle.
  image(buffer, 0, 0, width, height);
  bob.display();
  bob.update();
}

// Extends the graph via extendTraces method and keeps track of datapoint for a
// dynamic plotline.
function continuous_plot() {
  Plotly.extendTraces(
    "chart",
    {
      y: [[bob.position.x - width / 2 + 100]],
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
