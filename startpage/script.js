function startTime() {
    var today = new Date();
    var h = today.getHours();
    if (h >= 13) {
        h -= 12;
    }
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

startTime();

//search handler
searchinput = document.getElementById("searchbar");
if(!!searchinput){
    searchinput.addEventListener("keypress", function(a){
        var key = a.keyCode;
        if(key == 13){
            var query = this.value;
            search(query);
        }
    });
}

function search(query) {
    console.log(query)
    var modifier = query.substr(query.length-2);
    query = query.slice(0, query.length-2);
    switch (modifier) {
        case "-a":
            window.location = "http://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=" +
            query.replace(" ", "+");
            break;
        case "-y":
            query = query.substr(3);
            window.location =
                "https://www.youtube.com/results?search_query=" +
                query.replace(" ", "+");
            break;
        case "-w":
            query = query.substr(3);
            window.location =
                "https://en.wikipedia.org/w/index.php?search=" +
                query.replace(" ", "%20");
            break;

    	case "-m":
    	    query = query.substr(3);
    	    window.location =
    		"http://www.wolframalpha.com/input/?i=" +
    		query.replace("+", "%2B");
    		break;

        default:
            window.location="https://www.google.com/#q=" +
                   query.replace(" ", "+");

    }
}

$(document).bind('keydown', function(e) {
    if (e.which == 16) {
        document.getElementById("searchbar").focus();
    }
});
