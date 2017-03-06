var repeat = false;

function convert() {
	//document.getElementById("input").value = '';
	var inputStr = document.getElementById("input").value;
	var outputSpan = $("#output");
	outputSpan.html("");

	inputStr = replaceAll(inputStr);

	console.log(inputStr)

	for (var i=0; i < inputStr.length; i++) {
		outputSpan.append(lookup(inputStr[i]))
	}

}


function lookup(str) {
	if (aliases.hasOwnProperty(str)) {
		return getRand(aliases[str]);
	} else {
		return str;
	}
}

function replaceAll(str) {
	for (var alias in multialiases) {
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
	d: ["🆔"],
	e: ["3️⃣"],
	f: ["f"],
	g: ["↪️"],
	h: ["♓"],
	i: ["ℹ️️"],
	j: ["⤴️"],
	k: ["k"],
	l: ["🕒"],
	m: ["〽", "♏", "Ⓜ️️"],
	n: ["♑"],
	o: ["⭕", "0️⃣", "➰"],
	p: ["🅿️️"],
	q: ["♎"],
	r: ["®️"],
	s: ["5️⃣"],
	t: ["✝️", "➕"],
	u: ["⛎"],
	v: ["☑️️", "✅", "✔️️"],
	w: ["🇼"],
	x: ["✖️", "❌"],
	y: ["💹"],
	z: ["💤"],
	" ": ["&nbsp;"],
	"!": ["❗", "❕"]
}

var multialiases = {
	id: "🆔",
	wc: "🚾",
	oo: "➿",
	cool: "🆒",
	free: "🆓",
	cl: "🆑",
	ng: "🆖",
	ok: "🆗",
	zzz: "💤",
}