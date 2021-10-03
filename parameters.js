// Contains all the necessary utility function and variables like button making, label making, ect.
let run_button_attributes = [
  "padding: 5px 5px",
  "font-size: 16px",
  "border-radius: 10px",
  "box-shadow: 0 5px 10px 0 rgba(0,0,0,0.2), 0 5px 15px 0 rgba(0,0,0,0.19)",
  "border: 3px solid rgb(0, 255, 0)",
];

let reset_obj_button_attributes = [
  "padding: 5px 5px",
  "font-size: 16px",
  "border-radius: 10px",
  "box-shadow: 0 5px 10px 0 rgba(0,0,0,0.2), 0 5px 15px 0 rgba(0,0,0,0.19)",
  "border: 3px solid rgb(250, 200, 0)",
];

let reset_disp_button_attributes = [
  "padding: 5px 5px",
  "font-size: 16px",
  "border-radius: 10px",
  "box-shadow: 0 5px 10px 0 rgba(0,0,0,0.2), 0 5px 15px 0 rgba(0,0,0,0.19)",
  "border: 3px solid rgb(255, 0, 0)",
];

let input_field_label_height_anchor = 20,
  input_field_height_anchor = 45;

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
