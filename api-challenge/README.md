##The Challenges
####Reverse a String
This was fairly straightforward; I split the string to an array to take advantage of Javascript's native `reverse()` function.

###Needle in a Haystack
To find a string in an array of strings, `indexOf()` was all I needed, along with some error handling if it wasn't found.

###Prefix
To create an array of all strings not matching a certain prefix, I made sure `indexOf(prefix)` wasn't 0 for each word. If not, it's a hit.
They're logged to the terminal as they're found and packaged into an array.

###The Dating Game
Adding seconds to a hard-to-parse ISO 8601 datestamp would be nontrivial, but thanks to Javascript's `Date` object, most of the heavy lifting is already done. I just converted it to a new `Date` object and then `setSeconds()` to `oldDate.getSeconds() + interval`.

---
##How It Works
I decided to build a terminal emulator in HTML/CSS/JS from scratch as a platform for the API challenge.

####Features include:
- Easy scripthook integration
- Tab auto-completion and echo commands
- History, searchable with arrow keys
- A tiny, multi-color text rendering engine
- Evaluate console commands with a ~ prefix
- Riddles and secrets for nerds

[Let's go check it out.](http://adriangarza.github.io/api-challenge/)
