define(["controller"], function(controller) {

  // Particle Module

  var Particle = (function () {

    function Particle (args) {
      this.x = args.x;
      this.y = args.y;
      this.speed = args.speed || 1;
      this.lifeSpan = args.lifeSpan;
      this.acceleration = args.acceleration || 0;
      this.direction = 0;
      this.isDead = false;
    }

    Particle.prototype.isDead = function () {
      if (this.lifeSpan > 0) {
        return false;
      }
      else {
        return true;
      }
    }

    Particle.prototype.applyForce = function(speed, direction, acceleration) {
      this.speed = speed;
      this.acceleration = acceleration;
      this.direction = direction;
    }

    Particle.prototype.update = function() {

    }

    Particle.prototype.display = function () {

    }

    return Particle;
  })();

  return Particle;
});
