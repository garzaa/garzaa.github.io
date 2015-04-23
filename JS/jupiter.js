var music = new Audio("sound/1-1.mp3"); //    1/1 is such a good song god damn
//loops at end
music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
//music controls
music.play();
$("#play").click(function () {
    music.play();
})

$("#pause").click(function () {
    music.pause();
})
//start playing music on start
