// Application Controller module

define(["emitter", "vector", "field"], function(Emitter, Vector, Field) {
  var controller = {
    'canvas': undefined,
    'ctx': undefined,
    'centerX': undefined,
    'centerY': undefined,
    'emitters': [],
    'drawQueue': [],  // separate, store, queue each module's draw function so we can run them each frame
    'updateQueue': [],  // separate the data and view queues (cuz MVC is cool and all?)
    'fields': [],
    'initEmitters': function() {
      var e = new Emitter(this.canvas, this.ctx, this.fields, new Vector(this.centerX, this.centerY), Vector.fromAngle(0, 2), Math.PI);
      this.emitters.push(e);
      this.drawQueue.push(e.draw.bind(e));
      this.updateQueue.push(e.update.bind(e));
    },
    'initFields': function() {
      var f = new Field(this.ctx, new Vector(this.centerX - 100, this.centerY - 100), 900);
      this.fields.push(f);
      this.drawQueue.push(f.draw.bind(f));
    },
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
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      this.centerX = this.canvas.width/2;
      this.centerY = this.canvas.height/2;

      this.ctx = this.canvas.getContext('2d');


      // init particle system
      this.initEmitters();
      this.initFields();

      // start animation loop
      this.animate();
    }
  };

  return controller;
});
