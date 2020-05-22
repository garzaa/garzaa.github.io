function d(sides) {
    return Math.floor(Math.random() * Math.floor(sides))+1;
}

function multiDice(numDice, sides) {
    var total = 0;
    for (var i=0; i<numDice; i++) {
        total += d(sides);
    }
    return total;
}

function randomLoot() {
    return lootTable[Math.floor(Math.random() * lootTable.length)];
}

function parseDice(lootStr) {
    // matches 1D6 x2, with that spacing and formatting
    // capture zero is the full match
    // captures three and five are unused
    var diceRegex = /(\d+)D(\d+)(\s.*x(\d+))?(?!\s+damage)/i;
    var matches = lootStr.match(diceRegex);

    if (matches === null) return lootStr;

    var numDice = Number(matches[1]) || 1;
    var diceSize = Number(matches[2]);
    var multiplier = Number(matches[4]) || 1;

    var newText = "" + (multiDice(numDice, diceSize) * multiplier);
    return lootStr.replace(matches[0], newText);
}

function loot(amount) {
    var lootArr = []
    for (var i=0; i<amount; i++) {
        var lootStr = randomLoot();
        lootStr = parseDice(lootStr);
        lootArr.push(lootStr)
    }
    return lootArr;
}

function toUl(arr) {
    var h = "";
    for (var i=0; i<arr.length; i++) {
        h += "<li>"+arr[i]+"</li>\n";
    }
    return h;
}

function lootToList(lootAmount) {
    document.getElementById("loot").innerHTML = toUl(loot(lootAmount));
}