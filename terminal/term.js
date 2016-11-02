$(document).click(function() {
    $("#input").focus();
})

$(document).ready(function() {
    init()
})

var userName;
var userMachine;

function getName() {
    if (!localStorage.getItem('userName')) {
        userName = "guest"
    } else {
        userName = localStorage.getItem('userName')
    }
    return userName;
}

function setName(name) {
    if(name == "") {
        print("usage: name [newname]")
        return;
    }
    localStorage.setItem("userName", name)
    userName = name
    document.getElementById('prompt').innerHTML = getName() + '@' + getMachine() +':$&nbsp;'
    print("Set userName to " + userName + ".")
}

function getMachine() {
    if (!localStorage.getItem('userMachine')) {
        userMachine = "blackbox"
    } else {
        userMachine = localStorage.getItem('userMachine')
    }
    return userMachine;
}

function setMachine(str) {
    if(str == "") {
        print("usage: machine [newname]")
        return;
    }
    localStorage.setItem("userMachine", str)
    userMachine = str
    document.getElementById('prompt').innerHTML = getName() + '@' + getMachine() +':$&nbsp;'
    print("Set userMachine to " + userMachine + ".")
}

function init() {
    input = document.getElementById("input");
    input.addEventListener("keydown", function(a){
        var key = a.keyCode;
        if(key == 13){ //enter
            a.preventDefault();
            handle(input.value);
            inputIndex = 0;
        } else if (key === 38) { //up arrow
            document.getElementById("input").innerHTML = lastInputs[inputIndex];
            inputIndex < lastInputs.length-1 ? inputIndex++ : true;
        } else if (key === 40) { //down arrow
            inputIndex > 0 ? inputIndex-- : true;
            document.getElementById("input").innerHTML = lastInputs[inputIndex];
        } else if (key === 9) { //tab
            a.preventDefault();
            autocomplete(document.getElementById("input").innerHTML);
        }
    });
    getName();
    getMachine();
    document.getElementById('prompt').innerHTML = getName() + '@' + getMachine() +':$&nbsp;'
    $("#input").focus();
}


function handle(text) {
    var input = $("#input").html();
    $("#input").html("");
    appendLastInput(input);
    addInput(input);

    if (input == "") return;

    //spooky secrets for d&d nerds
    if (input.match(/^d+[0-9]+$/)) {
        rollDie(input);
        return;
    }

    //intercepting the function here to search
    if (searchString(input)) {
        print("Searching for " + input.slice(0, input.length-3) + "...")
        return
    }

    var firstWord = input;
    firstWord = firstWord.split(" ")[0];
    var args = input;
    args = args.split(" ");
    args.shift();

    if (terminalFunctions.indexOf(firstWord) > -1) {
        //call it as a function
        window[firstWord](args);
    } else {
        //outside programs just need to have this function
        if (hook(input.split(" ")[0], args) != true) {
            print("Command " + "'" + input + "' not found. Type 'help' for more options.")
        }
    }

    document.getElementById('input').scrollIntoView();
}

function appendLastInput(text) {
    var inputBlobPre = '<p class="prompt">' + getName() + '@' + getMachine() +':$&nbsp;</p><pre class="input-old">'
    var inputBlobSuf = '</pre></br>'
    $(inputBlobPre + text + inputBlobSuf).insertBefore("#prompt");
}

function print(text) {

    var pre = '<pre class="output">'
    var suf = '</pre>'

    $(pre + text + suf).insertBefore("#prompt");
}

//for fancy rendering
function fancyRender(text, color, size) {
    var pre = '<pre class="output" style="'
    if (color == undefined) {
        color = "inherit"
    }
    if (size == undefined) {
        size = "11"
    }
    pre += "color:" + color + "; "
    pre += "font-size:" + size + 'pt;"'

    pre += ">"
    var suf = '</pre>'
    $(pre + text + suf).insertBefore("#prompt");
}

//====================  TERMINAL FUNCTIONS  ========================
var terminalFunctions = ["about", "clear", "echo", "help", "history", "ls", "name", "machine", "re", "render", 'search'];

function clear(input) {
    var data = '<p id="prompt" class="prompt">' + getName() + '@' + getMachine() + ':$&nbsp;</p><pre id="input" contenteditable="true" autofocus="true" spellcheck="false"></pre>'
    document.getElementById("terminal").innerHTML = data;
    init();
}

function about(input) {
    print("<a href='https://github.com/adriangarza/code2040/' target='_blank'>[GitHub Page]</a>")
    print("Terminal emulator v2.0 created by Adrian Garza, 2016.")
    print("Features include tab autocompletion and history, searchable with arrow keys.")
    print("Background photo by <a href='https://unsplash.com/@fableandfolk' target='_blank'>Annie Spratt</a>.")
}

function history(input) {
    //print in descending order, without printing the history command
    for (var h=lastInputs.length-1; h>0; h--) print(lastInputs[h]);
}

function help(input) {
    //add some kind of help for various functions (like rendering)
    fancyRender("general", "lightgray")
    for (var i=0; i<terminalFunctions.length; i++) {
        print(terminalFunctions[i]);
    }
    fancyRender("functions", "lightgray")
    if (typeof hookCommands != "undefined" && hookCommands.length > 0) {
        for (var i=0; i<hookCommands.length; i++) {
            print(hookCommands[i]);
        }
    }
    fancyRender("bookmarks", "lightgray")
    if (typeof bookmarks != "undefined" && bookmarks.length > 0) {
        for (var i=0; i<bookmarks.length; i++) {
            print(bookmarks[i][0]);
        }
    }
}

function ls(input) {
    //horrible. converts input to a string by adding an empty string.
    if(input.slice(input.length - 2, input.length) + "" === "-b") {
        fancyRender("bookmarks", "lightgray")
        if (typeof bookmarks != "undefined" && bookmarks.length > 0) {
            for (var i=0; i<bookmarks.length; i++) {
                print(bookmarks[i][0]);
            }
        }
        return;
    }
    if(input.slice(input.length - 2, input.length) + "" === "-f") {
        fancyRender("functions", "lightgray")
        if (typeof hookCommands != "undefined" && hookCommands.length > 0) {
            for (var i=0; i<hookCommands.length; i++) {
                print(hookCommands[i]);
            }
        }
        return;
    }
    help(input)
}

function randRange(n) {
  return Math.ceil(Math.random() * n);
}

function rollDie(args) {
    print(randRange(Number(args.substr(1))));
}

function echo(args) {
    if (args.length == 0) {
        print("usage: echo [text]")
        return
    }
    print(args.join(" "));
}

function re(s) {
    location.reload();
}

function render(args) {
    var usage = "usage: render [text]; [color] [size]"
    if (args.length === 0) {
        print(usage)
        return
    }
    args = args.join(" ").split("; ")
    if (args.length === 1) {
        print(usage)
    }
    var cssVars = args[1].split(" ")
    if (args.length != 2) {
        print(usage)
        return
    }
    fancyRender(args[0], cssVars[0], cssVars[1]);
}

function search(s) {
    print("Usage: [query] -x")
    print("x is a switch for: ")
    print("a:   amazon")
    print("m:   wolfram alpha")
    print("v:   vimeo")
    print("w:   wikipedia")
    print("y:   youtube")
}

//====================  HISTORY  ===================================
//keep duplicates from being added, change "" to &nbsp;
var lastInputs = [""]
var inputIndex = 0;

//adds to the beginning of the array
function addInput(str) {
    if (str === "") str = "&nbsp;";
    if (lastInputs[0] === str) return;
    if (lastInputs.length > 0) {
        if (lastInputs[lastInputs.length - 1] != str) lastInputs.unshift(str)
    } else lastInputs.unshift(str);
}

//====================  TAB AUTO-COMPLETION ========================
function autocomplete(string) {
    //first search term commands, then maybe hooked commands
    for (var i=0; i<terminalFunctions.length; i++) {
        if (terminalFunctions[i].indexOf(string) === 0) {
            document.getElementById("input").innerHTML = terminalFunctions[i];
            return;
        }
    }
    //if hook commands exist
    if (typeof hookCommands != "undefined" && hookCommands.length > 0   ) {
        for (var i=0; i<hookCommands.length; i++) {
            if (hookCommands[i].indexOf(string) === 0) {
                document.getElementById("input").innerHTML = hookCommands[i];
                return;
            }
        }
    }
    if (typeof bookmarks != "undefined" && bookmarks.length > 0) {
        for (var i=0; i<bookmarks.length; i++) {
            console.log(bookmarks[i])
            if(bookmarks[i][0].indexOf(string) === 0) {
                document.getElementById("input").innerHTML = bookmarks[i][0];
                return;
            }
        }

    }
}

//====================  SEARCHING ==================================
function searchString(query) {
    var original = query;
    var modifier = query.substr(query.length-2);
    query = query.slice(0, query.length-3); //remove " -x"
    switch (modifier) {
        case "-a":
            window.location = "http://www.smile.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=" +
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
    }
    return false;
}
