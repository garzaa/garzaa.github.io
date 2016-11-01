//init global variables
var emailacct = "adrianhgarza@gmail.com"
var githubacct = "http://adrianhgarza.github.io"
var userID, keyResult
var registered = false
var toReverse, reversed
var needle, haystack
var time, interval, newTime


//button event handlers
$("#start").click(function() {
	register()
})
$("#reverse").click(function() {
	tryReverseString()
})
$("#needle").click(function() {
	tryNeedle()
})
$("#prefix").click(function() {
	tryPrefix();
})
$("#timestamp").click(function() {
	tryTimestamp();
})
$("#grades").click(function() {
	tryGrades();
})

//writes text to the black code column
function render(text) {
	var output = "<p>" + text + "</p>"
	$("#code-column").prepend(output)
}

//overloading for pretty multicolored text
function render(text, color) {
	var output = "<p style='color:" + color + "'>" + text + "</p>"
	$("#code-column").prepend(output)
}

function reverseString(s) {
	return s.split("").reverse().join("")
}

function register() {
	sendKeys();
}

function tryReverseString() {
	registered ? getReverseString() : render("You must register first!", "red")
}

function tryNeedle() {
	registered ? getNeedle() : render("You must register first!", "red")
}

function tryPrefix() {
	registered ? getPrefix() : render("You must register first!", "red")
}

function tryTimestamp() {
	registered ? getTimestamp() : render("You must register first!", "red")
}

function tryGrades() {
	registered ? getGrades() : render("You must register first!", "red")
}

//for part 1, sends the email and Github info and stores the User ID in a global variable
function sendKeys() {
	render("Email: " + emailacct)
	render("Github URL: " + githubacct)
	render("Building JSON...")
	var dict = {"email": emailacct, "github": githubacct}
	render("JSON built!")
	render("Sending to Code2040 server...")
	var temp = $.post("http://challenge.code2040.org/api/register", JSON.stringify(dict))
		.done(function() {
			userID = temp.responseJSON.result
			render("User ID received as " + userID, "violet")
			render("Done!", "violet")
			//unlocks the next stages
			registered = true;
		})
	return temp;
}

//stage I: reverse a string
function getReverseString() {
	render("Requesting string from server...")
	var dict = {"token": userID}
	var temp = $.post("http://challenge.code2040.org/api/getstring", JSON.stringify(dict))
		.done(function() {
			toReverse = temp.responseJSON.result
			render("Word to reverse: " + toReverse)
			var reversed = reverseString(toReverse);
			render("Reversed: " + reversed, "cyan")
			render("Sending back the reversed word...")
			var dict = {"token": userID, "string": reversed}
			var returned = $.post("http://challenge.code2040.org/api/validatestring", JSON.stringify(dict))
				.done(function() {
					render("Done!", "cyan")
				})
		})
}

//stage II: needle in a haystack
function getNeedle() {
	render("Requesting array from server...")
	var dict = {"token":userID}
	var temp = $.post("http://challenge.code2040.org/api/haystack", JSON.stringify(dict))
		.done(function() {
			render("Array received!")
			needle = temp.responseJSON.result.needle
			haystack = temp.responseJSON.result.haystack
			render("Needle: " + needle, "")
			render("Searching...")
			//This feels like cheating, but it's so unnecessary to make
			//a loop and counter variable in Javascript
			var i = haystack.indexOf(needle);
			if (i<0) {
				render("Needle not found!", "orange")
			} else {
				render("Needle at index " + i + " in haystack", "chartreuse")
			}
			render("Sending back the result...")
			var dict = {"token": userID, "needle": i}
			var returned = $.post("http://challenge.code2040.org/api/validateneedle", JSON.stringify(dict))
				.done(function() {
					render("Done!", "chartreuse")
				})

		})
}

//stage III: prefix
function getPrefix() {
	render("Requesting array from server...")
	var dict = {"token":userID}
	var temp = $.post("http://challenge.code2040.org/api/prefix", JSON.stringify(dict))
		.done(function() {
			render("Array received!")
			var prefix = temp.responseJSON.result.prefix
			var array = temp.responseJSON.result.array
			render("Prefix: " + prefix)
			render("Searching...")
			var tempArray = [];
			for (var i=0; i<array.length; i++) {
				if (array[i].slice(0, prefix.length) != prefix) {
					tempArray.push(array[i])
				}
			}
			render("Found " + tempArray.length + " elements", "yellow")
			render("Sending back the result...")
			var dict = {"token":userID, "array":tempArray}
			var returned = $.post("http://challenge.code2040.org/api/validateprefix", JSON.stringify(dict))
				.done(function() {
					render("Done!", "yellow")
				})
		})
}

//stage IV: the dating game
function getTimestamp() {
	render("Requesting timestamp from server...")
	var dict = {"token":userID}
	var temp = $.post("http://challenge.code2040.org/api/time", JSON.stringify(dict))
		.done(function() {
			render("Timestamp received!")
			var time = temp.responseJSON.result.datestamp
			var interval = temp.responseJSON.result.interval
			render("Original time: " + time)
			render("Interval to add: " + interval + " seconds")
			render("Calculating...")

			//this is very hacky but it works!
			//turns the timestamp into a Date object, then the number of milliseconds since 1/1/1970
			var tempTime = Number(Date.parse(time))
			tempTime += (interval * 1000) //turns interval to milliseconds, adds it to the time
			var tempDate = new Date(tempTime) //turns those milliseconds into a Date object again
			var newTime = tempDate.toISOString(); //and reformats it as an ISO 8601 string
			render("New Timestamp: " + newTime, "orange")
			render("Sending back the result...")
			var dict = {"token":userID, "datestamp":newTime}
			var returned = $.post("http://challenge.code2040.org/api/validatetime", JSON.stringify(dict))
				.done(function() {
					render("Done!", "orange")
				})
		})
}

//renders the raw grades response to the "console"
function getGrades() {
	render("Requesting grades...")
	var dict = {"token":userID}
	var temp = $.post("http://challenge.code2040.org/api/status", JSON.stringify(dict))
		.done(function() {
			render("Grades received!", "crimson")
			console.log(temp)
			render(temp.responseText)
		})
}
