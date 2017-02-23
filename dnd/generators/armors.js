var armors = {
    properties:[
        ["Veracity", "of veracity", "Add +2 to attack rolls. If the bearer speaks a lie, the item will burst into flame, dealing 6d6 fire damage."],
        ["Acolyte's", "of the Acolyte", "The bearer gains a +1 bonus to Wisdom (Religion) checks."],
        ["Amethyst", "of Amethyst", "Reduces psychic damage to the bearer by 2."],
        ["Arboreal", "of the Woodlands", "Treat as a +1 armor after the bearer has taken a long rest in a forest. If the bearer leaves the forest, this property becomes temporarily inert."],
        ["Arid", "of the Wastelands", "Treat as a +1 armor after the bearer has taken a long rest in a desert. If the bearer leaves the desert, this property becomes temporarily inert."],
        ["Astute", "of the Astute", "It takes half the time to don or doff this armor than a normal armor of this type."],
        ["Arctic", "of the North", "The bearer suffers no harm in temperature as cold as -20 degrees Fahrenheit."],
        ["Artisan's", "of the Artisan", "This armor is a swiss army knife of enchanted appendages that can take the form of any artisan's tools, from Alchemist's and Brewer's supplies to Weaver's and Woodcarver's tools (see p. 154 of the PHB for a complete set of artisan's tools)."],
        ["Barbarian's", "of the Barbarian", "The bearer gains a +1 bonus to Strength (Athletics) checks."],
        ["Bard's", "of the Bard", "The bearer gains +1 to Charisma (Performance) checks."],
        ["Blessed", "of Blessings", "Whenever bearer of this item receives divine healing, they gain an additional 1d4 hit points."],
        ["Bloodthirsty", "of Bloodthirst", "The bearer can expend a hit die to turn this into a +1 armor for 1d4 turns."],
        ["Burglar's", "of the Burglar", "The bearer gains +1 to Dexterity (Sleight of Hand) checks."],
        ["Cavernous", "of the Underdark", "Treat as a +1 armor after the bearer has taken a long rest in a cave. If the bearer leaves the cave, this property becomes temporarily inert."],
        ["Cardinal", "of the Lodestone", "The wielder can use an action to learn which way is north."],
        ["Cerulean", "of Storms", "Reduces lightning damage to the bearer by 2."],
        ["Channelling", "of Channelling", "Once per day, the bearer may ignore the Verbal and/or Somatic components of a spell they are casting."],
        ["Charitable", "of Charity", "If the bearer donates 100gp or more to a temple of a goodly deity, this becomes a +1 armor for the next 24 hours. If they go longer than a month without making any such donations, they gain a -1 AC penalty until a suitable donation is made."],
        ["Civilized", "of the Hearth", "Treat as a +1 armor after the bearer has taken a long rest in an living urban environment. If the bearer leaves the city, this property becomes temporarily inert."],
        ["Climber's", "of the Climber", "This armor is suited with harnesses, rope, and other climbing tools are readily in reach. The bearer may treat this armor as a climbing kit."],
        ["Concealing", "of Concealment", "The bearer may spend one action assembling components of this armor into a dagger. A person searching the bearer for weapons must make a DC 20 Intelligence (Investigation) check to discover this property."],
        ["Consecrated", "of Consecration", "Treat this as a +1 armor when the bearer is being attacked by Undead."],
        ["Crystalline", "of Crystal", "Treat as +1 armor until the bearer takes a critical hit, at which point it then loses this property."],
        ["Dancer's", "of the Dancer", "The bearer gains a +1 bonus to Dexterity (Acrobatics) checks."],
        ["Dazzling", "of Dazzling", "Once per day, the bearer may spend an action to ignite the magic in this armor, causing it to flare brilliantly. Any creature within a 10 foot radius must use their reaction to shield their eyes or be blinded until the end of their next turn."],
        ["Debtor's", "of Debts", "The first 1 bludgeoning, piercing, or slashing damage from any source is negated. However, the total amount of damage prevented from that day acts as a negative modifier on death saving throws. So, if the armor prevented 5 points of damage that day, the bearer has a -5 penalty on death saving throws."],
        ["Defensive", "of Defence", "Whenever the bearer takes a dodge action, they may move an additional 5 feet."],
        ["Deflecting", "of Deflection", "The bearer may spend their reaction to treat this as +1 armor vs. ranged weapon attacks until the beginning of their next turn."],
        ["Delver's", "of the Delver", "While underground, the bearer of this item always knows the item's depth below the surface and the direction to the nearest staircase, ramp, or other path leading upward."],
        ["Diplomatic", "of Diplomacy", "The bearer gains proficiency in a language of the DM's choice."],
        ["Druid's", "of the Druid", "The bearer gains a +1 bonus to Intelligence (Nature) checks."],
        ["Ephemeral", "of Transience", "Once per day, the bearer may spend their reaction to gain their Wisdom modifier to their AC until the beginning of their next turn."],
        ["Evasive", "of Evasion", "Whenever the wearer takes a dodge action, they gain +1 AC until the end of the turn."],
        ["Fair-weather", "of Fair-weather", "The bearer may treat this as +1 armor if the bearer has more than half of their maximum hit points."],
        ["False", "of Falsehoods", "The bearer gains a +1 bonus to Charisma (Deception) checks."],
        ["Favored", "of the Favored", "Once per day, the bearer may roll a saving throw with advantage."],
        ["Feinting", "of Feinting", "Whenever the bearer uses the help action in combat, they may treat this as a +1 armor until the beginning of their next turn."],
        ["Fen", "of the Glade", "Treat as a +1 armor after the bearer has taken a long rest in a swamp. If the bearer leaves the swamp, this property becomes temporarily inert."],
        ["Flanked", "of the Flanked", "The wearer may treat this as +1 armor if two or more enemies are adjacent to them."],
        ["First", "of Reflexes", "The bearer gain a +1 bonus to initiative rolls"],
        ["Fresh", "of Cleansing", "This armor never gets dirty and remains odorless, even in the most filthy dungeon."],
        ["Forgotten", "of the Forgotten", "The bearer may spend an action to attempt to ignite the old magic in this armor with a DC 13 Charisma check. If successful, treat this as a +1 armor as long as the bearer maintains concentration on this effect, maximum 10 minutes."],
        ["Furious", "of Fury", "Treat as a +1 armor when the bearer is raging."],
        ["Garnet", "of Garnet", "Reduces fire damage to the bearer by 2."],
        ["Glass", "of Glass", "The bearer may treat this as +1 armor as long as the bearer is at full health."],
        ["Granite", "of the Mountain", "Any effect that would move the bearer against their will is reduced in distance by 5 feet."],
        ["Grim", "of Coercion", "The bearer gains a +1 bonus to Charisma (Intimidation) checks if their armor is visible."],
        ["Harmonious", "of Harmony", "Attuning to this item takes only 1 minute."],
        ["Heroic", "of Heroes", "The bearer has advantage on saving throws vs. fear."],
        ["Histrionic", "of Histrionics", "the bearer gains +1 to Charisma (Performance) checks."],
        ["Holy", "of Faith", "When the bearer of this item rolls hit dice, they can choose to re-roll them and take the second result."],
        ["Inquisitor's", "of the Inquisitor", "The bearer gains a +1 bonus to Intelligence (Investigation) checks."],
        ["Inspired", "of Inspiration", "The bearer regains their Constitution modifier in temporary hit points whenever they gain or use inspiration."],
        ["Invisible", "of Invisibility", "Once worn, this armor turns invisible (although not the wearer)."],
        ["Lightweight", "of Mobility", "This armor is 10% lighter than normal armor of this type. If it has a Strength requirement to use, it is reduced by 1."],
        ["Loquacious", "of the Silver Tongue", "The bearer gains +1 to Charisma (Persuasion) checks."],
        ["Mage Killer's", "of the Mage Killer", "The bearer may spend their reaction to treat this as +1 armor vs. spell attacks until the beginning of their next turn."],
        ["Malachite", "of Malachite", "Reduces poison damage to the bearer by 2."],
        ["Masquarading", "of the Masquarade", "The bearer has advantage on skill checks involving disguise kits."],
        ["Medic's", "of the Caduceus", "Lined with pockets and compartments and stocked with medical supplies, the bearer may treat this armor as a healer's kit."],
        ["Moonlit", "of the Moon", "The bearer may treat this as +1 armor when moonlight is shining directly on this armor."],
        ["Mortals'", "of Mortals", "At the end of a turn where the bearer failed a death saving throw, the magic within this armor will attempt to stabilize the bearer. It rolls a Wisdom (Medicine) check with a +3 modifier."],
        ["Mournful", "of Sorrow", "When an ally falls unconscious in battle, the bearer gains a +1 AC bonus for the next 10 minutes. If that ally stabilizes or awakens, the bearer loses this bonus."],
        ["Obsidian", "of Obsidian", "Reduces acid damage to the bearer by 2."],
        ["Opal", "of Opal", "Reduces cold damage to the bearer by 2."],
        ["Pious", "of the Pious", "Whenever the bearer shaves their head, treat this as a +1 armor until the end of the day. They must wait a week until they have long enough hair to re-enact this ritual."],
        ["Prairie", "of the Plains", "Treat as a +1 armor after the bearer has taken a long rest in a grassland. If the bearer leaves the grassland, this property becomes temporarily inert."],
        ["Preacher's", "of the Preacher", "The bearer may extend the range of their Channel Divinity by 5 feet."],
        ["Precipice", "of the Crags", "Treat as a +1 armor after the bearer has taken a long rest in the mountains. If the bearer leaves the mountain, this property becomes temporarily inert."],
        ["Primeval", "of the Jungle", "Treat as a +1 armor after the bearer has taken a long rest in a jungle. If the bearer leaves the jungle, this property becomes temporarily inert."],
        ["Reflexive", "of Reflexes", "If the bearer is first in initiative order, treat this as +1 armor for 1 minute."],
        ["Renaissance", "of the Renaissance", "Once per day, the bearer may gain +1 to any skill check."],
        ["Resonant", "of Resonance", "The bearer can spend an action and 1 ki point to treat this as +1 armor for 1 minute."],
        ["Righteous", "of Righteousness", "Treat this as +1 armor during the day when attuned to a good aligned character."],
        ["Regal", "of Royalty", "This armor is richly decorated and fashionable. Although it retains a hint of the ruggedness of a military garment, it could function as well in a ballroom as the battlefield. To the outside observer, you appear to be keeping an Aristocratic lifestyle expense."],
        ["Runic", "of Runes", "Whenever bearer casts a spell, treat this as +1 armor until the beginning of their next turn."],
        ["Sacred", "of the Sacred", "The bearer may increase their Lay on Hands hit point pool by 5."],
        ["Sagacious", "of Acumen", "The bearer gains +1 to Wisdom (Insight) checks."],
        ["Sage's", "of the Sage", "The bearer gains a +1 bonus to Intelligence (History) checks."],
        ["Sailor's", "of the Sea", "Treat as a +1 armor after the bearer has taken a long rest on the high seas. If the bearer leaves the ocean, this property becomes temporarily inert."],
        ["Scribe's", "of the Scribe", "This armor unfolds to reveal animated appendages that are equipped with writing implements, magnifying glasses, and book stands. The armor aids the bearer in transcription tasks: it knows 3 languages of the DM's choice and halves the amount of time it takes the bearer to copy any text, including spells into spellbooks."],
        ["Shading", "of Shade", "The bearer suffers no harm in temperatures as high as 120 degrees Fahrenheit."],
        ["Shadow", "of Shadows", "Treat as a +1 armor when in dim light."],
        ["Shepherd's", "of the Shepherd", "The bearer gains a +1 bonus to (Wisdom) Animal Handling checks."],
        ["Shifting", "of Shifting", "The bearer may change minor aspects of the physical appearance of this item."],
        ["Silent", "of the Night", "If this armor imposed disadvantage to stealth, it no longer does. Otherwise, the bearer gains a +1 bonus to Dexterity (Stealth) checks."],
        ["Solar", "of the Sun", "The bearer may treat this as +1 armor when in direct sunlight."],
        ["Spiked", "of Teeth", "Whenever a creature begins their turn grappling or being grappled by the bearer, they take 1d4 piercing damage."],
        ["Spiritual", "of the Divine", "This armor is naught but a prayer written on a scrap of vellum, decorated with religious motifs of a particular god. Once per day, the bearer may spend 1 minute to read the prayer out loud, and at the end this armor will manifest and encase the bearer. The armor disappears if you act in any way that is not in accordance to the god's teachings."],
        ["Subtle", "of Subtleties", "The bearer gains proficiency in Thieves' Cant."],
        ["Surgeon's", "of the Surgeon", "The bearer gains a +1 bonus to Wisdom (Medicine) checks."],
        ["Tenacious", "of the Tenacious", "When the bearer takes a long rest, they gain back one additional hit die."],
        ["Tracker's", "of the Tracker", "The bearer gains a +1 to Wisdom (Survival) checks."],
        ["Trusty", "of Resurgence", "Treat this as +1 armor if the bearer has half their maximum hit points or less."],
        ["Turquoise", "of Turquoise", "Reduces thunder damage to the bearer by 2."],
        ["Twilight", "of Twilight", "Within 1 hour before or after the rising and setting of the sun, or during a solar eclipse, the armor comes alive with magic and the bearer may treat this as +1 armor."],
        ["Undertaker's", "of the Undertaker", "Once deceased, the body wearing this armor cannot be animated or raised from the dead."],
        ["Unyielding", "of the Unyielding", "The bearer may treat this as +1 armor if they have taken damage since the beginning of their last turn. This effect ends at the beginning of their next turn."],
        ["Vanguard", "of the Vanguard", "The bearer may spend their reaction to gain a +1 AC bonus vs. melee weapon attacks until the beginning of their next turn."],
        ["Veiled", "of the Veil", "The wearer gains a +1 bonus to Dexterity (Stealth) checks when taking a hide action."],
        ["Victorious", "of Victory", "Whenever the bearer kills a creature while wearing this amror, they gain temporary hit points equal to the creature's CR."],
        ["Vigilant", "of Vigilance", "The bearer gains +2 to their Passive Perception."],
        ["Vile", "of Villains", "Treat this as +1 armor at night when attuned to an evil aligned character."],
        ["Violent", "of Violence", "The bearer may choose to treat the heavy metal gauntlets of this armor as a Mace."],
        ["War Leader's", "of the War Leader", "The bearer can use an action to amplify their voice so that it clearly carries for up to 300 feet."],
        ["Warded", "of Wards", "The wearer cannot be possessed while wearing this armor."],
        ["Watcher's", "of the Watcher", "Treat as +1 armor during surprise rounds."],
        ["Waterborne", "of the Sea", "The item floats on water or other liquids. Its bearer has advantage on Strength (Athletics) checks to swim."],
        ["Winged", "of Wings", "The bearer gains +5 speed."],
        ["Wizard's", "of the Wizard", "The bearer gains a +1 to Intelligence (Arcana) checks."],
        ["Zen", "of Zen", "Treat this as +1 armor for one minute after meditating with it for one minute."],
        ["Zircon", "of Zircon", "Reduces force damage to the bearer by 2."],
        ["Alarming", "of Alarms", "Contains 1d4 unreplenishable charges of the Alarm spell (1st level)."],
        ["Astral", "of the Astral Sea", "When travelling the Astral Sea, it takes half the number of hours to locate a Color Pool to a specific plane. You have advantage on saving throws vs. the effects of Psychic Wind (DMG p. 47-48)"],
        ["Beastspeaker's", "of Beastspeakers", "Contains 1d4 unreplenishable charges of the Speak with Animals spell (1st level)."],
        ["Benedictine", "of Benediction", "Contains 1d4 unreplenishable charges of the Healing Word spell (1st level)."],
        ["Blasted", "of Blasting", "Contains 1d4 unreplenishable charges of the Fire Bolt spell (1st level)."],
        ["Bold", "of Boldness", "Contains 1d4 unreplenishable charges of the Heroism spell (1st level)."],
        ["Bountiful", "of Bounty", "Contains 1d4 unreplenishable charges of the Goodberry spell (1st level)."],
        ["Cartographic", "of Cartography", "On its own volition, the item records a map of the environments that the bearer is exploring, and can magically project it for the bearer to see."],
        ["Chill", "of Chills", "Contains 1d4 unreplenishable charges of the Ray of Frost spell (1st level)."],
        ["Cloy", "of Cloying", "The bearer may cast Friends once per day."],
        ["Compassionate", "of Compassion", "Contains 1d4 unreplenishable charges of the Cure Wounds spell (1st level)."],
        ["Conjurer's", "of the Conjurer", "The bearer may cast Prestidigitation once per day."],
        ["Corrosive", "of Dissolving", "Contains 1d4 unreplenishable charges of the Acid Splash spell (1st level)."],
        ["Crawling", "of Vermin", "The crawling things of the earth, such as insects, snakes, and vermin, are attracted to this item. When placed on the ground, such creatures will scurry toward the item like moths drawn to the flame."],
        ["Drunkard's", "of Taverns", "The bearer always knows the direction to the closest alcoholic beverage."],
        ["Etherbound", "of Ethereal Shores", "The bearer can see creatures in the Border Ethereal that overlap with their plane as clearly as if they were fully in the bearer's plane. Such creatures appear as apparitions or ghosts."],
        ["Exalting", "of Exaltation", "Contains 1d4 unreplenishable charges of the Bless spell (1st level)."],
        ["Expeditious", "of Expedience", "Contains 1d4 unreplenishable charges of the Expeditious Retreat spell."],
        ["Fathoming", "of Tongues", "Contains 1d4 unreplenishable charges of the Comprehend Languages spell."],
        ["Feathered", "of Feathers", "Contains 1d4 unreplenishable charges of the Feather Fall spell (1st level)."],
        ["Forgiven", "of Forgiveness", "When on the plane of Mount Celestia, the bearer of this item can receive the benefits of Blessed Beneficence regardless of their alignment."],
        ["Fortune Teller's", "of the Fortune Teller", "Every time you hit by a monster, you glimpse a random image of its future or past."],
        ["Friendly", "of Friendship", "Contains 1d4 unreplenishable charges of the Animal Friendship spell (1st level)."],
        ["Gracious", "of Grace", "The bearer may cast Spare the Dying once per day."],
        ["Healing", "of Healing", "This item contains 4 weak healing nodes. As an action, a character can use one node to heal 1d4 hit points at touch range. The item regains 1d4 charges at sunrise."],
        ["Leaping", "of Leaping", "Contains 1d4 unreplenishable charges of the Jump spell (1st level)."],
        ["Liar's", "of Lies", "Contains 1d4 unreplenishable charges of the Silent Image spell (1st level)."],
        ["Locating", "of Locating", "Once attuned, the bearer always knows the exact location of this item"],
        ["Malediction", "of Malediction", "Contains 1d4 unreplenishable charges of the Bane spell(1st level)."],
        ["Manipulating", "of Manipulation", "The bearer may cast Mage Hand once per day."],
        ["Master's", "of Servants", "Contains 1d4 unreplenishable charges of the Unseen Servant spell (1st level)."],
        ["Maverick", "of the Maverick", "The bearer has a +1 bonus to any skill check involving gambling and games of chance (Insight, Sleight of Hand, Investigation, etc)."],
        ["Messenger", "of Messages", "The bearer may cast Message once per day."],
        ["Meteoric", "of Falling Stars", "Contains 1 unreplenishable charge of Scorching Ray cast at 2nd level."],
        ["Miraculous", "of Miracles", "The bearer may cast Thaumaturgy once per day."],
        ["Mocking", "of Mockery", "The bearer may cast Vicious Mockery once per day."],
        ["Natural", "of Nature", "Contains 1d4 unreplenishable charges of the Locate Animals or Plants spell (1st level)."],
        ["Neutralizing", "of Neutrality", "Contains 1d4 unreplenishable charges of the Protection from Good and Evil spell (1st level)."],
        ["Nourishing", "of Nourishment", "The bearer rarely feels hungry, and only needs to consume one-fifth the usual amount of food."],
        ["Projecting", "of Projection", "The bearer can send messages mentally to willing characters within 30 feet. This communication is one-way only."],
        ["Protective", "of Protection", "The bearer may cast Blade Ward once per day."],
        ["Revealing", "of Revelation", "Contains 1d4 unreplenishable charges of the Detect Magic spell (1st level)."],
        ["Riutal", "of Rituals", "Whenever the bearer is casting a spell as a ritual, they have advantage to maintain concentration during the ritual."],
        ["Sailor's", "of the Sea", "Treat as a +1 weapon after the bearer has taken a long rest at sea. If the bearer steps on dry land, this property becomes temporarily inert."],
        ["Secret", "of Secrets", "Contains 1d4 unreplenishable charges of the Illusory Script spell (1st level)."],
        ["Shielding", "of Shielding", "This item contains 1d4 unreplenishable charges of the Shield spell."],
        ["Smith's", "of Reparations", "The bearer may cast Mending once per day."],
        ["Sparkling", "of Lights", "The bearer may cast Dancing Lights once per day."],
        ["Striding", "of Strides", "Contains 1d4 unreplenishable charges of the Longstrider spell (1st level)."],
        ["Translucent", "of Translucence", "The bearer gains an extra level one spell slot, which recovers only after a full moon rises."],
        ["Trickster's", "of Trickery", "The bearer may cast Minor Illusion once per day."],
        ["True", "of Truth", "The bearer may cast True Strike once per day."],
        ["Verdant", "of Druidcraft", "The bearer may cast Druidcraft once per day."],
        ["Windborne", "of the Labyrinth Wind", "When in the Plane of Air, the bearer can navigate the Labyrinth Wind intuitively, and knows the path to the nearest Earth Mote within 60 miles."],
        ["Wrathful", "of Ysgard", "When on the plane of Ysgard, the bearer is unaffected by Immortal Wrath. (DMG p. 61)"],
        ["Thunderous", "of the Rolling Thunder", "Contains 1 unreplenishable charge of Shatter cast at 2nd level."],
        ["Chained", "of Chains", "Contains 1 unreplenishable charge of Hold Person cast at 2nd level."],
        ["Spider's", "of the Spider", "Contains 1 unreplenishable charge of Web cast at 2nd level."],
        ["Heliacal", "of the Sun", "Contains 1 unreplenishable charge of Flaming Sphere cast at 2nd level."],
        ["Crippling", "of Crippling", "Contains 1 unreplenishable charge of Ray of Enfeeblement cast at 2nd level."],
        ["Lunar", "of the Moon", "Contains 1 unreplenishable charge of Moonbeam cast at 2nd level."],
        ["Fatespinner's", "of the Fates", "Contains 1 unreplenishable charge of Augury cast at 2nd level."],
        ["Rooting", "of Roots", "Contains 1 unreplenishable charge of Entanglement cast at 2nd level."],
        ["Mirrored", "of Mirrors", "Contains 1 unreplenishable charge of Mirror Image cast at 2nd level."],
        ["Vulpine", "of the Fox", "Characters trying to track the bearer have a -1 penalty to their skill checks."],
        ["Submerged", "of the Depths", "Treat as a +1 armor when completely submerged in water."],
        ["Comforting", "of Comfort", "Treat as a +1 armor if the bearer has any levels of exhaustion."],
        ["Brawler's", "of Brawling", "Whenever a bearer makes an attack with an improvised weapon, treat as a +1 armor until the beginning of the bearer's next turn."],
        ["Eagle-eye", "of the Eagle", "The bearer can clearly see twice as far and gains advantage on Wisdom (perception) checks that use sight."],
        ["Lupine", "of the Wolf", "The bearer can detect and distinguish scents like a wolf and gains advantage on Wisdom (Perception) checks that use smell."],
        ["Chiropteran", "of the Bat", "The bearer can hear a pin drop in a crowded room and gains advantage on Wisdom (Perception) checks that use hearing."],
        ["Black", "of Darkness", "Contains 1 unreplenishable charge of Darkness cast at 2nd level."],
    ],
    types: [
        "boots",
        "helmet",
        "gauntlets",
        "grill",
        "codpiece",
        "leather gloves",
        "hide armor",
        "chainmail",
        "scale mail",
        "tunic",
        "sandals",
        "shirt",
        "belt",
        "splint armor",
        "ring mail"
    ],
    randArmor: function() {
        var name = ""
        var bodyText = ""

        var suffix = false;
        if (Math.random() < .8) {
            suffix = true;
        }
        var first = getRand(this.properties)
        name += first[0] + " " + toTitleCase(getRand(this.types))
        bodyText += first[2]

        if (suffix) {
            var second = getRand(this.properties)
            //prevent intersections
            while (second[0] === first[0]){
                second = getRand(this.properties)
            }
            name += " " + second[1]
            bodyText += "<br>" + second[2]
        }

        $("#outcome-title").html(name)
        $("#outcome-text").html(bodyText)
    }
}