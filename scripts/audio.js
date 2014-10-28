define(function() {
  var audio = {
    'sampleNum': 256,
    'sound': 'assets/written-emotions.mp3',
    'audioElement': undefined,
    'ctx': undefined,
    'data': undefined,
    'createNodes': function () {
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

        // connect source node directly to speakers (destination) so we can hear the unaltered source
        // Source > Destination
        sourceNode.connect(audioCtx.destination);

        // this channel: source > delayNode > AnalyserNode > Destination
        sourceNode.connect(analyserNode);
        analyserNode.connect(audioCtx.destination);

        return analyserNode;
    },
    'update': function() {
      // create a new array of 8-bit integers (0-255)
      this.data = new Uint8Array(this.sampleNum/2);

      // populate the array with the frequency data
      // notice these arrays can be passed "by reference"
      this.analyserNode.getByteFrequencyData(this.data);
    },
    'init': function(audioElement) {
      // get reference to <audio> element on page
      this.audioElement = audioElement;
      this.analyserNode = this.createNodes();

      // hook up the sound file to the audio element
      this.audioElement.src = this.sound;

      //play the sound
      this.audioElement.play();
    }
  }

  return audio;
});
