let drawing_canvas, c;

let r = 4;

let y;

let am, pe, ph;
let amf, pef, phf;

let am2, pe2, ph2;
let amf2, pef2, phf2;

let start = false;

let input_field_height_anchor = 355,
  input_field_distance = 40,
  input_field_seperation_distance = 80;

let text_height_anchor = 50;
let text_distance = 40,
  text_seperation_distance = 80;

let button_height_anchor = 640;
let button_distance = 50;

let frame_count = 0;
let capturer;

let record_checkbox,
  record_input_field,
  record_time,
  recording_enabled = false;

let frame_rate = 60;

let record_checkbox_height_anchor = 240;

let input_field_attributes = [
  "height: 30px",
  "width: 80px",
  "border-radius: 10px",
  "border: 3px solid teal",
  "font-size: 20px",
  "font-weight: bold",
];

let input_field_attributes2 = [
  "height: 30px",
  "width: 80px",
  "border-radius: 10px",
  "border: 3px solid maroon",
  "font-size: 20px",
  "font-weight: bold",
];

let run_button_attributes = [
  "padding: 3px 3px",
  "font-size: 18px",
  "border-radius: 10px",
  "box-shadow: 0 5px 10px 0 rgba(0,0,0,0.2), 0 5px 15px 0 rgba(0,0,0,0.19)",
  "border: 3px solid rgb(0, 255, 0)",
  "text-align: center",
  "font-family: cursive",
  "font-weight: bold",
  "width: 6pc",
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
