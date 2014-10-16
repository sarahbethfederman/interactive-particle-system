define(["controller", "utils"], function(controller, utils) {

  // Particle Module

  var Particle = function () {

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
      if (this.age >= this.lifeSpan) {
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

    Particle.prototype.render = function (ctx) {

    }

    return Particle;
  }();

  return Particle;
});
