// Application Controller module
"use strict";

define(["emitter", "vector", "field", "utils", "audio"], function(Emitter, Vector, Field, utils, audio) {
  var controller = {
    'canvas': undefined,
    'ctx': undefined,
    'centerX': undefined,   // center of the canvas
    'centerY': undefined,
    'emitters': [],
    'drawQueue': [],  // separate, store, queue each module's draw function so we can run them each frame
    'updateQueue': [],  // separate the data and view queues (cuz MVC is cool and all)
    'fields': [],
    'maxFields': 3,
    'initEmitters': function() {
      var e = new Emitter(this.canvas, this.ctx, this.fields, new Vector(this.centerX, this.centerY), Vector.fromAngle(0, 2), Math.PI);
      this.emitters.push(e);
      this.drawQueue.push(e.draw.bind(e));
      this.updateQueue.push(e.update.bind(e));
    },
    'initFields': function() {
      var f = new Field(this.ctx, new Vector(this.centerX + this.centerX/2, this.centerY), 600);
      this.fields.push(f);
      this.drawQueue.push(f.draw.bind(f));

      f = new Field(this.ctx, new Vector(this.centerX - this.centerX/2, this.centerY), 600);
      this.fields.push(f);
      this.drawQueue.push(f.draw.bind(f));

    },
    'initEvents': function() {
      var self = this;
      var clickCount = 0;

      // on canvas click, add a field
      this.canvas.addEventListener("click", function() {

        // if there is already a field, then delete it
        if (self.fields.length >= self.maxFields) {
          self.fields.pop();
          self.drawQueue.pop();
        }

        // increment the count
        clickCount++;
        var mass;

        // if even click count, repel
        if (clickCount % 2 === 0) {
          mass = -100;
        }
        else {
          // else, attract
          mass = 100;
        }

        // make a field at mouse position
        var mouse = utils.getMouse(this);
        var f = new Field(self.ctx, new Vector(mouse.x, mouse.y), mass);
        self.fields.push(f);
        self.drawQueue.push(f.draw.bind(f));
      });

      // on a right click, add an emitter
      this.canvas.addEventListener("oncontextmenu", function() {
        console.log("right click");
        clickCount++;
        var mouse = utils.getMouse(this);
        var e = new Emitter(self.canvas, self.ctx, self.fields, new Vector(mouse.x, mouse.y),Vector.fromAngle(0, 2), Math.PI);
        self.emitters.push(e);
        self.drawQueue.push(e.draw.bind(e));
        self.updateQueue.push(e.update.bind(e));

        return false;
      });
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

      // init audio
      audio.init(document.querySelector('audio'));
      this.updateQueue.push(audio.update.bind(audio));

      // init particle system
      this.initEmitters();
      this.initFields();

      // init event handlers
      this.initEvents();

      // start animation loop
      this.animate();
    }
  };

  return controller;
});
