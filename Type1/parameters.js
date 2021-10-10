let bob;

let datapoint_count = 0;
let MAX_DATAPOINT = 500;
let display_graph_utilities = true;

let angle, angle_input_field, angle_element;
let g, gravity_input_field, g_element;
let string_length, length_input_field, length_element;
let damping, damping_input_field, damping_element;
let button;

let img;

let period;

let canvas_parent = "pendulum_display";

let bob_position_offset = 0;

let element_height_anchor = 10,
  element_distance = 60;

let input_field_height_anchor = 30,
  input_field_distance = 60;

let button_height_anchor = 210,
  button_distance = 40;

let canvasSize = [800, 500];

let body_radius = 15;

let text_size = 24;

let save_button_attributes = [
  "padding: 5px 5px",
  "font-size: 18px",
  "border-radius: 10px",
  "box-shadow: 0 5px 10px 0 rgba(0,0,0,0.2), 0 5px 15px 0 rgba(0,0,0,0.19)",
  "border: 3px solid purple",
  "text-align: center",
  "font-family: cursive",
  "font-weight: bold",
  "width: 10pc",
];

let run_button_attributes = [
  "padding: 5px 5px",
  "font-size: 18px",
  "border-radius: 10px",
  "box-shadow: 0 5px 10px 0 rgba(0,0,0,0.2), 0 5px 15px 0 rgba(0,0,0,0.19)",
  "border: 3px solid rgb(0, 255, 0)",
  "text-align: center",
  "font-family: cursive",
  "font-weight: bold",
  "width: 10pc",
];

let input_field_attributes = [
  "height: 30px",
  "width: 80px",
  "border-radius: 10px",
  "border: 3px solid teal",
  "font-size: 20px",
  "font-weight: bold",
];

let angle_element_attributes = [
  "font-family: cursive",
  "color: blue",
  "font-size: 20px",
  "font-weight: bold",
];

let gravity_element_attributes = ["font-family: cursive", "color: magenta"];

let length_element_attributes = ["font-family: cursive", "color: darkorange"];
