$("#apps").click(function() {
    updateTabs("apps");
})

$("#games").click(function() {
    updateTabs("games");
})

$("#personal").click(function() {
    updateTabs("personal");
})

$("#about").click(function() {
    updateTabs("about");
})

$("#writing").click(function() {
    updateTabs("writing");
})

function hideAll() {
    $("#appslist,#gameslist,#personallist,#writinglist,#aboutlist").hide();
}

function updateTabs(input) {
    hideAll()
    $("#apps,#games,#personal,#writing,#about").removeClass("activetab");
    //show the list
    $("#" + input + "list").fadeIn(200);
    currentList = input;

    //update the css for the tabs
    $("#" + input).addClass("activetab");

    var tmpWidth = $("#" + input).width();
    var tmpPos = $("#" + input).offset().left;

    $("#line").css("width", tmpWidth + "px");
    $("#line").css("margin-left", tmpPos + "px");

}

updateTabs("about");
