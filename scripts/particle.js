// Particle Module
// TO DO: add lifespan
"use strict";

define(["vector"], function(Vector) {

  var Particle = function () {
    function Particle(point, velocity, acceleration) {
      this.position = point || new Vector(0, 0);
      this.velocity = velocity || new Vector(0, 0);
      this.acceleration = acceleration || new Vector(0, 0);
      this.drawColor = 'BLUE';
      this.frameCount = 20;
      this.color = [];
    }

    Particle.prototype.move = function () {
      this.frameCount++;
      if (this.frameCount % 255 == 0) {
        this.frameCount = 150;
      }

      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);


      // change the color
      this.drawColor = 'hsl('+ this.frameCount + ', 100%, 50%)';
    };

    Particle.prototype.submitToFields = function (fields) {
      // starting acceleration this frame
      var totalAccelerationX = 0;
      var totalAccelerationY = 0;

      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];

        // find the distance between the particle and the field

        var vectorX = field.position.x - this.position.x;
        var vectorY = field.position.y - this.position.y;


        // calculate the force
        var force = field.mass / Math.pow(vectorX*vectorX+vectorY*vectorY, 1.5);

        // add to the total acceleration the force adjusted by distance
        totalAccelerationX += vectorX * force;
        totalAccelerationY += vectorY * force;
      }

      // update the particle's acceleration
      this.acceleration = new Vector(totalAccelerationX, totalAccelerationY);
    }

    return Particle;
  }();

  return Particle;
});
