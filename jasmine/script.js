var currentSong;
var playing;
var firstClick = true;
var track = 0;
var imageToggled;
var timerUpdater;
var smoothTransition = true;
var cachedVolume;

document.head = document.head || document.getElementsByTagName('head')[0];

function changeFavicon(src) {
 var link = document.createElement('link'),
     oldLink = document.getElementById('dynamic-favicon');
 link.id = 'dynamic-favicon';
 link.rel = 'shortcut icon';
 link.href = src;
 if (oldLink) {
  document.head.removeChild(oldLink);
 }
 document.head.appendChild(link);
}

function play(song, update) {
    currentSong.pause();
    currentSong.currentTime = 0;
    currentSong = new Audio(song.audioPath);
    currentSong.play();
    if (firstClick) {
        firstClick = false;
    }

    clearInterval(timerUpdater);
    timerUpdater = setInterval(function() {
        updateTime(currentSong)
    }, 50);

    $("#playIcon").text("pause")
    firstClick = false;
    playing = true;
    track = songs.indexOf(song)

    addSongInfo(song)

    currentSong.onended = function() {
        next();
    }

    if (!update) {
        setAlbumArt(song.artPath);
    }
}

function addSongInfo(song) {
    $("#songinfo").html(
        "<span class='song-name'>" + song.name +
        "</span><br> <a target='_blank' href='" + song.link + "'>" +
        song.artist + "</a>"
    )

    document.title = song.name +  " - " + song.artist

    setBgArt(song.artPath);
    changeFavicon(song.artPath);
}

function setBgArt(imgPath) {
    //$("#bg-image").attr("src", imgPath);
    if (!imageToggled) {
        $("#new-bg").attr("src", imgPath);
        $("#new-bg").css("opacity", .2);
        $("#bg-image").css("opacity", 0);
    } else {
        $("#bg-image").attr("src", imgPath);
        $("#bg-image").css("opacity", .2);
        $("#new-bg").css("opacity", 0);        
    }
    imageToggled = !imageToggled;
}

$('body').keyup(function(e){
   if(e.keyCode == 32 || e.keyCode == 75){
       //space or k
       e.preventDefault();
       pause();
   } else if (e.keyCode == 39) {
       //right arrow
        e.preventDefault();
        next()
   } else if (e.keyCode == 37) {
       e.preventDefault();
       prev();
   } else if (e.keyCode == 74) {
        //j
        currentSong.currentTime -= 10;
   } else if (e.keyCode == 76) {
        //l
        currentSong.currentTime += 10;
   }
});

$('body').keydown(function(e){
   if(e.keyCode == 32){
       // doh ho ho
       e.preventDefault();
   }
});

function pause() {
    if (firstClick === true) {
        play(songs[0]);
        firstClick = false;
        $("#playIcon").text("pause")
    } else if (playing) {
        currentSong.pause();
        playing = false;
        $("#playIcon").text("play_arrow")
    } else {
        currentSong.play();
        playing = true;
        $("#playIcon").text("pause")
    }
}

function next() {
    //loop if at the end
    var toPlay;
    var wasPlaying = playing;
    if (track != songs.length-1) {
        toPlay = songs[track + 1];
    } else { toPlay = songs[0]; }
    play(toPlay, true);
    if (!wasPlaying) pause();
    
    //if there's time, do a smooth transtiion
    if (smoothTransition) {
        $("#new-art").attr("src", toPlay.artPath);
        $("#current-art").addClass("fadeLeft");
        $("#new-art").addClass("fadeRight");
        smoothTransition = false;
        setTimeout(function() {
            $("#current-art").removeClass("fadeLeft");
            $("#new-art").removeClass("fadeRight");
            $("#current-art").attr("src", toPlay.artPath);
            smoothTransition = true;
        }, 500) 
    } else {
        $("#current-art").attr("src", toPlay.artPath);
        $("#new-art").attr("src", toPlay.artPath);
        smoothTransition = false;
        setTimeout(function() {smoothTransition = true}, 500)
    }

}

function prev() {
    var toPlay;
    var wasPlaying = playing;
    if (currentSong.currentTime > 3) { //rewinds if in the middle of a song
        currentSong.currentTime = 0;
        return;
    } else if (track === 0) {
            toPlay = (songs[songs.length-1]);
    } else { toPlay = (songs[track - 1]); }
    play(toPlay, true);
    if (!wasPlaying) pause();

    if (smoothTransition) {
        $("#new-art").attr("src", toPlay.artPath);
        $("#current-art").addClass("fadeRight");
        $("#new-art").addClass("fadeLeft");
        smoothTransition = false;
        setTimeout(function() {
            $("#current-art").removeClass("fadeRight");
            $("#new-art").removeClass("fadeLeft");
            $("#current-art").attr("src", toPlay.artPath);
            smoothTransition = true;
        }, 500)
    } else {
        $("#current-art").attr("src", toPlay.artPath);
        $("#new-art").attr("src", toPlay.artPath);
        smoothTransition = false;
        setTimeout(function() {smoothTransition = true}, 500)
    }
}

function updateTrackbar() {
    //don't move it if the trackbar is being dragged
    if (trackbarDrag) return;
    var percent = (currentSong.currentTime / currentSong.duration) * 100
    percent += "%"
    $("#trackbar").css("width", percent)
}

function updateTime(song) {
    if (song.currentTime == "NaN") return;
    $("#time").text(
        formatTime(song.currentTime) + "/" + formatTime(song.duration)
    );
}

$(document).ready(function() {
    setInterval(updateTrackbar, 20)

    currentSong = new Audio(songs[0].audioPath);

    addSongInfo(songs[0]);
    setAlbumArt(songs[0].artPath);

    for (var i=0; i<songs.length; i++) {
        $("#tracklist").append(
            //a hack to get html entities from weird characters
            "<p onclick=play(songs["+ i +"])>" + $("<div/>").text(songs[i].name).html() + "</p><br>"
        )
    }
    
    //$("#tracklist").append("<p><a href='songs.zip' target='_blank'> download all</a></p>")
    
    document.getElementById("trackbar-container").addEventListener("click", seek);
})

function setAlbumArt(path) {
    $("#current-art").attr("src", path);
}

 function formatTime(seconds) {
    minutes = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }



function switchArt(newSong, direction) {
    var artBlob = "<img src='"+newSong.artPath+"' id='newArt'>";
    $("art-container").append(artBlob);
}

//VOLUME BAR
//volume bar event
var volumeDrag = false;
$('.volume').on('mousedown', function (e) {
    volumeDrag = true;
    updateVolume(e.pageX);
});
$('#trackbar-container').on('mousedown', function(e) {
    trackbarDrag = true;
});
$(document).on('mouseup', function (e) {
    if (volumeDrag) {
        volumeDrag = false;
        updateVolume(e.pageX);
    }
    if (trackbarDrag) {
        trackbarDrag = false;
        seek(e)
    }
});
$(document).on('mousemove', function (e) {
    if (volumeDrag) {
        updateVolume(e.pageX);
    }
    if (trackbarDrag) {
        var position = e.pageX - $("#trackbar-container").offset().left;
        var percent = 100 * position / $("#trackbar-container").width();
        if (percent > 100) percent = 100;
        if (percent < 0) percent = 0;
        percent += "%"
        $("#trackbar").css("width", percent)
    }
});

var updateVolume = function (x, vol) {
    if (vol == 0) vol = .001;
    var volume = $('.volume');
    var percentage;
    //if only volume have specificed
    //then direct update volume
    if (vol || vol === 0) {
        percentage = vol * 100;
    } else {
        var position = x - volume.offset().left;
        percentage = 100 * position / volume.width();
    }

    if (percentage > 100) {
        percentage = 100;
    }
    if (percentage < 0) {
        percentage = 0;
    }

    //update volume bar and sound volume
    $('.volumeBar').css('width', percentage + '%');
    currentSong.volume = percentage / 100;
};

// trackbar dragginc controls
var trackbarDrag = false;
function seek(e) {
    var percent = e.offsetX / document.getElementById("trackbar-container").offsetWidth;
    currentSong.currentTime = percent * currentSong.duration;
}