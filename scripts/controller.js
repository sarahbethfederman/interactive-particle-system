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
      var e = new Emitter(this, new Vector(this.centerX, this.centerY), Vector.fromAngle(0, 2), Math.PI);

      this.addEmitter(e);
    },
    'initFields': function() {
      // Create the Fields
      var f = new Field(this.ctx, new Vector(this.centerX + this.centerX/2, this.centerY), 600);
      this.addField(f);

      f = new Field(this.ctx, new Vector(this.centerX - this.centerX/2, this.centerY), 600);
      this.addField(f);
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
        self.addField(f);
      });

      // ON A RIGHT CLICK, ADD AN EMITTER
      this.canvas.addEventListener("contextmenu", function(e) {
        e.preventDefault();

        var mouse = utils.getMouse(this);
        var e = new Emitter(self, new Vector(mouse.x, mouse.y),Vector.fromAngle(Math.random(), Math.random()), utils.getRandom(0, .5));
        self.addEmitter(e);

        return false;
      });

      // HOOK UP THE MAX EMITTERS SELECT
      document.querySelector('select[name="max-emitters"]').onchange = function() {
        self.maxEmitters = this.value;

        // if it goes over, delete all the extras
        if (self.emitters.length > self.maxEmitters) {
          for (var i = 0; i < (self.emitters.length - self.maxEmitters); i++) {
            // set the update&draw to null
            self.updateQueue[self.emitters[i].updateIndex] = null;
            self.drawQueue[self.emitters[i].drawIndex] = null;

            // shift it out of the emitters
            self.emitters.shift();
          }
        }
      }

      // HOOK UP THE MAX FIELDS SELECT
      document.querySelector('select[name="max-fields"]').onchange = function() {
        self.maxFields = this.value;

        // if it goes over, delete all of the extras
        if (self.fields.length > self.maxFields) {
          for (var i=0; i < (self.fields.length - self.maxFields); i++) {
            // set the draw to null
            self.drawQueue[self.fields[i].drawIndex] = null;

            // shift it out of the fields storage
            self.fields.shift();
          }
        }
      }

      // HOOK UP THE MAX PARTICLE SLIDE EFFECTOR
      document.querySelector('#max-particles').onchange = function() {
        var slider = this;

        // change the emission rate
        if (slider.value >= 1000 && slider.value < 2500) {
          var rate = 1;
        }
        else if (slider.value >= 2500 && slider.value < 4000) {
          var rate = 1;
        }
        else if (slider.value >= 4000 && slider.value < 6000) {
          var rate = 2;
        }
        else if (slider.value >= 6000 && slider.value <= 8000) {
          var rate = 3;
        }

        // for each emitter, change the particle number and pass in the value
        self.emitters.forEach(function(el) {
          el.changeParticleNum(slider.value, rate);
        });
      }

      // HOOK UP THE CLEAR FIELDS BUTTON
      document.querySelector('#clear-fields').onclick = function(e) {
        e.preventDefault();

        // for each field, delete its draw
        for (var i = 0; i < self.fields.length; i++) {
          self.drawQueue[self.fields[i].drawIndex] = null;
        }
        // clear the fields array
        self.fields = [];
      }

      // HOOK UP THE CLEAR EMITTERS BUTTON
      document.querySelector('#clear-emitters').onclick = function(e) {
        e.preventDefault();

        // for each emitter
        for (var i = 0; i < self.emitters.length; i++) {
          // remove its fns from the queue
          self.updateQueue[self.emitters[i].updateIndex] = null;
          self.drawQueue[self.emitters[i].drawIndex] = null;
        }

        // clear the emitters array
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
    'addField': function(field) {
      this.drawQueue.push(field.draw.bind(field));

      // save the indices in update array
      field.drawIndex = this.drawQueue.length - 1;

      // push it to the fields storage
      this.fields.push(field);

      // if it goes over, delete the oldest one
      if (this.fields.length > this.maxFields) {
        // set the draw to null
        this.drawQueue[this.fields[0].drawIndex] = null;

        // shift it out of the fields storage
        this.fields.shift();
      }
    },
    'getFields': function() {
      // accessor method to update field reference
      return this.fields;
    },
    'addEmitter': function(emit) {
      this.drawQueue.push(emit.draw.bind(emit));
      this.updateQueue.push(emit.update.bind(emit));

      // save the indices in update array
      emit.drawIndex = this.drawQueue.length - 1;
      console.log(emit.drawIndex);

      emit.updateIndex = this.updateQueue.length - 1;
      console.log(emit.updateIndex);

      // push it to the emitters storage
      this.emitters.push(emit);

      // if it goes over, delete the oldest one
      if (this.emitters.length > this.maxEmitters) {
        // set the update&draw to null
        this.updateQueue[this.emitters[0].updateIndex] = null;
        this.drawQueue[this.emitters[0].drawIndex] = null;

        // shift it out of the emitters
        this.emitters.shift();
      }

      console.log(emit);
    },
    'update': function() {
      // run each module's update function, every frame
      // update functions control data
      this.updateQueue.forEach(function(update) {
        if (update) {
          update();
        }
      });
    },
    'draw': function() {
      // run each module's draw function, every frame
      // draw functions render to canvas (seperate from update logic)
      this.drawQueue.forEach(function(draw) {
        if (draw) {
          draw();
        }
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
