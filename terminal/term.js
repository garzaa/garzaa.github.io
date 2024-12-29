$(document).ready(function() {
	init();
    //calling bin functions
    binStartup();
});

var editing = false;

var terminal = {
	userName: "guest",
	userMachine: "start",
	body1: "lightgray",
	body2: "gray",
	bg1: "#2b2b2d",
	bg2: "#1b1b1d",
    shadow: "#0b0b0d",
    editbg: "#0b0b0d"
}
//user-defined style properties need to go here as well as in terminal above
var styleProps = [
    'body1', 'body2',
    'bg1', 'bg2',
    'shadow',
    'editbg'
]

//to be loaded from a local file
var userBookmarks = []

var lat, lon;

function saveTerminal() {
	localStorage.setItem("terminal", JSON.stringify(terminal))
}
function clearTerminalSave() {
	localStorage.removeItem("terminal");
}

function init() {
    loadCSS();
    loadConfig();
    loadBookmarks();
    loadLocation();

	updatePrompt();
	updateStyle();

	addListeners();

    //user-defined startup
    evalStartup();

    $("#input").focus();
}

function evalStartup() {
    if (files[".startup"]) {
        try {
            eval(files[".startup"]);
        }
        catch (e) {
            render("Error in .startup!", "indianred")
            render(e, "indianred");
        }
    }
}

function loadCSS() {
    $("head").append("<style>"+files[".css"]+"</style>" || "")
}

function loadLocation() {
    if (localStorage.getItem("terminal")) {
        terminal.lat = JSON.parse(localStorage.getItem("terminal")).lat 
        terminal.lon = JSON.parse(localStorage.getItem("terminal")).lon 
    }
}

function loadConfig() {
    //load saved terminal config
    /*if (localStorage.getItem("terminal")) {
        terminal = JSON.parse(localStorage.getItem("terminal"))
    }*/
    //try to read the data after formatting it
    if (files[".config"]) {
        userConfig = formatToJSON(files[".config"]);

        //then load any simifilarities into terminal and proceed as normal
        Object.keys(userConfig).forEach(function(key, index) {
            if (key in terminal) {
                 terminal[key] = userConfig[key];
            }
        });
    }
}

function loadBookmarks() {
    //load saved bookmarks from a file
    if (files[".bookmarks"]) {
        userBookmarks = [];
        var bookmarksList = files[".bookmarks"].split("\n");
        for (var i=0; i<bookmarksList.length; i++) {
            userBookmarks.push([
                bookmarksList[i].split(" ")[0],
                bookmarksList[i].split(" ")[1]
                ]);
        }
    } else {
        return false;
    }
}

function addListeners() {
	$("#terminal-container").click(function() {
    	if (!editing) $("#input").focus();
	})		

	input = document.getElementById("input");
    input.addEventListener("keydown", function(a){
        var key = a.keyCode;
        if(key == 13){ //enterf
            a.preventDefault();
            handleInput($("#input").html());
            inputIndex = 0;
        } else if (key === 38) { //up arrow
            if (lastInputs[inputIndex] != undefined) {
                document.getElementById("input").innerHTML = lastInputs[inputIndex];
                inputIndex < lastInputs.length-1 ? inputIndex++ : true;
            }
        } else if (key === 40) { //down arrow
            inputIndex > 0 ? inputIndex-- : true;
            if (inputIndex > 0) {
                inputIndex--;
                document.getElementById("input").innerHTML = lastInputs[inputIndex];
            } else {
                document.getElementById("input").innerHTML = "";
            }

        } else if (key === 9) { //tab
            if(!editing) {
                a.preventDefault();
                autocomplete(document.getElementById("input").innerHTML);
            }
        }
    });
}

function updatePrompt() {
	$("#prompt").text(getName()+"@"+getMachine()+":$");
}

function getName() {
	return terminal.userName || "guest";
}
function getMachine() {
    return terminal.userMachine || "start";
}

//the main terminal pipeline
function handleInput(rawInput) {
	$("#input").html("");

	appendLastInput(rawInput);
    if (rawInput.search("!!") != -1) rawInput = rawInput.replace("!!", lastInputs[0]);
	addInput(rawInput);

	if (rawInput == "") return;

    //intercepting the function here to search
    if (searchString(rawInput)) {
        render("Searching for " + input.slice(0, input.length-3) + "...")
        return;
    }

    //do everything else here
    if (preCheck(rawInput)) {
         return;
    }

	var firstWord = rawInput.split(" ")[0];
	var args = rawInput.split(" ").slice(1); //remove the first word

    //if the command is valid
	if (terminalFunctions.includes(firstWord) ||
        editFunctions.includes(firstWord)) {
		//call the function and supply the array of args
		window[firstWord].main(args);
	} else {
		render("Command \""+firstWord+"\" not found. Try \"ls\" for all commands.")
	}

	document.getElementById("input").scrollIntoView();
}

//intercepts the pipeline before it looks for a named command
//contains things like dice, searching, 4chan/reddit jumping
function preCheck(str) {
    //first, search for bookmarks
    if (userBookmarks.length > 0) {
        for (var i=0; i<userBookmarks.length; i++) {
            if(userBookmarks[i][0] === str) {
                loadURL(userBookmarks[i][1])
                return true;
            }
        }
    }

    //:^)
    if (str[0] == '~') {
        eval(str.slice(1, str.length))
        return true
    }

    //test for a web url
    var pattern = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
        if (pattern.test(str)) {
            if (!str.startsWith("http")) {
                str = "https://" + str;
            }
            loadURL(str);
            return true;
    }

}

function appendLastInput(text) {
	var inputPre = '<p><span class="prompt">'+getName()+'@'+getMachine()+':$&nbsp;</span><span class="input-old">';
	var inputSuf = '</span></p>';
	$(inputPre+text+inputSuf).insertBefore("#prompt");
}

function render(text, color) {

    if (typeof(color) != 'undefined') {
        text = '<span style="color:'+color+';">'+text+"</span>";
    }

	var pre = '<p class="output">'
	var suf = '</p>'
	$(pre+text+suf).insertBefore("#prompt");
}

function updateStyle() {
	//add a new style element to the head, replacing an old one if it exists
	if (document.getElementById("terminalStyle") != null) {
		$("#terminalStyle").remove();
	}
	var pre = '<style id="terminalStyle">'
	
    //build the style object with variables
    style = ":root{"
    for(var i=0; i<styleProps.length; i++) {
        style += "--"+styleProps[i]+":"+terminal[styleProps[i]]+";"
    }
    style += "}"

	var suf = '</style>'

	$("head").append(pre+style+suf);
}

//====================  HISTORY  ===================================
//keep duplicates from being added, change "" to &nbsp;
var lastInputs = []
var inputIndex = 0;

if (localStorage.getItem("history")) {
    lastInputs = JSON.parse(localStorage.getItem("history"))
}

//adds to the beginning of the array
function addInput(str) {
    if (str === "" || /^[ ]+$/.test(str)) {
        return;
    }

    lastInputs.unshift(str);
    localStorage.setItem("history", JSON.stringify(lastInputs))
}

//====================  SEARCHING ==================================
function searchString(query) {
    var original = query;
    var modifier = query.substr(query.length-2);
    query = query.slice(0, query.length-3); //remove " -x"
    switch (modifier) {
        case "-a":
            window.location = "https://smile.amazon.com/s/?url=search-alias%3Daps&field-keywords=" +
            query.replace(" ", "+");
            return true;
        case "-y":
            window.location =
                "https://www.youtube.com/results?search_query=" +
                query.replace(" ", "+");
            return true;
        case "-w":
            window.location =
                "https://en.wikipedia.org/w/index.php?search=" +
                query.replace(" ", "%20");
            return true;
    	case "-m":
    	    window.location =
    		"https://www.wolframalpha.com/input/?i=" +
    		query.replace("+", "%2B");
            return true;
        case "-v":
            window.location =
            "https://vimeo.com/search?q=" +
            query.replace(" ", "+");
            return true;
		case "-g":
			window.location =
			"https://www.google.com/#q=" +
			query.replace(" ", "+")
			return true
		case "-i":
			window.location =
			"https://www.google.com/search?tbm=isch&q=" +
			query.replace(" ", "+")
			return true
		case "-u":
			window.location = encodeURI(query)
			return true
    }
    return false;
}

//====================  HELPER FUNCTIONS  ==========================
function randRange(n) {
  return Math.ceil(Math.random() * n);
}

function ktof(kelvin) {
    return ((9 / 5) * (kelvin - 273) + 32).toFixed(0);
}

function rollDie(args) {
    render(randRange(Number(args.substr(1))));
}

//returns a span with the color of a string, good for chaining
function cssColor(string, colorName) {
    return "<span style='color:" + colorName + "'>" + string + "</span>"
}

function getTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var pm = false;
	if (m < 10) m = "0" + m;
	if (h >= 13) {
		h -= 12;
		pm = true;
	} else if (h < 1) {
		h += 12
	}
	return h + ":" + m + (pm ? " PM" : " AM")
}

function loadURL(url) {
    render("Loading " + url + "...")
    window.location = url
}

//if true, ask for confirmation to close the tab
function setCloseConfirm(bool) {
    if (bool) {
        window.onbeforeunload = function (e) {
            e = e || window.event;

            // For IE and Firefox prior to version 4
            if (e) {
                e.returnValue = 'Sure?';
            }

            // For Safari
            return 'Sure?';
        };
    } else {
        window.onbeforeunload = function() {}
    }
}

function formatToJSON(fileData) {
    //loads a bunch of lines that look like "key:value\n"

    //split into an array of separate lines
    var fileLines = fileData.split("\n");
    for (var i=0; i<fileLines.length; i++) {
        //surround each line in quotes for JSON parsing
        fileLines[i] = '"'+fileLines[i]+'"';
    }
    fileData = fileLines.join("\n");

    //and then put the other quotes around the colon, removing spaces in the middle
    fileData = fileData.replace(/ *: */g, '":"');

    //replace newlines with commas
    fileData = fileData.replace(/\n/g, ',');

    //then surround with brackets
    return JSON.parse("{" + fileData + "}");
}

//horizontally concatenates two multiline strings
function hcat(str1, str2, spacer) {

    //error handling
    if (str1 == "") return str2;

    //spacer is a string between the two strings, defaults to four spaces
    if (typeof spacer === 'undefined') {
        spacer = "    ";
    }

    var arr1 = str1.split('\n');
    var arr2 = str2.split('\n');

    //standardize width: get the longest line of the first array
    var width = 0;
    for (var i=0; i<arr1.length; i++) {
        if (arr1[i].length > width) {
            width = arr1[i].length;
        }
    }

    var retLine = ''

    for (var i=0; i<arr1.length || i<arr2.length; i++) {

        //the value of the current line
        var currentLine = (i==0 ? '' : '\n')

        //if it's inside the first array, add the contents of the first array,
        //plus enough space to make the current line match the longest line
        if (i<arr1.length) {
            currentLine += arr1[i] + ' '.repeat(width-arr1[i].length);
        }

        //if it's inside the second array but not the first, add enough spaces to 
        //simulate an empty line in the first array
        if (i>=arr1.length && i<arr2.length) {
            currentLine += ' '.repeat(width);
        }

        //if it's inside the second array, add the contents
        if (i<arr2.length) {
            currentLine += spacer + arr2[i]
        }

        //then return
        retLine += currentLine;
    }

    return retLine
}

//====================  TAB AUTO-COMPLETION ========================
function autocomplete(string) {

    //first search term commands, then maybe hooked commands
    for (var i=0; i<terminalFunctions.length; i++) {
        if (terminalFunctions[i].indexOf(string) === 0) {
            document.getElementById("input").innerHTML = terminalFunctions[i];
            return
        }
    }

    if (typeof userBookmarks != "undefined" && userBookmarks.length > 0) {
        for (var i=0; i<userBookmarks.length; i++) {
            if(userBookmarks[i][0].indexOf(string) === 0) {
                document.getElementById("input").innerHTML = userBookmarks[i][0];
                return
            }
        }
    }

    if (typeof editFunctions != "undefined" && editFunctions.length > 0   ) {
        for (var i=0; i<editFunctions.length; i++) {
            if (editFunctions[i].indexOf(string) === 0) {
                document.getElementById("input").innerHTML = editFunctions[i];
                return
            }
        }
    }

    //autocompleting based on filenames
    var tempCommand = string.split(" ")[0];
    if (editFunctions.indexOf(tempCommand) >= 0
            && string.split(" ").length > 1) {
        var beginName = string.split(" ")[1];
        Object.keys(files).forEach(function(key, index) {
            if (key.indexOf(beginName) === 0)   {
                document.getElementById("input").innerHTML = tempCommand + " " + key
                return
            }
        })
    }

    //looking through history
    for (var i=0; i<lastInputs.length; i++) {
        if (lastInputs[i].indexOf(string) === 0) {
            document.getElementById("input").innerHTML = lastInputs[i];
            return
        }
    }
}

//disgusting things for screenfetch
// fixed deprecated function such as appName and appVersion
function getOS() {
    var OSName="Unknown OS"
    if (navigator.userAgent.indexOf("Win")!=-1) OSName="Windows"
    if (navigator.userAgent.indexOf("Mac")!=-1) OSName="MacOS"
    if (navigator.userAgent.indexOf("X11")!=-1) OSName="UNIX"
    if (navigator.userAgent.indexOf("Linux")!=-1) OSName="Linux"
    return OSName
}

function getBrowser() {
    // var nVer = navigator.appVersion; - unused in function
    var nAgt = navigator.userAgent;
    var browserName  = "";
    var fullVersion  = ''+parseFloat(navigator.userAgent); 
    var nameOffset,verOffset,ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
     browserName = "Opera";
     fullVersion = nAgt.substring(verOffset+6);
     if ((verOffset=nAgt.indexOf("Version"))!=-1) 
       fullVersion = nAgt.substring(verOffset+8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
     browserName = "Microsoft Internet Explorer";
     fullVersion = nAgt.substring(verOffset+5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
     browserName = "Chrome";
     fullVersion = nAgt.substring(verOffset+7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
     browserName = "Safari";
     fullVersion = nAgt.substring(verOffset+7);
     if ((verOffset=nAgt.indexOf("Version"))!=-1) 
       fullVersion = nAgt.substring(verOffset+8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
     browserName = "Firefox";
     fullVersion = nAgt.substring(verOffset+8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
              (verOffset=nAgt.lastIndexOf('/')) ) 
    {
     browserName = nAgt.substring(nameOffset,verOffset);
     fullVersion = nAgt.substring(verOffset+1);
     if (browserName.toLowerCase()==browserName.toUpperCase()) {
      browserName = navigator.appName;
     }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix=fullVersion.indexOf(";"))!=-1)
       fullVersion=fullVersion.substring(0,ix);
    if ((ix=fullVersion.indexOf(" "))!=-1)
       fullVersion=fullVersion.substring(0,ix);

    majorVersion = parseInt(''+fullVersion,10);
    if (isNaN(majorVersion)) {
     fullVersion  = ''+parseFloat(navigator.appVersion); 
    }

    return browserName+' '+fullVersion
}

function getEngine() {
    var nAgt = navigator.userAgent;
    var browserEngine = 'Unknown';
    if (nAgt.includes("Chrome")) {
        browserEngine = "Blink";
    } else if (nAgt.includes("Firefox")) {
        browserEngine = "Gecko"
    } else if (nAgt.includes("Safari")) {
        browserEngine = "Webkit"
    } else if (nAgt.includes("Trident")) {
        browserEngine = "Trident"
    } return browserEngine
}

function getFileNames() {
    var printStr = "";
    if (!$.isEmptyObject(files)) {
        for(var prop in files) {
            printStr += (prop) + "\n";
        }
    }
    return printStr;
}

function getBookmarkNames() {
    var printStr = "";
    for (var i=0; i<userBookmarks.length; i++) {
        printStr += userBookmarks[i][0]+"\n";
    }
    return printStr;
}
