class Bob {
  constructor(distance, angle, radius) {
    this.distance = distance;
    this.radius = radius;
    this.angle = angle;
    this.angular_velocity = 0;
    this.angular_acceleration = 0;
    // Damping must be between 1 and 0.
    // 1 -> No damping
    // 0 -> Stop entirely.
    this.damping = 1;
    this.gravity = 0.9;
    // origin is the attaching position of the string.
    this.origin = createVector(width / 2, 100);
    // Position is the position of the bob.
    this.position = createVector();

    // Previous position is the previous position of the bob.
    // This will help us in drawing trail.
    this.previous_position = createVector();
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
      (-1 / this.distance) * this.gravity * Math.sin(this.angle);
    this.angular_velocity += this.angular_acceleration;

    this.apply_damping();

    // Setting the position according to the angle.
    this.position.set(
      this.distance * sin(this.angle),
      this.distance * cos(this.angle)
    );
    this.angle += this.angular_velocity;

    // Add the origin with the position to keep the distance from the origin, the same
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
    noStroke();
    fill(255, 100, 100);
    ellipse(this.position.x, this.position.y, this.radius * 2);
    stroke(0);
    line(this.position.x, this.position.y, this.origin.x, this.origin.y);
  }
}
