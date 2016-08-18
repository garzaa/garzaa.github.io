$(document).click(function() {
    $("#input").focus();
})

$(document).ready(function() {
    init()
})

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
        } else if (key === 9) { //
            a.preventDefault();
            autocomplete(document.getElementById("input").innerHTML);
        }
    });

    //print("Welcome to my demo for the CODE2040 tech assessment.")
    //print("Type 'start' to get started, or 'help' for more options.")
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
        if (hook(input) != true) {
            print("Command " + "'" + input + "' not found. Type 'help' for more options.")
        }
    }

    document.getElementById('input').scrollIntoView();
}

function appendLastInput(text) {
    var inputBlobPre = '<p class="prompt">guest@demo:$&nbsp;</p><pre class="input-old">'
    var inputBlobSuf = '</pre></br>'
    $(inputBlobPre + text + inputBlobSuf).insertBefore("#prompt");
}

function print(text) {

    var pre = '<pre class="output">'
    var suf = '</pre>'

    $(pre + text + suf).insertBefore("#prompt");
}

//for fancy rendering
function render(text, color, size) {
    var pre = '<pre class="output" style="'
    if (color == undefined) {
        color = "inherit"
    }
    if (size == undefined) {
        size = "12"
    }
    pre += "color:" + color + "; "
    pre += "font-size:" + size + 'pt;"'

    pre += ">"
    var suf = '</pre>'
    $(pre + text + suf).insertBefore("#prompt");
}

//====================  TERMINAL FUNCTIONS  ========================
var terminalFunctions = ["about", "clear", "echo", "help", "history"];

function clear(input) {
    var data = '<p id="prompt" class="prompt">guest@demo:$&nbsp;</p><pre id="input" contenteditable="true" autofocus="true" spellcheck="false"></pre>'
    document.getElementById("terminal").innerHTML = data;
    init();
}

function about(input) {
    print("Terminal emulator v2.0 created by Adrian Garza, 2016.")
    print("Features include history and autocomplete functions. ")
}

function history(input) {
    //print in descending order, without printing the history command
    for (var h=lastInputs.length-1; h>0; h--) print(lastInputs[h]);
}

function help(input) {
    for (var i=0; i<terminalFunctions.length; i++) {
        print(terminalFunctions[i]);
    }
    print("---")
    if (typeof hookCommands != "undefined" && hookCommands.length > 0) {
        for (var i=0; i<hookCommands.length; i++) {
            print(hookCommands[i]);
        }
    }
}

function randRange(n) {
  return Math.ceil(Math.random() * n);
}

function rollDie(string) {
    print(randRange(Number(string.substr(1))));
}

function echo(input) {
    print(input);
}

//====================  HISTORY  ===================================
var lastInputs = []
var inputIndex = 0;

//adds to the beginning of the array
function addInput(str) {
    if (str === "") return;
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
}
