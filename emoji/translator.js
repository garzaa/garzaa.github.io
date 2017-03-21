var repeat = false;
var lastChar = ""
var lastEmoji = ""

function convert() {
	//document.getElementById("input").value = '';
	var inputStr = document.getElementById("input").value;
	var outputSpan = $("#output");

	if (inputStr == "") {
		outputSpan.html("&nbsp;")
		return;
	}

	inputStr = inputStr.toLowerCase();

	inputStr = replaceAll(inputStr);

	outStr = ""

	for (var i=0; i < inputStr.length; i++) {
		outStr += (lookup(inputStr, i))
	}

	outputSpan.html(outStr)
}


function lookup(str, index) {
	if (lastChar == str[index]) {
		return lastEmoji
	}

	if (aliases.hasOwnProperty(str[index])) {
		lastChar = str[index]
		lastEmoji = getRand(aliases[str[index]]);
		return lastEmoji;
	} else {
		return str[index];
	}
}

function replaceAll(str) {
	var alias;
	for (alias in multialiases) {
		if (multialiases.hasOwnProperty(alias)) {
			//multiple passes for compression
			while (str.indexOf(alias) >= 0) {
				str = str.replace(alias, multialiases[alias])
			}
		}
	}
	return str;
}

function getRand(arr) {
	var outcome = Math.floor(Math.random() * arr.length)
	return arr[outcome]
}

var aliases = {
	a: ["🅰️️"],
	b: ["🅱️️"],
	c: ["©️️", "☪️"],
	d: ["↩️"],
	e: ["3⃣"],
	f: ["🎏"],
	g: ["🇬"],
	h: ["♓"],
	i: ["ℹ️️"],
	j: ["⤴️"],
	k: ["🎋"],
	l: ["🕒", "👢"],
	m: ["〽", "♏", "Ⓜ️️"],
	n: ["♑"],
	o: ["⭕", "➰"],
	p: ["🅿️️"],
	q: ["♎"],
	r: ["®️"],
	s: ["💲", "5⃣	"],
	t: ["✝️", "➕"],
	u: ["⛎"],
	v: ["☑️️", "✅", "✔️️"],
	w: ["📈"],
	x: ["✖️", "❌"],
	y: ["🔱"],
	z: ["💤"],
	" ": ["&nbsp;"],
	"!": ["❗", "❕"],
	"?": ["❔", "❓"],
	"1": ["1⃣"],
	"2": ["2⃣"],
	"3": ["3⃣"],
	"4": ["4⃣"],
	"5": ["5⃣"],
	"6": ["6⃣"],
	"7": ["7⃣"],
	"8": ["8⃣"],
	"9": ["9⃣"],
	"0": ["0⃣"],

}

var multialiases = {
	id: "🆔",
	wc: "🚾",
	cool: "🆒",
	free: "🆓",
	cl: "🆑",
	ng: "🆖",
	ok: "🆗",
	zzz: "💤",
	back: "🔙",
	end: "🔚",
	on: "🔛",
	soon: "🔜",
	top: "🔝",
	new: "🆕",
	up: "🆙",
	vs: "🆚",
	sos: "🆘",
	"!!": "‼️️",
	"!?": "⁉️️",
}

document.getElementById('input').onkeydown = function(e){
   if(e.keyCode == 13){
	     convert();
   }
};
