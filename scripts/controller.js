define(["emitter", "particle", "utils"], function(Emitter, Particle) {

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
      });
    },
    'render': function() {
      this.renderQueue.forEach(function(render) {
        render();
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
    }
  };

  return controller;

});
