// Contains all the necessary utility function and variables like button making, label making, ect.
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

let reset_obj_button_attributes = [
  "padding: 5px 5px",
  "font-size: 18px",
  "border-radius: 10px",
  "box-shadow: 0 5px 10px 0 rgba(0,0,0,0.2), 0 5px 15px 0 rgba(0,0,0,0.19)",
  "border: 3px solid rgb(250, 200, 0)",
  "text-align: center",
  "font-family: cursive",
  "font-weight: bold",
  "width: 10pc",
];

let reset_disp_button_attributes = [
  "padding: 5px 5px",
  "font-size: 18px",
  "border-radius: 10px",
  "box-shadow: 0 5px 10px 0 rgba(0,0,0,0.2), 0 5px 15px 0 rgba(0,0,0,0.19)",
  "border: 3px solid rgb(255, 0, 0)",
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
  "position: relative",
];

let gravity_element_attributes = [
  "font-family: cursive",
  "color: brown",
  "font-size: 20px",
  "font-weight: bold",
  "position: relative",
];

let height_element_attributes = [
  "font-family: cursive",
  "color: darkgray",
  "font-size: 20px",
  "font-weight: bold",
  "position: relative",
];

let velocity_element_attributes = [
  "font-family: cursive",
  "color: magenta",
  "font-size: 20px",
  "font-weight: bold",
  "position: relative",
];

let max_height_element_attributes = [
  "font-family: cursive",
  "color: darkorange",
  "font-size: 20px",
  "font-weight: bold",
  "position: relative",
];

let horizontal_range_element_attributes = [
  "font-family: cursive",
  "color: purple",
  "font-size: 20px",
  "font-weight: bold",
  "position: relative",
];

let flight_time_element_attributes = [
  "font-family: cursive",
  "color: yellowgreen",
  "font-size: 20px",
  "font-weight: bold",
  "position: relative",
];

let canvas_parent = "projectile_simulation";
let canvasSize = [1360, 700];

let body_radius = 15;

let element_height_anchor = 30,
  element_distance = 30;

let input_field_height_anchor = 30,
  input_field_distance = 60;

let button_height_anchor = 320,
  button_distance = 50;

let text_size = 24;

let record_checkbox,
  record_input_field,
  record_time,
  recording_enabled = false;

let frame_count;
let capturer;
let frame_rate = 60;
let body;
let body_height, height_input_field, height_text;
let angle, angle_input_field, angle_text;
let initial_velocity, initial_velocity_input_field, initial_velocity_text;
let gravity, gravity_input_field, gravity_text;
let img;
let flight_time;
let horizontal_range, horizontal_range_input_field, horizontal_range_text;
let max_height, max_height_input_field, max_height_text;
