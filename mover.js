class Mover {
  constructor(x, y, radius, img) {
    this.position = createVector(x, y);
    this.radius = radius;
    this.velocity = createVector(0, 0);
    this.gravity = createVector(0, 1);
    // Note, damping must be between 0 and 1 and be negative
    // The higher the friction, the more friction will be simulated.
    this.damping = -0.7;
    this.friction = 2;
    this.img = img;

    // Previous position of the object. This will help us in drawing trails.
    this.previous_position = createVector(x, y);
    this.line_color = createVector(0, 0, 0);
  }

  // Sets line color of the object to a random color on each call.
  set_color() {
    this.line_color.x = Math.floor(Math.random() * 154) + 100;
    this.line_color.y = Math.floor(Math.random() * 154) + 100;
    this.line_color.z = Math.floor(Math.random() * 154) + 100;
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
    buffer.stroke(this.line_color.x, this.line_color.y, this.line_color.z);
    buffer.strokeWeight(3);

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

  //Displays the object, which is an apple image
  display() {
    this.img.resize(this.radius * 2, this.radius * 2);
    translate(-this.radius, -this.radius);
    image(img, this.position.x, this.position.y);
  }
}
