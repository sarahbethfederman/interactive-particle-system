define(["vector"], function(Vector) {

  // Particle Module



  var Particle = function () {

    // function Particle (point, velocity, acceleration) {
    //   this.position = point || new Vector(0,0);
    //   this.velocity = velocity || new Vector(0,0);
    //   this.acceleration = acceleration || new Vector(0,0);
    // }
    //
    //
    // Particle.prototype.move = function() {
    //   // Add the current Acceleration to the current Velocity
    //   this.velocity.add(this.acceleration);
    //
    //   // Add our current Velocity to our position
    //   console.log(this.position.x);
    //   console.log(this.position.y);
    //   this.position.add(this.velocity);
    //
    // }
    //
    //
    // Particle.prototype.update = function() {
    //
    // }
    //
    // Particle.prototype.draw = function (ctx) {
    //
    // }
    function Particle(point, velocity, acceleration) {
      this.position = point || new Vector(0, 0);
      this.velocity = velocity || new Vector(0, 0);
      this.acceleration = acceleration || new Vector(0, 0);
    }

    Particle.prototype.move = function () {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
    };

    return Particle;
  }();

  return Particle;
});
