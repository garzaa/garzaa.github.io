var questions = [
    "things that aren't Jackie Chan",
    "fetishes",
    "animes",
    "Tarantino movies",
    "things you put in the closet",
    "copypastas",
    "brown things",
    "stale memes",
    "holes",
    "violent crimes",
    "things you put in your butt",
    "places not to put your finger",
    "turn-offs",
    "things Sam has eaten",
    "sex toys",
    "serial killers",
    "prime numbers",
    "awful video games",
    "diseases",
    "ways to hide a fart",
    "reasons to break up",
    "ways to get rid of a body",
    "bad toilets",
    "reasons for diarrhea",
    "gross foods",
    "murder weapons",
    "birth control methods",

]

var currentQuestion = 0;
var currentNum;
var SECONDS = 5;

function init() {
    shuffle(questions);
    displayPrompt();
}

//stolen from stack overflow, shuffles an array
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function decreaseNumber() {
    var num = Number(document.getElementById("countdown").innerHTML);
    document.getElementById("countdown").innerHTML = num - 1;

}

function countdown(seconds) {
    document.getElementById("countdown").innerHTML = seconds;
    var cd = setInterval(decreaseNumber, 1000);
    setTimeout(function() {
        clearInterval(cd);
        playAirhorn();
    }, seconds * 1000);
}

function displayPrompt() {
    if (currentQuestion === questions.length) currentQuestion = 0;
    document.getElementById("prompt").innerHTML = questions[currentQuestion];
    currentQuestion++;
}

//also shamelessly stolen from stack overflow, gets keycodes in pure javascript
document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    //k to go to the next prompt, l to start the countdown
    switch (charStr) {
        case "k":
            displayPrompt();
            break;
        case "l":
            countdown(SECONDS);
            break;
    }
};

init();
