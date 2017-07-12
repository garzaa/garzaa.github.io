$(document).ready(function() {
	init();
});

var editing = false;

var terminal = {
	userName: "guest",
	userMachine: "start",
	body1: "lightgray",
	body2: "gray",
	bg1: "#2b2b2d",
	bg2: "#1b1b1d",
}

function saveTerminal() {
	localStorage.setItem("terminal", JSON.stringify(terminal))
}
function clearTerminalSave() {
	localStorage.removeItem("terminal");
}

function init() {
	//load saved terminal config
	/*if (localStorage.getItem("terminal")) {
		terminal = JSON.parse(localStorage.getItem("terminal"))
	}*/
    //try to read the data after formatting it
    if (files[".config"]) {
        var fileData = files[".config"];

        //split into an array of separate lines
        var fileLines = fileData.split("\n");
        for (var i=0; i<fileLines.length; i++) {
            //surround each line in quotes for JSON parsing
            fileLines[i] = '"'+fileLines[i]+'"';
        }
        fileData = fileLines.join("\n");

        //and then put the other quotes around the colon, removing spaces in the middle
        fileData.replace(/\ *:\ */g, '":"');

        //replace newlines with commas
        fileData.replace(/\n/g, ',');

        //then surround with brackets
        fileData = "{" + fileData + "}";

        console.log(fileData);
        console.log(JSON.parse(fileData));
    }

	updatePrompt();
	updateStyle();

	addListeners();

    $("#input").focus();
}

function addListeners() {
	$("#terminal-container").click(function() {
    	if (!editing) $("#input").focus();
	})		

	input = document.getElementById("input");
    input.addEventListener("keydown", function(a){
        var key = a.keyCode;
        if(key == 13){ //enter
            a.preventDefault();
            handleInput();
            inputIndex = 0;
        } else if (key === 38) { //up arrow
            document.getElementById("input").innerHTML = lastInputs[inputIndex];
            inputIndex < lastInputs.length-1 ? inputIndex++ : true;
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

function setName(name) {
    if(name == "") {
        render("usage: t [newname]")
        return;
    }
    
    terminal.userName = name;
    saveTerminal();
    updatePrompt();
}

function getMachine() {
    return terminal.userMachine || "start";
}

function setMachine(str) {
    if(str == "") {
        render("usage: machine [newname]")
        return;
    }

 	terminal.userMachine = str;
    saveTerminal();
    updatePrompt();
}

//the main terminal pipeline
function handleInput() {
	var rawInput = $("#input").html();
	$("#input").html("");

	appendLastInput(rawInput);
	addInput(rawInput);

	if (rawInput == "") return;

    //intercepting the function here to search
    if (searchString(rawInput)) {
        render("Searching for " + input.slice(0, input.length-3) + "...")
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

function appendLastInput(text) {
	var inputPre = '<p><span class="prompt">'+getName()+'@'+getMachine()+':$&nbsp;</span><span class="input-old">';
	var inputSuf = '</span></p>';
	$(inputPre+text+inputSuf).insertBefore("#prompt");
}

function render(text) {
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
	
    style = ":root{"+
        "--body1: "+terminal.body1+";"+
        "--body2: "+terminal.body2+";"+
        "--bg1: "+terminal.bg1+";"+
        "--bg2: "+terminal.bg2+";"+
    +"}"

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
    		"http://www.wolframalpha.com/input/?i=" +
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
		case "-i":
			window.location = encodeURI(query)
			return true
    }
    return false;
}

//====================  HELPER FUNCTIONS  ==========================
function randRange(n) {
  return Math.ceil(Math.random() * n);
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

//horizontally concatenates multiline strings
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

    if (typeof bookmarks != "undefined" && bookmarks.length > 0) {
        for (var i=0; i<bookmarks.length; i++) {
            if(bookmarks[i][0].indexOf(string) === 0) {
                document.getElementById("input").innerHTML = bookmarks[i][0];
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
