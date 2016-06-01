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

function hideAll() {
    $("#appslist,#gameslist,#personallist,#aboutlist").hide();
}

function updateTabs(input) {
    hideAll();
    //show the list
    $("#" + input + "list").show();
    currentList = input;
    //update the css for the tabs
    $("#apps,#games,#personal,#about").css("color", "black");
    $("#" + input).css("color", "blue");
}

hideAll();
$("#appslist").show();

updateTabs("apps");
