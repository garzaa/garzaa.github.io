//some code from https://icecreamyou.github.io/MarkovText/

//character or word bigrams, the true struggle
//let's start with words
var bd = null;

/* 
build a distribution of word {
	nextWord: count
	nextWord: count
}
*/
function BigramDist(words) {
  this.dist = {};
  var lastWord = '';
  for (var i = 0, l = words.length; i < l; i++) {
    var word = words[i];
    if (lastWord) {
      var next = this.dist[lastWord] || {};
      next[word] = (next[word] || 0) + 1;
      this.dist[lastWord] = next;
    }
    lastWord = word;
  }
}

BigramDist.prototype.count = function(w1, w2) {
  return (this.dist[w1.toLowerCase()] || {})[w2.toLowerCase()] || 0;
};
BigramDist.prototype.freq = function(w1, w2) {
  return (this.count(w1, w2) / sumValues(this.dist[w1.toLowerCase()] || {})) || 0;
};
BigramDist.prototype.getRandomWord = function() {
  var keys = Object.keys(this.dist);
  return keys[(keys.length * Math.random()) | 0] || '';
};

function generate() {

	//get input text, remove whitespace, convert to list of chars
	var raw_text = document.getElementById("input").value.toLowerCase().split(/\s+/g);
	var wc = raw_text.length;
	if (!isNaN(Number(document.getElementById("wordcount").value))) {
		wc = Number(document.getElementById("wordcount").value);
		console.log("word count:" + wc);
	}
	

	console.log("creating word distributions")
	bd = new BigramDist(raw_text);

	console.log(bd.dist)

	console.log("generating")
	output.textContent = generateBigramSeq(bd, parseInt(wc, 10));
}

function generateBigramSeq(fdist, length, word) {
  word = word ? word.toLowerCase() : fdist.getRandomWord().toLowerCase();
  wordSeq = [word];
  var cycles = 0;
  while (wordSeq.length < length) {
    var r = Math.random(),
        s = 0,
        words = fdist.dist[word] || {};

    if (Object.keys(words).length === 0) {
    	break;
    }

    for (var next in words) {
      if (words.hasOwnProperty(next)) {
        s += fdist.freq(word, next);
        if (s > r) {
          wordSeq.push(next);
          word = next;
          break;
        }
      }
    }
    // Sanity check
    if (++cycles > length * 2) {
        if (window.console && console.log) console.log('too many cycles');
        break;
    }
  }
  return transformSyntax(wordSeq.join(' '));
}

function transformSyntax(s) {
  return s[0].toUpperCase() + s.substring(1).replace(/\.\s+\w/g, function(match) {
    return match.toUpperCase();
  }).replace(/\W*$/, '.');
}

function sumValues(obj) {
  var sum = 0;
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === 'number') {
      sum += obj[key];
    }
  }
  return sum;
}