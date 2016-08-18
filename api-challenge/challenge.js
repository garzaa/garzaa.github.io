function hook(str) {

    if (str[0] == "~") {
        eval(str.slice(1, str.length))
        return true
    }

    if (terminalFunctions.indexOf(input) > -1) {
        //call it as a function
        window[input](str);
        return true;
    }

}

//==================== CHALLENGE COMMANDS ==========================
var hookCommands = ["start"];

function start(str) {
    print("coming soon!")
}
