function element_maker(parent, header_size, text, pos) {
  element = createElement(header_size, text);
  element.parent(parent);
  element.position(pos[0], pos[1]);
}

function input_field_maker(parent, size, default_val, pos) {
  field = createInput(default_val);
  field.parent(parent);
  field.size(size);
  field.position(pos[0], pos[1]);
  return field;
}

function button_maker(parent, pos, label, func) {
  button = createButton(label);
  button.position(pos[0], pos[1]);
  button.mousePressed(func);
  button.parent(parent);
}

function text_maker(txt, position, size) {
  textSize(size);
  fill(0);
  strokeWeight(0);
  text(txt, position[0], position[1]);
}

function angle_input_maker() {
  element_maker(canvas_parent, "h3", "Angle (θ):", [width - 270, 5]);
  angle_input_field = input_field_maker(canvas_parent, 50, 30, [
    width - 180,
    30,
  ]);
}

function gravity_input_maker() {
  element_maker(canvas_parent, "h3", "Gravity (g):", [width - 285, 45]);
  g_input_field = input_field_maker(canvas_parent, 50, 9.8, [width - 180, 70]);
}

function length_input_maker() {
  element_maker(canvas_parent, "h3", "Length (l):", [width - 275, 85]);
  length_input_field = input_field_maker(canvas_parent, 50, 2, [
    width - 180,
    110,
  ]);
}
