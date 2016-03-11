/*============GLOBALS===================
To initialize a terminal: just have a div with the id "terminal"
in your HTML body. Terminal.js will take care of the rest.

You can edit these. In fact, it is encouraged. It is a human right.

Styling most colors and size of #terminal happens in your
css file. These are for the program itself and rendering behavior.
*/
var lastInput = ""
var arrow = "$&nbsp;"
var commandColor = "white" //the text color of the user input field
var savedInputs = 20 //how many inputs to save & access via up/down arrows
var renderSpeed = 1 //milliseconds per character when rendering
var slow  = true;

/*
TO DO
colorMono()

*/


//===========TERMINALJS=================
var terminal = document.getElementById("terminal");
var input;
var lastInputs = [lastInput]
var inputIndex = 0
var lines = 0
var termcolor = terminal.style.backgroundColor
var textcolor = terminal.style.color

//right now if you want EITHER color or size you have to specify BOTH
function render(text, color, size) {
	lines++
	text == "" ? text = "&nbsp;" : text = text //&nbsp; = a space in HTML
	//create the paragraph that will be the immediate parent of the text
	var prefix = '<p class="termline" id="termline' + lines + '" style="'
	var termlineId = "#termline" + lines
	var	suffix = "</p>"
	if (color == undefined) {
		color = "inherit"
	}
	if (size == undefined) {
	 	size = "12"
	}
	prefix += "color:" + color + "; "
	prefix += "font-size:" + size + 'pt;"'

	prefix += ">"
	output = prefix + text + suffix
	if (text == "clear") {
		document.getElementById("terminal-inner").innerHTML = ""
	} else if (slow) {
		slowRender("#terminal-inner",
		termlineId, output, 0, renderSpeed)
	} else {
		$("#terminal").append(output)
	}
}

var slowRender = function (targetId, innerId, html, index, interval){
    if ( index == html.length ) return;


	//create a div to hold the <p> of text and add it to the terminal
	var currdiv = '<span id="line' + lines + '"></span>'
	var currid = "#line" + lines
	$(targetId).append( currdiv );

	//strip out the first <p> tag for rendering speed
	var toSearch = 'pt;">'
	var startMarker = html.indexOf(toSearch)
	var oldString = html
	oldString = oldString.slice(0, startMarker+toSearch.length)
	html = html.slice(startMarker+toSearch.length, html.length)
	//and then put it in the div for each line
	$(currid).append(oldString)

	//and THEN fill the paragraph with the actual characters
	$(innerId).append( html.substr(0,index) );

    setTimeout(function () {
        slowRenderChild(innerId, html, ++index, interval);
    }, interval);
}

var slowRenderChild = function (targetId, html, index, interval){
    if ( index == html.length ) return;

    $(targetId).html( html.substr(0,index) );

    setTimeout(function () {
        slowRenderChild(targetId, html, ++index, interval);
    }, interval);
}

function addInput(str) {
	lastInputs[0] == str ? true : lastInputs.unshift(str);
	//keep it under the limit
	while (lastInputs.length > savedInputs) {
		lastInputs.splice([lastInputs.length - 1], 1)
	}
}

function handle(str) {
	str === "" ? "do nothing" : addInput(str)
	render(str);
	input.value = "";
	gameHandle(str);
	hook(str);
}

function initCSS() {
	document.getElementById("arrow").innerHTML = arrow;
	var termwidth = $("#terminal").css("width");
	$("#input").css("color", commandColor);
	$("#terminal, #terminal-inner, #input" ).css("width", termwidth);
	$(".termline" ).css("max-width", termwidth-1);
	$("#terminal").css("background-color", termcolor)
	$("#terminal").css("color", textcolor)
}

function initHTML() {
	$("#terminal").append('\
		<div id="terminal-inner"  onclick="var v = document.getElementById("commandline"); if (v) v.focus();"></div>\
		<div id="input">\
			<span id="arrow">&#36;&nbsp;</span>\
			<input id="commandline" autofocus="true" spellcheck="false" type="text" autocapitalize="off" autocorrect="off" style="display:block" onsubmit="input()"/>\
		</div>')
}

$(document).ready(function() {
	initHTML();
	initCSS();
	input = document.getElementById("commandline");
	input.addEventListener("keydown", function(a){
	    var key = a.keyCode;
	    if(key == 13){ //enter
	        handle(input.value);
			inputIndex = 0;
	    } else if (key == 38) { //up arrow
			input.value = lastInputs[inputIndex];
			inputIndex < lastInputs.length-1 ? inputIndex++ : true;
		} else if (key == 40) { //down arrow
			inputIndex > 0 ? inputIndex-- : true;
			input.value = lastInputs[inputIndex];
		}
	});
})

//color scheme generation
function randRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function color() {
	var r = randRange(0, 255);
	var g = randRange(0, 255);
	var b = randRange(0, 255);
	var tempcolor = "rgb(" +r+ "," +g+ "," +b+ ")"
	$("#terminal").css("background-color", tempcolor)
	//350 is the cutoff
	var light = (r+g+b > 350);
	if (light) {
		tempcolor = genColor(0, 128)
		$("#terminal").css("color", tempcolor)
		$("#input").css("color", genColor(0, 128));
	} else {
		tempcolor = genColor(128, 255)
		$("#terminal").css("color", tempcolor)
		$("#input").css("color", genColor(128, 255));
	}
}

function genColor(min, max) {
	r = randRange(min, max);
	g = randRange(min, max);
	b = randRange(min, max);
	return "rgb(" +r+ "," +g+ "," +b+ ")"
}
