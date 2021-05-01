class Mover {
  constructor(x, y, radius) {
    this.position = createVector(x, y);
    this.radius = radius;
    this.velocity = createVector(10, 10);
    this.gravity = createVector(0, 1);
    this.damping = -1;
  }

  // Checks if object has hit the boundaries and then implements reaction accordingly
  checkBound() {
    if (this.position.y >= height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= this.damping;
    }
    if (this.position.x >= width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= this.damping;
    } else if (this.position.x <= this.radius) {
      this.position.x =  this.radius;
      this.velocity.x *= this.damping;
    }
  }

  // Updates all the acting forces
  update() {
    this.velocity.add(this.gravity);
    this.position.add(this.velocity);
  }

  //Displays the object
  display() {
    stroke(25);
    strokeWeight(2);
    fill(255, 100, 100);
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
  }
}
