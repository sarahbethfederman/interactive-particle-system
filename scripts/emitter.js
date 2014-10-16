define(["particle", "controller"], function (Particle, controller) {

  // Emitter Module

  var Emitter = function () {
    function Emitter(args) {
      this.x = args.x;
      this.y = args.y;
      this.particles = [];
      this.particleNum = args.particleNum || 25;
    }

    Emitter.prototype.createParticles = function() {
      var p;

      for (var i = 0; i < this.particleNum; i++) {
        p = new Particle();
        this.particles.push(p);
        controller.updateQueue.push(p.update);
      }

    }

    Emitter.prototype.update = function() {

    }

    Emitter.prototype.render = function(ctx) {

    }

    return Emitter;
  }();

  return Emitter;
});
