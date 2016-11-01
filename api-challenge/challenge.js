var github = 'https://github.com/adriangarza/code2040';
var token = '0cd6f780d84211209711168429d70d68';
var endpoint = 'http://challenge.code2040.org/api/register';

function hook(str, args) {

    if (str[0] == '~') {
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
var hookCommands = ['start', 'reverse', 'haystack', 'prefix', 'timestamp', 'all'];

//shorthand for synchronous ajax posting, takes a URL and dictionary
//and automatically adds the key
function shortPost(endpoint, dict) {
    return $.ajax({
        type: "POST",
        async: false,
        url: endpoint,
        data: JSON.stringify(dict),
        dataType: 'text',
        contentType: 'application/json',
    }).done(function() {
        print("Done.")
    }).error(function(xhr, data, error) {
        fancyRender(error, "indianred")
    })
}

function start(str) {
    //step one, registering
    fancyRender("Step one: Register", "lightgray")
    print('Connecting to endpoint ' + endpoint  + '...')

    $.ajax({
        type: 'POST',
        async: false,
        url: 'http://challenge.code2040.org/api/reverse',
        data: JSON.stringify({'token': token, 'github': github}),
        dataType: 'text',
        contentType: 'application/json',
    }).error(function(xhr, status, error){
        fancyRender(error, "indianred")
    }).success(function() {
        print("Successfully registered.")
    })
    print("Type \"reverse\" to try the next challenge.")
}

function reverse(str) {
    //step two, string reversal
    fancyRender("Step two: Reverse a string", "lightgray")
    print('Getting a string to reverse...')
    var result = $.ajax({
        type: 'POST',
        async: false,
        url: 'http://challenge.code2040.org/api/reverse',
        data: JSON.stringify({'token': token}),
        dataType: 'text',
        contentType: 'application/json',
    })
    //now we"ve gotten the string to reverse.
    print('String to reverse: ' + result.responseText)
    var reversed = result.responseText.split('').reverse().join('');
    print('Reversed version: ' + reversed)
    print('Validating...')
    shortPost('http://challenge.code2040.org/api/reverse/validate',
        {'token': token, 'string': reversed})
    print("Type \"haystack\" to try the next challenge.")
}

function haystack(str) {
    //step three, needle and haystack
    fancyRender("Step three: Needle in a haystack", "lightgray")
    print('Getting a needle and a haystack...')
    result = shortPost('http://challenge.code2040.org/api/haystack',
        {'token': token})
    print('Parsing dictionary...')
    var parsedDict = JSON.parse(result.responseText);
    var needle = parsedDict.needle;
    var haystack = parsedDict.haystack;
    print('Looking for string "' + needle + '"...')
    var foundIndex = haystack.indexOf(needle);
    foundIndex < 0 ? print('"' + needle + '" not found!') : print('"' + needle + '" found at position ' + foundIndex + '.')
    print('Validating...')
    shortPost('http://challenge.code2040.org/api/haystack/validate',
        {'token': token, 'needle': foundIndex})
    print("Type \"prefix\" to try the next challenge.")
}

function prefix(str) {
    //step four, prefix
    fancyRender("Step four: Prefix", "lightgray")
    print('Getting strings and a prefix...')
    result = shortPost('http://challenge.code2040.org/api/prefix',
        {'token': token})
    print('Parsing dictionary...')
    var parsedDict = JSON.parse(result.responseText);
    var prefix = parsedDict.prefix;
    haystack = parsedDict.array;
    print('Prefix to exclude: ' + prefix);
    print('Searching...')
    var matches = []
    for(var i=0; i<haystack.length; i++) {
        if (haystack[i].indexOf(prefix) != 0) {
            print('Found a match: ' + haystack[i])
            matches.push(haystack[i]);
        }
    }
    print('Validating...')
    shortPost('http://challenge.code2040.org/api/prefix/validate',
        {'token': token, 'array': matches})
    print("Type \"timestamp\" to try the next challenge.")
}

function timestamp(str) {
    fancyRender("Step 5: The dating game", "lightgray")
    print('Getting a date and an interval...')
    result = shortPost('http://challenge.code2040.org/api/dating',
        {'token': token})
    print('Parsing dictionary...')
    var parsedDict = JSON.parse(result.responseText);
    var datestamp = parsedDict.datestamp;
    var interval = parsedDict.interval;
    print('Starting date: ' + datestamp)
    print('Interval to add (in seconds): ' + interval);
    var tempDate = new Date(datestamp)
    tempDate.setSeconds(tempDate.getSeconds() + interval);
    var newDate = tempDate.toISOString();
    var dateString = newDate.split(".")[0] + 'Z'
    print("New date: " + dateString);
    print("Validating...")
    shortPost('http://challenge.code2040.org/api/dating/validate',
        {'token': token, 'datestamp': dateString})
    print(" ")
    print("And that's all the challenges! Check out my <a href='https://github.com/adriangarza/code2040/' target='_blank'>GitHub Page</a> for more info, or play around using the following commands:")
    for(var i=0; i<terminalFunctions.length; i++) {
        print(terminalFunctions[i])
    }
}

function all(str) {
    //step one, registering
    fancyRender("Step one: Register", "lightgray")
    print('Connecting to endpoint ' + endpoint  + '...')

    $.ajax({
        type: 'POST',
        async: false,
        url: 'http://challenge.code2040.org/api/reverse',
        data: JSON.stringify({'token': token, 'github': github}),
        dataType: 'text',
        contentType: 'application/json',
    }).error(function(xhr, status, error){
        fancyRender(error, "indianred")
    }).success(function() {
        print("Successfully registered.")
    })
    print(" ")

    //step two, string reversal
    fancyRender("Step two: Reverse a string", "lightgray")
    print('Getting a string to reverse...')
    var result = $.ajax({
        type: 'POST',
        async: false,
        url: 'http://challenge.code2040.org/api/reverse',
        data: JSON.stringify({'token': token}),
        dataType: 'text',
        contentType: 'application/json',
    })
    //now we"ve gotten the string to reverse.
    print('String to reverse: ' + result.responseText)
    var reversed = result.responseText.split('').reverse().join('');
    print('Reversed version: ' + reversed)
    print('Validating...')
    shortPost('http://challenge.code2040.org/api/reverse/validate',
        {'token': token, 'string': reversed})
    print(" ")

    //step three, needle and haystack
    fancyRender("Step three: Needle in a haystack", "lightgray")
    print('Getting a needle and a haystack...')
    result = shortPost('http://challenge.code2040.org/api/haystack',
        {'token': token})
    print('Parsing dictionary...')
    var parsedDict = JSON.parse(result.responseText);
    var needle = parsedDict.needle;
    var haystack = parsedDict.haystack;
    print('Looking for string "' + needle + '"...')
    var foundIndex = haystack.indexOf(needle);
    foundIndex < 0 ? print('"' + needle + '" not found!') : print('"' + needle + '" found at position ' + foundIndex + '.')
    print('Validating...')
    shortPost('http://challenge.code2040.org/api/haystack/validate',
        {'token': token, 'needle': foundIndex})
    print(" ")

    //step four, prefix
    fancyRender("Step four: Prefix", "lightgray")
    print('Getting strings and a prefix...')
    result = shortPost('http://challenge.code2040.org/api/prefix',
        {'token': token})
    print('Parsing dictionary...')
    var parsedDict = JSON.parse(result.responseText);
    var prefix = parsedDict.prefix;
    haystack = parsedDict.array;
    print('Prefix to exclude: ' + prefix);
    print('Searching...')
    var matches = []
    for(var i=0; i<haystack.length; i++) {
        if (haystack[i].indexOf(prefix) != 0) {
            print('Found a match: ' + haystack[i])
            matches.push(haystack[i]);
        }
    }
    print('Validating...')
    shortPost('http://challenge.code2040.org/api/prefix/validate',
        {'token': token, 'array': matches})
    print(" ")

    //step five, the dating game
    fancyRender("Step 5: The dating game", "lightgray")
    print('Getting a date and an interval...')
    result = shortPost('http://challenge.code2040.org/api/dating',
        {'token': token})
    print('Parsing dictionary...')
    var parsedDict = JSON.parse(result.responseText);
    var datestamp = parsedDict.datestamp;
    var interval = parsedDict.interval;
    print('Starting date: ' + datestamp)
    print('Interval to add (in seconds): ' + interval);
    var tempDate = new Date(datestamp)
    tempDate.setSeconds(tempDate.getSeconds() + interval);
    var newDate = tempDate.toISOString();
    var dateString = newDate.split(".")[0] + 'Z'
    print("New date: " + dateString);
    print("Validating...")
    shortPost('http://challenge.code2040.org/api/dating/validate',
        {'token': token, 'datestamp': dateString})
    print(" ")

}
