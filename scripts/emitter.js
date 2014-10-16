define(["particle", "controller"], function (Particle, controller) {

  var Emitter = (function () {
    function Emitter(args) {
      this.x = args.x;
      this.y = args.y;
      this.particles = [];
      this.particleNum = args.particleNum;
    }

    Emitter.prototype.createParticles = function() {
      var p;

      for (var i = 0; i < this.particleNum; i++) {
        p = new Particle();
        this.particles.push(p);
        controller.updateQueue.push(p.update);
      }

    }

    Emitter.prototype.draw = function() {

    }

    Emitter.prototype.update = function() {

    }

    return Emitter;
  })();

  return Emitter;
});
