function binStartup() {
	render(getTime());
	if (terminal.greeting != "") {
		render(terminal.greeting);
	}
}

var terminalFunctions = [
"about",
"clear",
"help",
"log",
"ls",
"machine",
"re",
"purge",
"user",
]

var help = {
	main: function(args) {
		if (args.length == 0) {
			render("Usage: help [function]");
			return;
		}
		if (terminalFunctions.includes(args[0]) || editFunctions.includes(args[0])) {
			render(window[args[0]].helpText)
		} else {
			render("Command not found.");
		}
	},
	helpText: ':^)',
}

var ls = {
	main: function(args) {
		render(hcat(
			terminalFunctions.join('\n'), 
			editFunctions.join('\n')
		));
	},
	helpText: 'Lists all functions and files.'
}

var machine = {
	main: function(args) {
		if (args.length == 0) {
			render("Usage: machine [newname]");
		} else {
			setMachine(args[0]);
		}
	},
	helpText: 'Renames the terminal machine.'
}

var user = {
	main: function(args) {
		if (args.length == 0) {
			render("Usage: name [newname]");
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
	helpText: "Reloads the page."
}

var log = {
	main: function() {
		for (var h=lastInputs.length-1; h>=0; h--) render(lastInputs[h]);
	},
	helpText: "Shows the command history."
}

var purge = {
	main: function(args) {
		if (args[0] === "-force") {
			localStorage.clear();
			render("Local storage cleared. Reloading...");
			re.main();
		} else {
			render("Are you sure you want to delete local storage?");
			render("This will delete all userprefs, bookmarks, and files.");
			render("Rerun with '-force' to confirm.");
		}
	},
	helpText: 'Clears all local storage. Requires confirmation.'	
}

var about = {
	main: function() {
		render("Terminal v2", "pink");
		render(
			"Features include file editing, history, tab autocompletion, weather, and extensibility.\n"+
			"For local configuration, save a file called .config with the properties you want to override.\n"+
			"Run 'terminal' in the console to see the possible overrides."
		)
	},
	helpText: ""
}