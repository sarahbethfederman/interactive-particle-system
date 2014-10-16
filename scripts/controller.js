define(["emitter", "vector"], function(Emitter, Vector) {

  // App Controller Module

  var controller = {
    'canvas': undefined,
    'ctx': undefined,
    'emitters': [],
    'drawQueue': [],
    'updateQueue': [],
    'update': function() {
      this.updateQueue.forEach(function(update) {
        update();
      });
    },
    'draw': function() {
      this.drawQueue.forEach(function(draw) {
        draw();
      });
    },
    'animate': function () {
      // Clear the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Update values
      this.update();

      // Render to canvas
      this.draw();

      // Loop
      window.requestAnimationFrame(this.animate.bind(this));
    },
    'init': function() {
      console.log("controller inited");

      // hook up DOM elements
      this.canvas = document.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');


      // init emitters

      // Add one emitter located at '{x: 100, y: 230}' from the origin (top left)
      // that emits at a velocity of '2' shooting out from the right (angle '0')
      var e = new Emitter(this.ctx, new Vector(100, 230), Vector.fromAngle(0, 2))
      this.emitters.push(e);
      this.drawQueue.push(e.draw.bind(e));
      this.updateQueue.push(e.update.bind(e));

      // start animation loop
      this.animate();
    }
  };

  return controller;
});
