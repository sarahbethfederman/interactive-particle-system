// Application Controller module
"use strict";

define(["emitter", "vector", "field"], function(Emitter, Vector, Field) {
  var controller = {
    'canvas': undefined,
    'ctx': undefined,
    'centerX': undefined,
    'centerY': undefined,
    'emitters': [],
    'drawQueue': [],  // separate, store, queue each module's draw function so we can run them each frame
    'updateQueue': [],  // separate the data and view queues (cuz MVC is cool and all)
    'fields': [],
    'initEmitters': function() {
      var e = new Emitter(this.canvas, this.ctx, this.fields, new Vector(this.centerX, this.centerY), Vector.fromAngle(0, 2), Math.PI);
      this.emitters.push(e);
      this.drawQueue.push(e.draw.bind(e));
      this.updateQueue.push(e.update.bind(e));
    },
    'initFields': function() {
      // var f = new Field(this.ctx, new Vector(this.centerX + 40, this.centerY + 40), -20);
      // this.fields.push(f);
      // this.drawQueue.push(f.draw.bind(f));
      var f = new Field(this.ctx, new Vector(this.centerX + this.centerX/2, this.centerY), 900);
      this.fields.push(f);
      this.drawQueue.push(f.draw.bind(f));

      f = new Field(this.ctx, new Vector(this.centerX - this.centerX/2, this.centerY), 900);
      this.fields.push(f);
      this.drawQueue.push(f.draw.bind(f));

    },
    'update': function() {
      // run each module's update function, every frame
      // update functions control data
      this.updateQueue.forEach(function(update) {
        update();
      });
    },
    'draw': function() {
      // run each module's draw function, every frame
      // draw functions render to canvas (no controller logic)
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

      // init event handlers

      // start animation loop
      this.animate();
    }
  };

  return controller;
});
