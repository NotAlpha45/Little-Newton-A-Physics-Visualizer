let bob;
let frames;
let x_pos = [];
function setup() {
  canvas = createCanvas(800, 600);
  canvas.position(0);
  canvas.parent("pendulum_simulation");
  frameRate(60);
  buffer = createGraphics(width, height);
  buffer.background(94, 219, 211);
  bob = new Bob(300, Math.PI / 6, 30);
  bob.set_damping(1);

  Plotly.plot("chart", [
    {
      y: [bob.position.x],
      type: "line",
    },
  ]);
}

function draw() {
  background(94, 219, 211);
  // width and height are the width and height of the screen. Builtin attributes.
  // image() will blit the buffer screen on the main screen like a rectangle.
  image(buffer, 0, 0, width, height);
  bob.display();
  //   bob.draw_trail(buffer);
  bob.update();
  frames = frameCount;
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
}, 10);
