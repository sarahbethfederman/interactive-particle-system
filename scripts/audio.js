define(function() {
  var audio = {
    'sample_num': 256,
    'sound': 'assets/written-emotions.mp3',
    'audioElement': undefined,
    'ctx': undefined,
    'play': function () {
        var audioCtx,
            analyserNode,
            sourceNode;

        // create new AudioContext
        audioCtx = new (window.AudioContext || window.webkitAudioContext);

        // create an analyser node
        analyserNode = audioCtx.createAnalyser();

        // fft stands for Fast Fourier Transform
        analyserNode.fftSize = this.sample_num;

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

    },
    'init': function(audioElement) {
      console.log(audioElement);
      this.play();
      // get reference to <audio> element on page
      this.audioElement = audioElement;
      this.audioElement.src = this.sound;
      this.audioElement.play();

      // call our helper function and get an analyser node
    }
  } // end audio

  return audio;
});
