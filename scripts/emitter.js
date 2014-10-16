// Emitter Module
// This tutorial helped a lot: http://html5hub.com/build-a-javascript-particle-system

define(["particle", "vector"], function (Particle, Vector) {

  var Emitter = function () {
    function Emitter(ctx, point, velocity, spread) {
      this.position = point;  // Vector
      this.velocity = velocity;  // Vector
      this.spread = spread || Math.PI / 32;  // possible angles = velocity +/- spread
      this.drawColor = "#999";
      this.maxParticles = 20000;
      this.emissionRate = 4;
      this.particleSize = 2;
      this.particles = [];
      this.ctx = ctx;
    }

    Emitter.prototype.emitParticle = function() {
      // Use an angle randomize over the spread so we have more of a "spray"
      var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);

      // The length of the emitter's velocity
      var length = this.velocity.getLength();

      // The emitter's position
      var position = new Vector(this.position.x, this.position.y);

      // New velocity based off of the calculated angle and magnitude
      var velocity = Vector.fromAngle(angle, length);

      // return a new Particle
      return new Particle(position, velocity);
    }


    Emitter.prototype.update = function() {
      var boundsX = 800;
      var boundsY = 800;
      var self = this;
      // ADD PARTICLES
      // if we're at our max, stop emitting.
      if (self.particles.length > self.maxParticles) {
        return;
      }



        // for [emissionRate], emit a particle
        for (var j = 0; j < self.emissionRate; j++) {
          self.particles.push(this.emitParticle());
        }



      // PLOT PARTICLES
      var currentParticles = [];

      for (var i = 0; i < this.particles.length; i++) {
        var particle = this.particles[i];
        var pos = particle.position;


        // If we're out of bounds, drop this particle and move on to the next
        if (pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY) {
          continue;
        }

        // Move our particles
        particle.move();

        // Add this particle to the list of current particles
        currentParticles.push(particle);
      }

      // Update our global particles, clearing room for old particles to be collected
      this.particles = currentParticles;
    }

    Emitter.prototype.draw = function() {

      // Set the color of our particles
      this.ctx.fillStyle = 'rgb(0,40,255)';

      // For each particle
      for (var i = 0; i < this.particles.length; i++) {
        var position = this.particles[i].position;

        // Draw a square at our position [positionSize] wide and tall
        this.ctx.fillRect(position.x, position.y, this.particleSize, this.particleSize);
      }
    }

    return Emitter;
  }();

  return Emitter;
});
