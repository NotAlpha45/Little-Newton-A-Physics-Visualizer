function element_maker(parent, header_size, text, pos, element_attributes) {
  element = createElement(header_size, text);
  element.parent(parent);
  element.position(pos[0], pos[1]);
  // element.style("font-family: cursive");
  element_attributes.forEach(function (attribute) {
    element.style(attribute);
  });
}

function input_field_maker(
  parent,
  size,
  default_val,
  pos,
  input_field_attributes
) {
  field = createInput(default_val);
  field.parent(parent);
  field.size(size);
  field.position(pos[0], pos[1]);

  input_field_attributes.forEach(function (attribute) {
    field.style(attribute);
  });

  return field;
}

function button_maker(parent, pos, label, func, style_attributes) {
  button = createButton(label);
  button.position(pos[0], pos[1]);

  // Will apply all the attributes mentioned in the style_attributes list accordingly.
  style_attributes.forEach(function (attribute) {
    button.style(attribute);
  });

  button.mousePressed(func);
  button.parent(parent);
}

function text_maker(txt, position, size) {
  textSize(size);
  // The same color as in the html.
  fill("yellowgreen");
  strokeWeight(0);
  text(txt, position[0], position[1]);
}

function angle_input_maker(element_pos, input_field_pos, default_val) {
  element_maker(
    canvas_parent,
    "h3",
    "📐 Angle (θ): ",
    element_pos,
    angle_element_attributes
  );
  angle_input_field = input_field_maker(
    canvas_parent,
    50,
    default_val,
    input_field_pos,
    input_field_attributes
  );
}

function gravity_input_maker(element_pos, input_field_pos, default_val) {
  element_maker(
    canvas_parent,
    "h3",
    "⏬ Gravity (g):",
    element_pos,
    gravity_element_attributes
  );
  gravity_input_field = input_field_maker(
    canvas_parent,
    50,
    default_val,
    input_field_pos,
    input_field_attributes
  );
}

function length_input_maker(element_pos, input_field_pos, default_val) {
  element_maker(
    canvas_parent,
    "h3",
    "📏 Length (l):",
    element_pos,
    length_element_attributes
  );
  length_input_field = input_field_maker(
    canvas_parent,
    50,
    default_val,
    input_field_pos,
    input_field_attributes
  );
}
