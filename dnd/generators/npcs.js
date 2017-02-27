function randNPC() {
    $("#outcome-title").text(getRand(firstfirst) + getRand(firstsecond) +
     " " + getRand(secondfirst) + getRand(secondsecond));

     var output = getRand(races)

     if (Math.random() < .1) {
         output += " " + getRand(classes).toLowerCase() + "."
     } else {
         output +=" "+getRand(jobs).toLowerCase() + ".";
     }

     if (Math.random() < .2) {
         output += " " + getRand(voicequality) + "-voiced."
     }

     if (Math.random() < .2) {
         output += " " + getRand(accent) + " accent."
     }


     if (Math.random() < .8) {
         output += " " + getRand(eyes)
     }

     if (Math.random() < .2) {
         output += " " + getRand(ears)
     }

     if (Math.random() < .2) {
         output += " " + getRand(mouth)
     }

     if (Math.random() < .2) {
         output += " " + getRand(nose)
     }

     if (Math.random() < .2) {
         output += " " + getRand(chin)
     }

     if (Math.random() < .8) {
         output += " " + getRand(hair)
     }

     if (Math.random() < .3) {
         output += " " + getRand(other)
     }

     if (Math.random() < .3) {
         output += " " + getRand(other)
     }

     if (Math.random() < .9) {
         output += " " + getRand(height)
     }

     if (Math.random() < .6) {
         output += " " + getRand(bodytype)
     }

     if (Math.random() < .3) {
         output += " " + getRand(hands)
     }

     if (Math.random() < .1) {
         output += " " + getRand(scar)
     }

     if (Math.random() < .1) {
         output += " " + getRand(tattoo)+" "+getRand(tatlocations)+"."
     }

     if (Math.random() < .1) {
         output += " " + getRand(jewelry)
     }

     if (Math.random() < .5) {
         output += " " + getRand(personality) + "."
     }

     if (Math.random() < .3) {
         output += " " + getRand(faith)
     }

     if (Math.random() < .4) {
         output += " Hates " + getRand(hates).toLowerCase()
     }

     if (Math.random() < .3) {
         output += " " + getRand(flaws)
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
    "onne", "elle", "ora", "reya", "ithe", "ylia", "igna", "elonia",
    "awn", "anela", "usse", "ivala", "ina", "enne", "ama"
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
    "Human", "Dwarf", "Elf", "Gnome", "Halfling", "Half-elf", "Half-orc"
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

var eyes = [
    "Sleepy eyes.", "Shifty eyes.", "Watery eyes.", "Bright eyes.", "Cold eyes.", "Smiling eyes.",
    "Close-set eyes.", "Wild eyes.", "Distant eyes.", "A lazy eye.", "Piercing eyes.", "Watchful eyes.",
    "Dark eyes.", "Hooded eyes.", "Eyes of two different colors.", "Slightly crossed eyes.",
    "Wide eyes.", "Beautiful eyes.", "Beady eyes.", "Penetrating eyes.",
]

var ears = [
    "Over-sized ears.", "Long ear lobes.", "Small ears.", "Uneven ears.", "Hairy ears.", "Pointy ears.",
    "Short ear lobes.", "Ears that stick out.", "Jug-handle ears.", "Elaborately pierced ears.",
    "Cauliflower ears.", "Ears with improbable tufts of hair.",
]

var mouth = [
    "Full lips.", "Buck teeth.", "Thin lips.", "Gray teeth.", "Crooked teeth.", "A broken or missing tooth.",
    "Pursed lips.", "Dry, cracked lips.", "One or more false teeth.", "A mouth that hangs open.",
]

var nose = [
    "A crooked nose.", "A bulbous nose.", "A narrow nose.", "A button nose.", "A long nose.", "A broad nose.",
    "An angular nose.", "A round nose.", "A broken nose.", "A hawk-like nose.", "A wide nose.",
    "A delicate nose.",
]

var chin = [
    "A pronounced chin.", "A cleft chin.", "A dimple on the chin.", "A rounded chin.", "A sharp jawline.",
    "A square jaw.", "A round jaw.", "An underbite.",
]

var hair = [
    "Thick hair.", "Wispy hair.", "Straight hair.", "Wavy hair.", "Curly hair.", "Wiry hair.", "Oily hair.",
    "Lush hair.", "Poofy hair.", "Long braids.", "Braids tight against the head.", "Very long hair.",
    "Greasy hair.", "Unruly hair.", "An unusual hairstyle.", "An outdated hairstyle.", "A high-maintenance hairstyle.",
    "Short-cropped hair.", "A shaved head.", "No hair at all.",
]

var other = [
    "High cheekbones.", "Tight, drawn cheeks.", "Chubby cheeks.",
    "A large mole.", "A beauty mark.", "Freckles.", "Terrible scarring.",
]

var height = [
    "Unusually short.", "Short in stature.", "Average height.", "Slightly above average height.",
    "Well above average height.", "Unusually tall.",
]

var bodytype = [
    "Thin and delicate.", "Of average build.", "Well-muscled.", "Slightly overweight.", "Grotesquely obese.",
    "Lean and lanky.", "Lithe and lean.", "Thin and wiry.", "Sinewy and strong.", "Flabby and weak.",
    "Lumpy or bent.", "Thin and flimsy.", "Soft and chubby.", "Thin and petite.", "Pudgy.", "Big and broad.",
    "Stocky and strong.", "Bony.", "Wide and ponderous."
]

var hands = [
    "Powerful hands.", "Delicate hands.", "Rough hands.", "Soft hands.", "A light touch.", "A heavy touch.",
]

var scar = [
    "A jagged scar.", "A dark purple scar.", "An angry red scar.", "A long, thin scar.",
]

var tattoo = [
    "A dagger tattoo", "An arrow tattoo", "An anchor tattoo", "A skull tattoo", "A pair of crossed bones tattoo",
    "A snake tattoo", "A scorpion tattoo", "A spider web tattoo", "A heart tattoo", "A ring of thorns tattoo",
    "A mermaid tattoo", "A dragon tattoo", "A tattoo with their mother's name"
]

var tatlocations = [
    "under the left nipple", "on the chest", "on the side of the neck", "under one eye", "on the lower back",
    "on their arm", "on their wrist", "around one bicep", "on their leg",
]

var jewelry = [
    "An earring.", "Two earrings.", "A small chain about the neck.", "A large chain about the neck.",
    "A tight choker about the neck.", "A brooch.", "A ring.", "Several rings.", "A bracelet.",
    "A nose ring.", "A medallion.", "An ornate belt.",
]

var personality = [
    "Compassionate", "Cheerful", "Reserved", "Outspoken", "Uninterested", "Gruff", "Eager", "Deceitful",
    "Foolish", "Strict", "Agreeable", "Mischeivious", "Angry", "Fearful", "Manipulative", "Devout", "Greedy",
    "Funny", "Dour", "Fun-Loving", "Lazy", "Driven", "Boastful", "Artistic", "Assertive", "Carefree", "Cautious",
    "Confident", "Thoughtful", "Loyal", "Sophisticated", "Weak-Willed",
]

var faith = [
    "Quiet true believer.", "Casual observer.", "Critical student.", "Outspoken cynic.", "Open-minded seeker.",
    "Broken heretic.", "Cautious listener.", "Fanatical true believer.",
]

var hates = [
    "Other genders.", "Children.", "Teenagers.", "The elderly.", "Ruling class and authority figures.",
    "Powerful rich.", "Destitute poor.", "Beggars.", "Drunks.", "Drug-users.", "Farmers.", "Artists.",
    "Clergy.", "Soldiers.", "Fishermen.", "Harlots.", "Miners.", "Merchants.", "Scholars.", "Herders.",
    "Sailors.", "Mages.", "Dwarves.", "Elves.", "Gnomes.", "Goblins.", "Halflings.", "Humans.", "Orcs.", "Reptiles.",
    "Themselves.",
]

var flaws = [
    "Fidgets.", "Drinks too much.", "Eats too much.", "Swears often.", "Has poor hygiene.", "Can’t resist flirting.",
    "Can’t stop staring.", "Sweats profusely and easily.", "Is a habitual liar.", "Embellishes the truth.",
    "Exaggerates details.", "Has a short temper.", "Is melodramatic.", "Gossips.", "Chews with an open mouth.",
    "Often sniffs audibly.", "Believes what you tell them.", "Is skeptical of everything.",
    "Paces.", "Makes poor eye contact.",
]
