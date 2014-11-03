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
    'maxEmitters': 2,
    'audioData': undefined,
    'initEmitters': function() {
      // Create the Particle Emitters
      var e = new Emitter(this.canvas, this.ctx, this.fields, new Vector(this.centerX, this.centerY), Vector.fromAngle(0, 2), Math.PI);

      this.emitters.push(e);                    // add it to our list
      this.drawQueue.push(e.draw.bind(e));      // add this emitter's draw function to the queue and bind itself to 'this'
      this.updateQueue.push(e.update.bind(e));  // add this emitter's update function to the queue
    },
    'initFields': function() {
      // Create the Fields
      var f = new Field(this.ctx, new Vector(this.centerX + this.centerX/2, this.centerY), 600);
      this.fields.push(f);
      this.drawQueue.push(f.draw.bind(f));

      f = new Field(this.ctx, new Vector(this.centerX - this.centerX/2, this.centerY), 600);
      this.fields.push(f);
      this.drawQueue.push(f.draw.bind(f));
    },
    'initAudio': function() {
      // init the audio
      audio.init(document.querySelector('audio'));

      // push audio's update function to the queue
      this.updateQueue.push(audio.update.bind(audio));

      // get the audio data
      this.audioData = audio.getAudioData();
    },
    'initEvents': function() {
      var self = this;
      var clickCount = 0;

      // ON CANVAS CLICK, ADD A FIELD
      this.canvas.addEventListener("click", function() {

        // if we are at our max field #
        if (self.fields.length > self.maxFields) {
          // delete the oldest one
          self.fields.shift();
          // and delete its draw method
          // FIX THIS
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

      // ON A RIGHT CLICK, ADD AN EMITTER
      this.canvas.addEventListener("contextmenu", function(e) {
        e.preventDefault();

        if (self.emitters.length < self.maxEmitters) {
          var mouse = utils.getMouse(this);
          var e = new Emitter(self.canvas, self.ctx, self.fields, new Vector(mouse.x, mouse.y),Vector.fromAngle(Math.random(), Math.random()), utils.getRandom(0, .5));
          self.emitters.push(e);
          self.drawQueue.push(e.draw.bind(e));
          self.updateQueue.push(e.update.bind(e));
        }

        return false;
      });

      // HOOK UP THE MAX EMITTERS SELECT
      document.querySelector('select[name="max-emitters"]').onchange = function() {
        self.maxEmitters = this.value;
        // TODO: delete the extras & remove its draw func!!
      }

      // HOOK UP THE MAX FIELDS SELECT
      document.querySelector('select[name="max-fields"]').onchange = function() {
        self.maxField = this.value;
        // TODO: delete the extras & remove its draw func!!
      }

      // HOOK UP THE MAX PARTICLE SLIDE EFFECTOR
      document.querySelector('#max-particles').onchange = function() {
        var slider = this;

        // change the emission rate
        if (slider.value >= 5000 && slider.value < 8000) {
          var rate = 1;
        }
        else if (slider.value >= 8000 && slider.value < 10000) {
          var rate = 2;
        }
        else if (slider.value >= 10000 && slider.value < 12000) {
          var rate = 3;
        }
        else if (slider.value >= 1200 && slider.value <= 15000) {
          var rate = 4;
        }

        // for each emitter, change the particle number and pass in the value
        self.emitters.forEach(function(el) {
          el.changeParticleNum(slider.value, rate);
        });
      }

      // HOOK UP THE CLEAR FIELDS BUTTON
      document.querySelector('#clear-fields').onclick = function(e) {
        e.preventDefault();

        // for each field
        for (var i = 0; i < self.fields.length; i++) {
          // remove it from the array
          self.fields.pop();
          // remove its draw function
          // TO DO!!
        }
      }
      document.querySelector('#clear-emitters').onclick = function(e) {
        e.preventDefault();

        // for each emitter
        for (var i = 0; i < self.emitters.length; i++) {
          // remove it from the array

          // remove its draw function
          // TO DO!!
          // remove its update function
          // TO DO!!
        }
        self.emitters = [];
      }

      document.querySelector('#reset').onclick = function(e) {
        // keep the page from refreshing!
        e.preventDefault();

        self.emitters = [];
        self.fields = [];
        self.drawQueue = [];
        self.updateQueue = [];
      }
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
      // console.log("controller inited");

      // HOOK UP DOM ELEMENTS
      this.canvas = document.querySelector('canvas');

      // make the canvas fullscreen
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      // get the center of the canvas
      this.centerX = this.canvas.width/2;
      this.centerY = this.canvas.height/2;

      this.ctx = this.canvas.getContext('2d');

      // INIT AUDIO
      this.initAudio();

      // INIT PARTICLE SYSTEM
      this.initEmitters();
      this.initFields();

      // START ANIMATION LOOP
      this.animate();

      // INIT EVENTS
      this.initEvents();
    }
  };

  return controller;
});
