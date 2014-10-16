define(["emitter", "particle", "utils"], function(Emitter, Particle, utils) {

  // controller
  controller = {
    'canvas': undefined,
    'ctx': undefined,
    'emitters': [],
    'renderQueue': [],
    'updateQueue': [],
    'update': function() {
      this.updateQueue.forEach(function(update) {
        update();
        console.log(update);
      });
    },
    'render': function() {
      this.renderQueue.forEach(function(render) {
        render(this.ctx);
        console.log(render);
      });
    },
    'animate': function () {
      // Loop
      requestAnimationFrame(this.animate.bind(this));

      // Update values
      this.update();

      // Render to canvas
      this.render();
    },
    'init': function() {
      console.log("controller inited");
      console.log(Emitter);

      // hook up DOM elements
      this.canvas = document.querySelector('canvas');
      this.ctx = this.canvas.getContext('2D');

      // start animation loop
      this.animate();
    }
  };

  return controller;

});
