$(document).ready(function() {
	init();
});

var editing = false;

var terminal = {
	userName: "adrian",
	userMachine: "potionseller",
	promptColor: "lightgray",
	outputColor: "gray",
	bodyBg: "#2b2b2d",
	termBg: "#1b1b1d",
}

function saveTerminal() {
	localStorage.setItem("terminal", JSON.stringify(terminal))
}
function clearTerminalSave() {
	localStorage.removeItem("terminal");
}

function init() {
	//load saved terminal config
	if (localStorage.getItem("terminal")) {
		terminal = JSON.parse(localStorage.getItem("terminal"))
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

	if (terminalFunctions.includes(firstWord)) {
		//call the function and supply the array of args
		window[firstWord].main(args);
	} else {
		print ("Command "+firstWord+" not found. Try 'ls' for all commands.")
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
	var style = '.prompt, .input-old, #input {color: '+terminal.promptColor+';}\
	.output {color: '+terminal.outputColor+';}\
	body {'+terminal.bodyBg+'};\
	#terminal-container {'+terminal.termBg+'}';
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
    if (lastInputs.length > 0) {
        if (lastInputs[lastInputs.length - 1] != str) lastInputs.unshift(str)
    } else lastInputs.unshift(str);
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