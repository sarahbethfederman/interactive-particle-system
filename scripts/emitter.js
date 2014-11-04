// Emitter Module
"use strict";

define(["particle", "vector"], function (Particle, Vector) {

  var Emitter = function () {
    function Emitter(controller, point, velocity, spread) {
      this.position = point;  // Vector
      this.velocity = velocity;  // Vector
      this.spread = spread || Math.PI / 32;  // possible angles = velocity +/- spread
      this.drawColor = "#999";
      this.maxParticles = 2500;
      this.emissionRate = 1;
      this.particleSize = 2;
      this.controller = controller;
      this.particles = [];
      this.fields = controller.fields;
      this.ctx = controller.ctx;
      this.boundsX = controller.canvas.width;
      this.boundsY = controller.canvas.height;
    }

    Emitter.prototype.changeParticleNum = function(maxParticles, emissionRate) {
      // Change the max particles this emitter can emit
      this.maxParticles = maxParticles;
      // If provided, change the emission rate
      if (emissionRate) {
        this.emissionRate = emissionRate;
      }


      // if its too long, shorten the particle array
      if (this.particles.length > maxParticles) {
        // shorten by the difference between current and max
        for (var i = 0; i < (this.particles.length - maxParticles); i++) {
          this.particles.shift();
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
          self = this,
          pos;

      for (var i = 0; i < this.particles.length; i++) {
        particle = this.particles[i];
        pos = particle.position;

        // If we're out of bounds, drop this particle and move on to the next
        if (pos.x < 0 || pos.x > this.boundsX || pos.y < 0 || pos.y > this.boundsY) {
          continue;
        }

        // Update velocities and accelerations to account for the fields
        particle.submitToFields(self.controller.getFields());

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
        for (var i = 0; i < 2000; i++) {
          this.particles.shift();
        }
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

        // Draw a square at our position [positionSize] wide and tall
        this.ctx.fillRect(position.x, position.y, this.particleSize, this.particleSize);
      }
    };

    return Emitter;
  }();

  return Emitter;
});
