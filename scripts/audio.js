"use strict";

define(['field'], function(field) {
  var audio = {
    'sampleNum': 256,
    'sound': 'assets/written-emotions.mp3',
    'audioElement': undefined,
    'ctx': undefined,
    'data': undefined,
    'createNodes': function () {
        // most of this is taken from the ICE!

        // creates the audio context and hooks up the nodes
        var audioCtx,
            analyserNode,
            sourceNode;

        // create new AudioContext
        audioCtx = new (window.AudioContext || window.webkitAudioContext);

        // create an analyser node
        analyserNode = audioCtx.createAnalyser();

        // fft stands for Fast Fourier Transform
        analyserNode.fftSize = this.sampleNum;

        // this is where we hook up the <audio> element to the analyserNode
        sourceNode = audioCtx.createMediaElementSource(this.audioElement);

        // this channel: source > AnalyserNode > Destination
        sourceNode.connect(analyserNode);
        analyserNode.connect(audioCtx.destination);

        // create a new array of 8-bit integers (0-255)
        this.data = new Uint8Array(this.sampleNum/2);

        return analyserNode;
    },
    'getAudioData': function() {
      // accessor method for getting current audio data in other modules

      return this.data;
    },
    'update': function() {
      // update the array with the frequency data

      this.analyserNode.getByteFrequencyData(this.data);

    },
    'getNumber': function() {
      var self = this;
      var total = 0;

      // add up all the values in the array
      for (var i = 0; i < self.data.length; i++) {
        total = total + self.data[i];
      }

      // then take the average
      total = total/255;

      total = total/5;

      return total;
    },
    'init': function(audioElement) {
      // get reference to <audio> element on page
      this.audioElement = audioElement;

      // hook up the web audio nodes!
      this.analyserNode = this.createNodes();
      this.analyserNode.getByteFrequencyData(this.data);

      // hook up the sound file to the audio element
      this.audioElement.src = this.sound;

      // play the sound
      this.audioElement.play();

      // start the getNumber
      this.getNumber();
    }
  }

  return audio;
});
