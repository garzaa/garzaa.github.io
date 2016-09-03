function hook(str, args) {

    if (str[0] == "~") {
        eval(str.slice(1, str.length))
        return true
    }

    if (hookCommands.indexOf(str) > -1) {
        //call it as a function
        window[str](args);
        return true;
    }

}

//==================== CHALLENGE COMMANDS ==========================
var github = "https://github.com/adriangarza/adriangarza.github.io/tree/master/api-challenge";
var token = "0cd6f780d84211209711168429d70d68";
var auth = JSON.stringify({"token": token, "github": github})

var hookCommands = ["start", "test"];

function start(str) {
    var endpoint = "http://challenge.code2040.org/api/register";
    print("connecting to endpoint " + endpoint)
    $.ajax({
        dataType: "jsonp",
        type: "POST",
        url: endpoint,
        async: false,
        data: auth,
    })
}

function test(str) {
    $.ajax({
        dataType: "jsonp",
        type: "POST",
        url: "http://challenge.code2040.org/api/reverse",
        async: false,
        data: auth,
        success: function(data) {
            print(data);
        }
    })
}
