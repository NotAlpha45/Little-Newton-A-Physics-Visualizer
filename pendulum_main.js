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
  angle_element.position(width - 170 - 80, 140);

  // angle_input_field takes the entered value.
  angle_input_field = createInput("30");
  angle_input_field.position(width - 100 - 80, 170);
  angle_input_field.changed(value_input);

  g_element = createElement("h2", "g: ");
  g_element.position(width - 170 - 32, 200);

  g_input_field = createInput("9.8");
  g_input_field.position(width - 100 - 80, 230);
  g_input_field.changed(value_input);

  length_element = createElement("h2", "length: ");
  length_element.position(width - 170 - 84, 260);

  length_input_field = createInput("20");
  length_input_field.position(width - 100 - 80, 290);
  length_input_field.changed(value_input);

  damping_element = createElement("h2", "damping: ");
  damping_element.position(width - 100 - 182, 320);

  damping_input_field = createInput("1");
  damping_input_field.position(width - 100 - 80, 350);
  damping_input_field.changed(value_input);

  // You can use either the button or enter the value directly.
  button = createButton("Run!");
  button.position(width - 170, 380);
  button.mousePressed(value_input);

  bob = new Bob(200, 0, 30);
  bob.set_damping(1);

  Plotly.plot("chart", [
    {
      y: [bob.position.x],
      type: "scatter",
    },
  ]);
}

// Takes input from the input fields.
function value_input() {
  
  angle = float(angle_input_field.value());
  bob.set_angle((angle * Math.PI) / 360);

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

// Sets interval for drawing of the graph. Takes the function to be intervaled and
// the interval time as parameters. The extendTraces() functions extends a previously
// drawn function. In this case, it extends the graph drawn on the "chart element"

setInterval(function () {
  Plotly.extendTraces(
    "chart",
    {
      y: [[bob.position.x]],
    },
    [0]
  );

  datapoint_count++;

  if (datapoint_count > MAX_DATAPOINT) {
    Plotly.relayout("chart", {
      xaxis: {
        range: [datapoint_count - MAX_DATAPOINT, datapoint_count],
      },
    });
  }
}, 1);
