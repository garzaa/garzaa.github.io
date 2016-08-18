var currentFont = 1;
var cardOn = false;
var nightOn = false;

function downloadInnerHtml(filename, elId, mimeType) {
    var elHtml = document.getElementById(elId).innerHTML;

    //replace divs with newlines
    elHtml = elHtml.replace("<div>","");
    elHtml = elHtml.split("<div>").join("\n");

    //and then get rid of all the HTML tags
    elHtml = elHtml.replace(/(<([^>]+)>)/ig,"");
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';

    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
}

var fileName =  'untitled.txt';

function download() {
    downloadInnerHtml(fileName, 'editor','text/html');
}

window.onload = function() {
    document.getElementById("editor").focus();
    if (localStorage.theme) {
        switch(localStorage.theme) {
            case "night":
                toggleNight();
                break;
            case "card":
                toggleCard();
                break;
        }
    } else {
        localStorage.theme = "default"
    }

    if (localStorage.getItem("document")) {
        editor.innerHTML = localStorage.getItem("document")
    }
};

var fonts = [
    "Roboto",
    "Roboto Mono",
    "Droid Serif"
]

function switchFont() {
    if (currentFont < fonts.length-1) {
        currentFont++;
    } else currentFont = 0;
    $("body").css("font-family", fonts[currentFont]);
}

$(window).bind('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && !event.shiftKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
            event.preventDefault();
            download();
            break;
        case 'e':
            event.preventDefault();
            switchFont();
            break;
        case 'y':
            event.preventDefault();
            toggleNight();
            break;
        case 'i':
            event.preventDefault();
            toggleCard();
            break;
        }
    }
    else if ((event.ctrlKey || event.metaKey) && event.shiftKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
            event.preventDefault();
            localStorage.setItem("document", editor.innerHTML);
            break;
        }
    }
});

$("#editor").bind('keydown', function(event) {
    //tab
    if (event.which == 9) {
        //alert("bepis")
        event.preventDefault();
        var editor = document.getElementById("editor");
        var doc = editor.ownerDocument.defaultView;
        var sel = doc.getSelection();
        var range = sel.getRangeAt(0);

        var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
        range.insertNode(tabNode);

        range.setStartAfter(tabNode);
        range.setEndAfter(tabNode);
        sel.removeAllRanges();
        sel.addRange(range);
    }
})

function toggleCard() {
    var editor = document.getElementById("editor");
    var body = document.body;
    if (nightOn) toggleNight();
    if (cardOn) {
        localStorage.theme = "default"
        editor.className = ""
        editor.style.backgroundColor = "#f1f1f1";
    } else {
        localStorage.theme = "card"
        editor.className = "card"
        body.style.backgroundColor = "#f1f1f1"
        editor.style.backgroundColor = "white";
    }
    cardOn = !cardOn
}

function toggleNight() {
    var editor = document.getElementById("editor");
    var body = document.body;
    if (cardOn) toggleCard();
    if (nightOn) {
        localStorage.theme = "default"
        editor.style.color = "rgb(50, 50, 50)"
        body.style.backgroundColor = "#f1f1f1";
        editor.style.backgroundColor = "#f1f1f1";
    } else {
        localStorage.theme = "night"
        body.style.backgroundColor = "rgb(33, 37, 43)";
        editor.style.backgroundColor = "rgb(40, 44, 52)";
        editor.style.color = "rgb(200, 200, 200)"
    }
    nightOn = !nightOn
}
