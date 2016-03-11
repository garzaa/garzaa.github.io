function hook(str) {

    if (str[0] == "~") {
        eval(str.slice(1, str.length))
    }
    str = str.toLowerCase();

    if (!specialHandle(str)) {
        //do something
    }

}

function specialHandle(str) {
    switch(str) {
        case "ls":
            render("respect.py");
            render("airhorn.js")
            break;
        case "color":
            color();
            break;
        case "reset color":
            initCSS();
            break;
        case "airhorn.js":
            playAirhorn();
            break;
        case "respect.py":
            switchRoom(menu);
            break;
        case "help":
            render("ls<br>color<br>reset color<br>")
            render("")
            break;
        default:
            return null
    }
}
