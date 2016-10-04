function startTime() {
    var today = new Date();
    var h = today.getHours();
    //america
    if (h >= 13) {
        h -= 12;
    } else if (h < 1) {
        h += 12;
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

//press SHIFT to focus on the search bar
//modifiers have to be AT THE END
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
    var original = query;
    var modifier = query.substr(query.length-2);
    query = query.slice(0, query.length-2);
    switch (modifier) {
        case "-a":
            window.location = "http://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=" +
            query.replace(" ", "+");
            break;
        case "-y":
            window.location =
                "https://www.youtube.com/results?search_query=" +
                query.replace(" ", "+");
            break;
        case "-w":
            window.location =
                "https://en.wikipedia.org/w/index.php?search=" +
                query.replace(" ", "%20");
            break;

    	case "-m":
    	    window.location =
    		"http://www.wolframalpha.com/input/?i=" +
    		query.replace("+", "%2B");
    		break;

        default:
            window.location="https://www.google.com/#q=" +
                   original.replace(" ", "+");

    }
}

$(document).bind('keydown', function(e) {
    if (e.which == 16) {
        document.getElementById("searchbar").focus();
    }
});


//weather shamelessly stolen from Austin Kilduff
var json_url = "http://api.openweathermap.org/data/2.5/weather?q=Morningside+Heights,ny&appid=6e131a2916d5d45d8367b72a4675be0a";
var city;
var temp_curr;
var temp_low;
var temp_high;
var description;
var weatherCode;
var humidity;
$.when(
	$.getJSON(json_url)
	).done( function(json_obj) {
		city = json_obj["name"];
		temp_curr = k_to_f(json_obj["main"]["temp"]);
		temp_low = k_to_f(json_obj["main"]["temp_min"]);
		temp_high = k_to_f(json_obj["main"]["temp_max"]);
		description = json_obj["weather"][0]["description"];
        weatherCode = Number(json_obj["weather"][0]["id"]);
        humidity = Number(json_obj["main"]["humidity"])
		insertWeatherInfo();
	}
);
function k_to_f(kelvin) {
	return ((9 / 5) * (kelvin - 273) + 32).toFixed(0);
}
function insertWeatherInfo() {
	//$("#city").append(city.toLowerCase());
	document.getElementById("description").innerHTML = (description.toLowerCase());
	document.getElementById("temp_curr").innerHTML = ("it's " + temp_curr + "&deg; out");
	$("#temp_low").append("lo " + temp_low + "&deg; /");
	$("#temp_high").append("hi " + temp_high + "&deg;");
    console.log("weather code: " + weatherCode);
    console.log("humidity: " + humidity);
    var disgusting = (weatherCode > 500 && weatherCode < 800);
    if (disgusting || Number(temp_low) < 30 || Number(temp_high) > 95
        || humidity > 75) {
        document.getElementById("badness").innerHTML = ("disgusting");
    } else {
        document.getElementById("badness").innerHTML = ("not bad");
    }
}


var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

var date = new Date();
var day = date.getDate();
var weekday = date.getDay();
var monthIndex = date.getMonth();
var year = date.getFullYear();

document.getElementById("date").innerHTML = days[weekday] + ", " + monthNames[monthIndex] + " " + day;

$("#searchbar-container").click(function() {
    $("#searchbar").focus();
})


/*
update the stylesheet based on time:
if it's after say 9pm and before 7 am, go night colors

var today = new Date();

var h = today.getHours();
if (h > 19 || h < 7) {
    $("head").append('<link href="nightcolors.css" rel="stylesheet"/>');
} else {
    $("head").append('<link href="daycolors.css" rel="stylesheet"/>');
}
 */
