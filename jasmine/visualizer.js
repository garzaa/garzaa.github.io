//drawing the inital state
var canvas = document.getElementById("visualizer");
var ctx = canvas.getContext("2d");

var audioSrc;
var analyser;
var bufferLength
var dataArray

//drawing test
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 500, 500);

//this hooks into play()
function connectAudio(song) {
	//clearing old stuff
	if (currentInterval)
		clearInterval(currentInterval);
	song.crossOrigin = "anonymous";
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	audioSrc = audioCtx.createMediaElementSource(song);
	analyser = audioCtx.createAnalyser();
	
	console.log("Audio connected!")

	// we have to connect the MediaElementSource with the analyser 
	audioSrc.connect(analyser);
	// we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)

	// frequencyBinCount tells you how many values you'll receive from the analyser
	var frequencyData = new Uint8Array(analyser.frequencyBinCount);
 
	analyser.fftSize = 2048;
	bufferLength = analyser.frequencyBinCount;
	dataArray = new Uint8Array(bufferLength);
	analyser.getByteTimeDomainData(dataArray);


	var sampleAudioStream = function() {
        // This closure is where the magic happens. Because it gets called with setInterval below, it continuously samples the audio data
        // and updates the streamData and volume properties. This the SoundCouldAudioSource function can be passed to a visualization routine and 
        // continue to give real-time data on the audio stream.
        analyser.getByteFrequencyData(this.streamData);
        // calculate an overall volume value
        var total = 0;
        for (var i = 0; i < 80; i++) { // get the volume from the first 80 bins, else it gets too loud with treble
            total += this.streamData[i];
            var percent = (total / 80) * 100
            percent += "%"
			$("#trackbar").css("width", percent)
			
        }
        this.volume = total;
    };

	var currentInterval = setInterval(sampleAudioStream, 20); // 
    // public properties and methods
    this.volume = 0;
    this.streamData = new Uint8Array(128);
    var player = song;
    this.playStream = function() {
        player.play();
    }
    this.playStream();
}
 // This just means we will have 128 "bins" (always half the analyzer.fftsize value), each containing a number between 0 and 255. 

var draw = function() {
    // you can then access all the frequency and volume data
    // and use it to draw whatever you like on your canvas
    for(bin = 0; bin < audioSrc.streamData.length; bin ++) {
        // do something with each value. Here's a simple example
        var val = audioSrc.streamData[bin];
        var red = val;
        var green = 255 - val;
        var blue = val / 2; 
        ctx.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
        ctx.fillRect(bin * 2, 0, 2, 200);
        // use lines and shapes to draw to the canvas is various ways. Use your imagination!
    }
    requestAnimationFrame(draw);
};