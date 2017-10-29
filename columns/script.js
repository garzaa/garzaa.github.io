var letters = "qwertyuiop";
var homerow = "hjkl";

var highlightedColumn = null;

$(document).ready(function() {
	//for each list of links
	$("#col1 li").each(function(index, li) {
		$(li).prepend(makeHeader(letters[index]));
	})
	$("#col2 li").each(function(index, li) {
		$(li).prepend(makeHeader(letters[index]));
	})
	$("#col3 li").each(function(index, li) {
		$(li).prepend(makeHeader(letters[index]));
	})
	$("#col4 li").each(function(index, li) {
		$(li).prepend(makeHeader(letters[index]));
	})

	weather();
})

function makeHeader(number) {
	return "<h2>"+number+"</h2>"
}

function ktos(key) {
	return String.fromCharCode((96 <= key && key <= 105)? key-48 : key)
}

//focus columns depending on the code
$(document).keydown(function(e) {
	var key = e.keycode || e.which;
	var keychar = ktos(key).toLowerCase();

	//esc
	if (key == 27) {
		hiClr();
	}

	//enter
	if (key == 13 && $("#searchbar").is(":focus")) {
		search($("#searchbar").val());
	}

	if (homerow.includes(keychar)) {
		switch (keychar) {
			case "h":
				hiClr();
				hiCol("#col1");
				highlightedColumn = "#col1"
				break;
			case "j":
				hiClr();
				hiCol("#col2");
				highlightedColumn = "#col2"
				break;
			case "k":
				hiClr();
				hiCol("#col3");
				highlightedColumn = "#col3"
				break;
			case "l":
				hiClr();
				hiCol("#col4");
				highlightedColumn = "#col4"
				break;
		}
	}
	else if (letters.includes(keychar) && highlightedColumn != null) {
		var index = letters.indexOf(keychar)+1;
		var linkElement = $(highlightedColumn+" div ul li:nth-child("+index+")");
		linkElement.find("h2").addClass("highlight");
		var linkURL = linkElement.find("a").attr("href");
		if (linkURL != null && typeof(linkURL) != "undefined") {
			window.location = linkURL;
		}
	}
})

$("body").click(function() {
	hiClr();
})

function hiClr() {
	$("#links-container > div").removeClass("highlight");
	$("h2").removeClass("highlight");
	higlightedColumn = null;
}

function hiCol(objId) {
	$(objId).addClass("highlight")
}

function weather() {
	//first check if the localStorage version is more than 20 minutes old
    if (localStorage.getItem("cachedWeatherData") != null) {
        var weatherData = JSON.parse(localStorage.getItem("cachedWeatherData"));
        var now = new Date()
        var then = weatherData.timestamp;
        var diff = Math.abs(((now - then) / 1000)/60)
        if (diff < 20) {
            displayWeather(weatherData);
            console.log("using cached weather data")
            return;
        }
    } 

    //set up the right parameters
	apiKey="1ecd8e37533eef0b7c3f92e9026bab07";

	var endpoint = "http://api.openweathermap.org/data/2.5/weather?q=New+York&appid="+apiKey;

	//retrieve+format data for storage
	$.when($.getJSON(endpoint)).done(function(o) {
		displayWeather(o);
		o.timestamp = new Date();
		localStorage.setItem("cachedWeatherData", JSON.stringify(o))
	})
}

function displayWeather(o) {
	//where most of the numerical data is stored in the weather object
	//contains lows, highs, etc
	var wmain = o.main;
	var tCurr = ktof(wmain.temp);
	var tLo = ktof(wmain.temp_min);
	var tHi = ktof(wmain.temp_max);
	var description = o.weather[0].description;
	var code = Number(o.weather[0].id);
	var humid = Number(wmain.humidity);

    var disgusting = (code > 500
    && code < 800
    || Number(tLo) < 30
    || Number(tHi) > 95
    || humid > 75);

    description = description.charAt(0).toUpperCase() + description.slice(1)
    var weatherString = tCurr + "&deg;"// + description + ". "
    var commentary = "";
    disgusting ? commentary += "Disgusting" : commentary += "Not bad"
    $("#weather").html(weatherString);
    $("#description").html(description);
    $("#commentary").html(commentary);

}

function ktof(kelvin) {
    return ((9 / 5) * (kelvin - 273) + 32).toFixed(0);
}

function search(query) {
	//query comes in formatted like "search string -switch"
	//this is kind of a gross hack, but it works on my machine
	splitQuery = query.split(" -")
	//if there's no switch, just google it
	if (splitQuery.length == 1) {
		window.location =
			"https://www.google.com/#q=" +
			query.replace(" ", "+")
	}
	console.log("meme")
	//then get the last one
	modifier = splitQuery[splitQuery.length - 1]
	//and get back the original string to search with
	splitQuery.pop()
	query = splitQuery.join(" -")
	console.log(query)
	console.log(modifier)
	switch (modifier) {
        case "a":
            window.location = "https://smile.amazon.com/s/?url=search-alias%3Daps&field-keywords=" +
            query.replace(" ", "+");
        case "y":
            window.location =
                "https://www.youtube.com/results?search_query=" +
                query.replace(" ", "+");
        case "w":
            window.location =
                "https://en.wikipedia.org/w/index.php?search=" +
                query.replace(" ", "%20");
    	case "m":
    	    window.location =
    		"http://www.wolframalpha.com/input/?i=" +
    		query.replace("+", "%2B");
        case "v":
            window.location =
            "https://vimeo.com/search?q=" +
            query.replace(" ", "+");
		case "g":
			window.location =
			"https://www.google.com/#q=" +
			query.replace(" ", "+")
		case "i":
			window.location =
			"https://www.google.com/search?tbm=isch&q=" +
			query.replace(" ", "+")
    }
}