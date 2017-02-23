function randNPC() {
    $("#outcome-title").text(getRand(firstfirst) + getRand(firstsecond) +
     " " + getRand(secondfirst) + getRand(secondsecond));

     var output = getRand(races)+" "+getRand(jobs).toLowerCase() + ".";

     if (Math.random() < .2) {
         output += " " + getRand(voicequality) + "-voiced."
     }

     if (Math.random() < .2) {
         output += " " + getRand(accent) + " accent."
     }

     if (Math.random() < .1) {
         output += " " + getRand(classes) + "."
     }

    $("#outcome-text").text(output)
}

var voicequality = [
    "Croaky", "Breathy", "Dead", "Flat", "Fruity", "Grating", "High", "Monotonous",
    "Deep", "Nasal", "Booming", "Gruff",
]

var accent = [
    "Unplaceable", "English", "Irish", "Scottish", "American", "Weird",
]

var firstfirst = [
    "And", "Pel", "Ter", "Tan", "Ab", "Okr", "Rem", "Dal", "Tar", "Lan", "Nol",
    "Ulf", "Col", "Xan", "Kur", "Er", "Qar", "Hoff", "Veyl", "Pul",
]

var firstsecond = [
    "on", "el", "or", "rey", "ram", "ithe", "over", "'em", "yl", "ixe", "ig", "elon",
    "emon", "ek", "aw", "anel", "us", "yme", "ival",
]

var secondfirst = [
    "Far", "Short", "Tall", "Full", "Storm", "Hard", "Hill", "Clear", "Wild", "Dark",
    "High", "Low", "Bright", "Dim", "Swift", "Oaken", "Dread", "Still", "Dawn", "Dusk",
    "Small", "Proud",
]

var secondsecond = [
    "church", "brook", "tree", "wood", "sea", "ridge", "stride", "river", "rider",
    "mane", "flame", "stone", "sworn", "seeker", "splitter", "bane", "jaw", "hammer",
    "water", "walker"
]

var races = [
    "Human", "Dwarf", "Elf", "Gnome", "Halfling", "Half-elf", "Half-orc", "Tiefling"
]

var classes = [
    "Barbarian",
    "Bard",
    "Druid",
    "Monk",
    "Paladin",
    "Ranger",
    "Sorcerer",
    "Warlock",
]

var jobs = [
    "Actor", "Advocate", "Advisor", "Animal handler", "Apothecary", "Architect",
    "Archivist", "Armorer", "Astrologer", "Baker", "Banker", "Barber", "Barkeep",
    "Blacksmith", "Bookseller", "Brewer", "Bricklayer", "Brothel keeper",
    "Buccaneer", "Butcher", "Caravanner", "Carpenter", "Cartographer",
    "Chandler", "Chef", "Clock maker", "Cobbler", "Cook", "Counselor",
    "Courtesan", "Courtier", "Cowherd", "Dancer", "Diplomat", "Distiller",
    "Diver", "Farmer", "Fisherman", "Fishmonger", "Gardener", "General",
    "Gladiator", "Glovemaker", "Goldsmith", "Grocer", "Guardsman", "Guildmaster",
    "Hatmaker", "Healer", "Herald", "Herbalist", "Hermit", "Historian", "Hunter",
    "Ice seller", "Innkeeper", "Inventor", "Jailer", "Jester", "Jeweler",
    "Judge", "Knight", "Lady", "Leatherworker", "Librarian", "Linguist",
    "Locksmith", "Lord", "Lumberjack", "Mason", "Masseur", "Merchant", "Messenger",
    "Midwife", "Miller", "Miner", "Minister", "Minstrel", "Monk", "Mortician",
    "Necromancer", "Noble", "Nun", "Nurse", "Officer", "Painter", "Patissier",
    "Perfumer", "Philosopher", "Physician", "Pilgrim", "Potter", "Priest",
    "Privateer", "Professor", "Roofer", "Ropemaker", "Rugmaker", "Saddler",
    "Sailor", "Scabbard maker", "Sculptor", "Scavenger", "Scholar", "Seamstress",
    "Servant", "Shaman", "Shepherd", "Ship's captain", "Silversmith", "Slave",
    "Slaver", "Smith", "Soldier", "Spice Merchant", "Squire", "Stablehand",
    "Stevedore", "Stonemason", "Steward", "Street seller", "Street sweeper",
    "Student", "Surgeon", "Surveyor", "Sailor", "Tanner", "Tavernkeeper",
    "Tax collector", "Teacher", "Thatcher", "Thief", "Torturer", "Town crier",
    "Toymaker", "Vendor", "Veterinarian", "Vintner", "Weaver", "Wetnurse",
    "Woodcarver", "Wood seller", "Wrestler", "Writer"
]
