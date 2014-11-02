// Emitter Module
"use strict";

define(["particle", "vector"], function (Particle, Vector) {

  var Emitter = function () {
    function Emitter(canvas, ctx, fields, point, velocity, spread) {
      this.position = point;  // Vector
      this.velocity = velocity;  // Vector
      this.spread = spread || Math.PI / 32;  // possible angles = velocity +/- spread
      this.drawColor = "#999";
      this.maxParticles = 15000;
      this.emissionRate = 2;
      this.particleSize = 2;
      this.particles = [];
      this.fields = fields;
      this.ctx = ctx;
      this.boundsX = canvas.width;
      this.boundsY = canvas.height;
    }

    Emitter.prototype.changeParticleNum = function(maxParticles) {
      // Change the max particles this emitter can emit
      this.maxParticles = maxParticles;

      // shorten the particle array
      if (this.particles.length > maxParticles) {
        for (var i = 0; i < (this.particles.length - maxParticles); i++) {
          this.particles.unshift();
        }
      }
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
    };

    Emitter.prototype.plotParticles = function() {
      var currentParticles = [],
          particle,
          pos;

      for (var i = 0; i < this.particles.length; i++) {
        particle = this.particles[i];
        pos = particle.position;


        // If we're out of bounds, drop this particle and move on to the next
        if (pos.x < 0 || pos.x > this.boundsX || pos.y < 0 || pos.y > this.boundsY) {
          continue;
        }

        // Update velocities and accelerations to account for the fields
        particle.submitToFields(this.fields);

        // Move our particles
        particle.move();

        // Add this particle to the list of current particles
        currentParticles.push(particle);
      }

      // Update our global particles, clearing room for old particles to be collected
      this.particles = currentParticles;
    };


    Emitter.prototype.update = function() {
      // ADD PARTICLES
      // if we're at our max, stop emitting.
      if (this.particles.length > this.maxParticles) {
        return;
      }

      // for [emissionRate], emit a particle
      for (var j = 0; j < this.emissionRate; j++) {
        this.particles.push(this.emitParticle());
      }

      this.plotParticles();
    };

    Emitter.prototype.draw = function() {
      // For each particle
      for (var i = 0; i < this.particles.length; i++) {
        var position = this.particles[i].position;
        // Set the color of our particles
        this.ctx.fillStyle = this.particles[i].drawColor;
      //  console.log(this.particles[i].drawColor);
        // Draw a square at our position [positionSize] wide and tall
        this.ctx.fillRect(position.x, position.y, this.particleSize, this.particleSize);
      }
    };

    return Emitter;
  }();

  return Emitter;
});
