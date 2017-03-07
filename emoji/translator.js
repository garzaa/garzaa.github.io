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
		lastChar = str[index]
		return str[index];
	}
}

function replaceAll(str) {
	var alias;
	for (alias in multialiases) {
		if (multialiases.hasOwnProperty(alias)) {
			str = str.replace(alias, multialiases[alias])
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
	d: ["🇩"],
	e: ["3⃣"],
	f: ["🇫"],
	g: ["🇬"],
	h: ["♓"],
	i: ["ℹ️️"],
	j: ["⤴️"],
	k: ["k"],
	l: ["🕒"],
	m: ["〽", "♏", "Ⓜ️️"],
	n: ["♑"],
	o: ["⭕", "➰", "😩", "😂"],
	p: ["🅿️️"],
	q: ["♎"],
	r: ["®️"],
	s: ["💲", "5⃣	"],
	t: ["✝️", "➕"],
	u: ["⛎"],
	v: ["☑️️", "✅", "✔️️"],
	w: ["🇼"],
	x: ["✖️", "❌"],
	y: ["💹"],
	z: ["💤"],
	" ": ["&nbsp;&nbsp;"],
	"!": ["❗", "❕"]
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
	sos: "🆘"
}

document.getElementById('input').onkeydown = function(e){
   if(e.keyCode == 13){
	     convert();
   }
};
