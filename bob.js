class Bob {
  constructor(length, angle, radius, img) {
    this.length = length;
    this.radius = radius;
    this.angle = angle;
    this.angular_velocity = 0;
    this.angular_acceleration = 0;
    // Damping must be between 1 and 0.
    // 1 -> No damping
    // 0 -> Stop entirely.
    this.damping = 1;
    this.gravity = 0.98;
    // origin is the attaching position of the string.
    this.origin = createVector(width / 2 - 100, 0);
    // Position is the position of the bob.
    this.position = createVector();

    // Previous position is the previous position of the bob.
    // This will help us in drawing trail.
    this.previous_position = createVector();

    this.img = img;
  }

  set_angle(value) {
    this.angle = value;
  }

  set_gravity(value) {
    this.gravity = value;
  }

  set_length(value) {
    this.length = value;
  }

  set_damping(value) {
    this.damping = value;
  }

  apply_damping() {
    this.angular_velocity *= this.damping;
  }

  // Updates all the acting forces
  update() {
    //Pendulum moves according to the angular acceleration and velocity which again
    // displaces the angle.
    this.angular_acceleration =
      (-1 / this.length) * this.gravity * Math.sin(this.angle);
    this.angular_velocity += this.angular_acceleration;

    this.apply_damping();

    // Setting the position according to the angle.
    this.position.set(
      this.length * sin(this.angle),
      this.length * cos(this.angle)
    );
    this.angle += this.angular_velocity;

    // Add the origin with the position to keep the length from the origin, the same
    // everytime.
    this.position.add(this.origin);
  }

  // Draws the trail of the object.
  draw_trail(buffer) {
    buffer.stroke(0);

    // frameCount is anothe builtin attribute that keeps track of frames.
    // Drawing from the second frame ensures that no artifacts are drawn.
    if (frameCount > 2) {
      // Draws a line on the buffer screen from the previous position to the current position
      // which acts like a trail.
      buffer.line(
        this.previous_position.x,
        this.previous_position.y,
        this.position.x,
        this.position.y
      );
    }
    this.previous_position.x = this.position.x;
    this.previous_position.y = this.position.y;
  }

  //Displays the object, which is an ellipse connected by a line;
  display() {
    strokeWeight(3);
    line(this.position.x, this.position.y, this.origin.x, this.origin.y);
    this.img.resize(this.radius * 2, this.radius * 2);
    translate(-this.radius, 0);
    image(img, this.position.x, this.position.y);
    stroke(0);
  }
}
