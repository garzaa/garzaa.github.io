var terminalFunctions = [
"clear",
"help",
"history",
"ls",
"machine",
"re",
"user",
]

var help = {
	main: function(args) {
		if (args.length == 0) {
			print("Usage: help [function]");
			return;
		}
		if (terminalFunctions.includes(args[0])) {
			print(window[args[0]].helpText)
		} else {
			print ("Command not found.");
		}
	},
	helpText: 'Prints the documentation for a function.',
}

var ls = {
	main: function(args) {
		for(var i=0; i<terminalFunctions.length; i++) {
			print(terminalFunctions[i]);
		}
	},
	helpText: 'Lists all functions and files.'
}

var machine = {
	main: function(args) {
		if (args.length == 0) {
			print("Usage: machine [newname]");
		} else {
			setMachine(args[0]);
		}
	},
	helpText: 'Renames the terminal machine.'
}

var user = {
	main: function(args) {
		if (args.length == 0) {
			print("Usage: name [newname]");
		} else {
			setName(args[0]);
		}
	},
	helpText: 'Renames the user.'
}

var clear = {
	main: function() {
		var data = '<span id="prompt" class="prompt">' + getName() + '@' + getMachine() +
	    	':$&nbsp;</span><span id="input" contenteditable="true" autofocus="true" spellcheck="false"></span>'
	    document.getElementById("terminal").innerHTML = data;
	   	addListeners();
	   	$("#input").focus();
	},
	helpText: "Clears the terminal."
}

var template = {
	main: function() {
	},
	helpText: ""
}

var re = {
	main: function() {
		location.reload();
	},
	helpText: "Reloads the current window."
}

var history = {
	main: function() {
		for (var h=lastInputs.length-1; h>=0; h--) print(lastInputs[h]);
	},
	helpText: "Shows the command history."
}