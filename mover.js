class Mover {
  constructor(x, y, radius) {
    this.position = createVector(x, y);
    this.radius = radius;
    this.velocity = createVector(0, 0);
    this.gravity = createVector(0, 1);
    // Note, damping must be between 0 and 1 and be negative
    // The higher the friction, the more friction will be simulated.
    this.damping = -0.7;
    this.friction = 2;

    // Previous position of the object. This will help us in drawing trails.
    this.previous_position = createVector(x, y);
  }

  // Sets the hight of the object from the ground.
  setHeight(value) {
    this.position.y = height - this.radius - value;
    this.previous_position.y = this.position.y;
  }

  // Set the initial velocity and the angle of that velocity.
  setVelocity(value, angle) {
    this.velocity.x = value * Math.cos(angle);
    //Since velocity is facing upwards
    this.velocity.y = -value * Math.sin(angle);
  }

  setGravity(value) {
    this.gravity.y = value;
  }

  applyFriction() {
    if (Math.abs(this.velocity.x) <= this.friction) {
      this.velocity.x = 0;
      return;
    }
    if (this.velocity.x > 0) {
      this.velocity.x -= this.friction;
    } else if (this.velocity.x < 0) {
      this.velocity.x += this.friction;
    }
  }

  // Checks if object has hit the boundaries and then implements reaction accordingly
  checkBound() {
    // If the object is on the ground.
    if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= this.damping;
      this.applyFriction();
      // this.velocity.x *= this.damping;
    } else if (this.position.y < this.radius) {
      this.position.y = this.radius;
      this.velocity.y *= this.damping;
      // this.velocity.x *= this.damping;
    }

    if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= this.damping;
    } else if (this.position.x < this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= this.damping;
    }
  }

  // Updates all the acting forces
  update() {
    this.velocity.add(this.gravity);
    this.position.add(this.velocity);
  }

  // Draws the trail of the object.
  draw_trail(buffer) {
    buffer.stroke(0);

    // Draws a line on the buffer screen from the previous position to the current position
    // which acts like a trail.
    if (frameCount > 2) {
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

  //Displays the object, which is an ellipse
  display() {
    noStroke();
    fill(255, 100, 100);
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }
}
