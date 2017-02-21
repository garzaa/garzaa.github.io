var currentScene = 0;

function format(s) {
    //add <p> tags between newline (\n) characters
    s = s.split("\n")
    for (var i = 0; i < s.length; i++) {
        s[i] = "<p>" + s[i] + "</p>"
    }
    s = s.join("\n")


/*
    Finds words that start with $ in the text, and updates them with formatted
    links to another scene object.

    Link format:
    [variablename](link text)
*/

    //add links, following the format above
    var matches = s.match(/\[[^\]]*\]\([^\)]*\)/g)
    for (var i=0; i<matches.length; i++) {
        var linkArr = matches[i].replace("[", "").replace(")", "").split("](")
        s = s.replace(matches[i],
            "<span class='scene-link enabled' onclick=loadScene(" +
            linkArr[0] + ")>" +
            linkArr[1] + "</span>"
        )
    }
    return s;
}

function loadScene(scene) {
    //add the new scene
    $("#main").append(
        "<div id='scene" + currentScene + "'>" +
        format(scene.text) +
        "</div>"
    )

    //call the optional onLoad function
    if (scene.hasOwnProperty("onLoad")) {
        scene.onLoad();
    }

    //remove the links on the last scene
    RecursiveUnbind($("#scene" + (currentScene - 1) + ""))
    $("#scene" + (currentScene - 1) + " span").removeClass("enabled")
    currentScene++;
}

function RecursiveUnbind($jElement) {
    // remove this element's and all of its children's click events
    // taken from StackOverflow
    $jElement.unbind();
    $jElement.removeAttr('onclick');
    $jElement.children().each(function () {
        RecursiveUnbind($(this));
    });
}
