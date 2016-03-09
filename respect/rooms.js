var nameset = {
    renderTitle: function() {
        render("What is your name?")
    },
    handleInput: function(str) {
        name =  str.charAt(0).toUpperCase() + str.slice(1);
        switchRoom(genderset)
    }
}

var genderset = {
    renderTitle: function() {
        render("Are you male?")
    },
    handleInput: function(str) {
        if (str.charAt(0) == "y") {
            male = true
            player.privilege += 1000
            switchRoom(straightset)
        } else if (str.charAt(0) == "n") {
            male = false
            switchRoom(straightset)
        } else {
            this.renderTitle();
        }
    }
}

var straightset = {
    renderTitle: function() {
        render("Are you straight?")
    },
    handleInput: function(str) {
        if (str.charAt(0) == "y") {
            straight  = true
            player.privilege += 100
            switchRoom(whiteset)
        } else if (str.charAt(0) == "n") {
            straight = false
            switchRoom(whiteset)
        } else {
            this.renderTitle();
        }
    }
}

var whiteset = {
    renderTitle: function() {
        render("Are you white??")
    },
    handleInput: function(str) {
        if (str.charAt(0) == "y") {
            white = true
            player.privilege += 800
            switchRoom(fatset)
        } else if (str.charAt(0) == "n") {
            white = false
            switchRoom(fatset)
        } else {
            this.renderTitle();
        }
    }
}

var fatset = {
    renderTitle: function() {
        render("Are you overweight???")
    },
    handleInput: function(str) {
        if (str.charAt(0) == "y") {
            fat = true
            configured= true;

            render("Well, " + name + ", your privilege level is " + player.privilege + ".")
            switchRoom(entry)
        } else if (str.charAt(0) == "n") {
            fat = false
            configured= true;
            player.privilege += 200
            render("Well, " + name + ", your privilege level is " + player.privilege + ".")
            switchRoom(entry)
        } else {
            this.renderTitle();
        }
    }
}

var menu = {
    renderTitle: function() {
        render("RESPECT.py REBOOTED", "hotpink", 20)
        render("the interactive sexual respect adventure")
        render("back again for sloppy seconds", "dimgray", 12)
        render("")
        render("play | about | achievements | help | reset")
    },
    handleInput: function(str) {
        switch (str) {
            case "about":
                render("Can you get your privilege all the way down to zero\
                and claim the title of")
                render("ULTIMATE SEXUAL RESPECTOR?", "hotpink", 12);
                render("Only one way to find out!")
                render("Type 'privilege' at any time to check your privilege.")
                render("Type 'menu' to go to the main menu.")
                render("Type 'stats' to check yourself out.")
                break;
            case "achievements":
                renderAchievements();
                break;
            case "play":
                configured ? switchRoom(entry) : switchRoom(nameset);
                break;
            case "reset":
                reset();
                render("Everything reset!")
                break;
        }
    },
}

var entry = {
    renderTitle: function() {
        render("")
        render("You are at a party.")
        renderOptions(this);
    },
    options: [
        "Drink shot",
        "Stab self",
        "Eat cake",
        "Look around"
    ],

    handleInput: function(str) {
        switch(str) {
            case "1":
                render("You take a shot.")
                player.modDrunk(1);
                break;
            case "2":
                render("The puncture wound in your abdomen enlightens\
                and sobers you, but with pain and blood.")
                modPrivilege("Oh, the pain. -50 health privilege.", -50)
                player.shots > 0 ? player.shots-- : player.shots -= 0
                modHealth(-1);
                break;
            case "3":
                if (drunk()) {
                    render("You slobber on your fork and smear cake on your face.")
                    render("Sloppy fool.")
                } else {
                    render("You eat some cake like the fat piece of shit you are\
                    and feel a bit more healthy and privileged.")
                }
                modPrivilege("Mmm! +10 cake privilege.", 10)
                break
            case "4":
                if (girls > 0) {
                    render("You see an attractive female across from you.\
                    She looks vaguely unhappy.")
                    switchRoom(girltalk)
                } else {
                    render("All you see are men. A sea of sweaty, lonely men.\
                    You killed all the girls, and this is what happened.\
                    The only way out is the knife.")
                }
        }
    }
}

var girltalk = {
    renderTitle: function() {
        renderOptions(this);
    },
    options: [
        "Drink shot",
        "Stab self",
        "Eat cake",
        "Talk to her"
    ],

    handleInput: function(str) {
        switch(str) {
            case "1":
                render("You take a shot. Liquid courage! Yes!")
                player.modDrunk(1);
                break;
            case "2":
                render("The puncture wound in your abdomen enlightens\
                and sobers you, but with pain and blood. You wonder how you're\
                going to explain the knife in your stomach to her.")
                modPrivilege("Oh, the pain. -50 health privilege.", -50)
                player.shots > 0 ? player.shots-- : player.shots -= 0
                modHealth(-1);
                break;
            case "3":
                if (drunk()) {
                    render("You spill cake down the front of your half-unbuttoned\
                    shirt, you big drunk idiot.")
                    render("Feels good, doesn't it?")
                } else {
                    render("You eat some cake like the fat piece of shit you are\
                    and feel better about your worthless life.")
                }
                modPrivilege("You're a little fat girl, aren't you?\
                 +10 cake privilege.", 10)
                 player.health++
                 break;
            case "4":
                switchRoom(extra)
        }
    }
}

var extra = {
    renderTitle: function() {
        render("")
        if (!drunk()) {
            render("You walk over and say, 'Hey, I'm " + name + ".'")
        } else {
            render("You stumble too close to her and shout 'HELLO!' \
            and then stare down her shirt.")
            render("She seems nice.")
        }
        renderOptions(this);
    },
    options: [
        "'Tits!",
        "'Shit party, right?'",
        "Eat cake",
        "I'M THE CONDUCTOR OF THE POOP TRAIN!"
    ],

    handleInput: function(str) {
        switch(str) {
            case "1":
                render("She shakes her head in disgust and walks off.")
                if (Math.random() > 0.5) {
                    render("As she leaves the party, she is hit by a garbage truck.")
                    modPrivilege("Technically, not your fault. +200 accident privilege.", 200)
                    switchRoom(entry)
                    break;
                }
                modPrivilege("You're a gooddamn creep. +78 lecherous privilege", 78);
                switchRoom(entry)
                break;
            case "2":
                render("By acknowledging the shittiness of the party, your\
                awareness of the world grows.")
                modPrivilege("The world is terrible! -100 happiness privilege.", -100)
                switchRoom(girlreply)
                break;
            case "3":
                render("You commmand her to eat cake. She looks at the drink in her\
                hand, and you wonder why you still had this option.")
                render("She leaves, nonplussed.")
                modPrivilege("Women love it when a man takes charge!\
                 +10 command privilege.", 10)
                 switchRoom(entry)
                 break;
            case "4":
                if (drunk()) {
                    render("You try to explain to her about the poop train,\
                    but you slur your words so much you just end up spitting\
                    on her and mumbling about trains. She maces you. Right in\
                    the face. You feel your privilege swell with newfound\
                    oppression.")
                }
                render("She raises and eyebrow, and maces you in the right\
                eye. ")
                modHealth(-1);
                modPrivilege("You're a menace. +100 pepper privilege.", 100)
                switchRoom(entry)
                break;
        }
    }
}

var girlreply = {
    renderTitle: function() {
        render("")
        if (player.health < 6) {
            render("'Are you okay?' she asks. You laugh and assure her that the\
            knife in your stomach is just a costume prop.")
        }
        render("'Yeah', she replies. 'I'm a little buzzed and this party is\
        awful. Want to go somewhere else?'")
        renderOptions(this);
    },
    options: [
        "'Yes!''",
        "'Not at all!'",
        "'Maybe you should sober up first?'",
        "Take off pants"
    ],

    handleInput: function(str) {
        switch(str) {
            case "1":
                if (drunk()) {
                    render("The two of you head upstaris and have sloppy drunk\
                    sex in a coat closet.")
                    modPrivilege("You just took advantage of a drunk girl.\
                    You were drunk, but still. +200 advantage privilege.", 200)
                    switchRoom(entry)
                    break;
                }
                render("You hook up in an upstairs bedroom.")
                modPrivilege("Good job of taking advantage of a drunk girl.\
                +200 predator privilege", 200);
                switchRoom(entry)
                break;
            case "2":
                render("She shrugs, makes an awkward comment about the weather.\
                Spaghetti slowly slithers out of your pockets. You reply, 'Y-you\
                 too,' and sidle away, ego bruised.")
                modPrivilege("You take a swig from your pocket flask to ease the\
                pain. -100 ego privilege.", -100)
                modHealth(-1);
                player.modDrunk(1);
                switchRoom(entry)
                break;
            case "3":
                render("Her face lights up as she recognizes your sexual respect\
                power level. 'But of course, " + name + "', she replies.\
                'Why don't you whip me up a coffee at the open bar?'")
                render("Eager to respect her, you scurry over to the bar to make\
                a coffee.")
                modPrivilege("Coffee helps you sober up, right? -300 respect privilege", -300)
                switchRoom(coffee)
                break;
            case "4":
                if (drunk()) {
                    render("Drunkenly unsure about whose pants to take off, you\
                    remove yours and are about to start on hers when she screams\
                    and maces you.")
                    modPrivilege("Pants! +100 pants privilege.", 100)
                } else {
                    render("You try to remove your pants, but only get halfway\
                    when you get halfway when you're interrupted by a brisk pepper\
                    spray to the face.")
                    modPrivilege("Asserting dominance hurts sometimes. +100 pants privilege", 100)
                }
                switchRoom(entry)
                break;
        }
    }
}

var coffee = {
    renderTitle: function() {
        render("")
        if (!drunk()) {
            render("You stand, swaying slightly, in front of the bar, and survey\
            your options. What do you put in the coffee?")
        } else {
            render("You sstand in front of the bar and survey your options. What\
            do you put in the coffee?")
        }
        renderOptions(this);
    },
    options: [
        "Coffee",
        "Roofies",
        "Rat poison",
        "Nothing"
    ],

    handleInput: function(str) {
        switch(str) {
            case "1":
                render("You put the coffee in the cup! Good job on performing\
                this basic task!")
                modPrivilege("How chivalrous! -200 coffee privilege.", -200);
                switchRoom(coffeeback)
                break;
            case "2":
                render("You hand her the cup. Half an hour later, she falls out\
                of a second-story window.")
                killGirl()
                modPrivilege("Killing never felt so good! +200 death privilege.", 200)
                switchRoom(entry)
                break;
            case "3":
                render("She takes a sip and promptly dies. Nobody notices her\
                convulsing on the floor. You stealthily drag her to the garbage\
                chute, like a patriarchal ninja.")
                killGirl()
                modPrivilege("She is a small cube now. +200 stealth privilege.", 200)
                switchRoom(entry)
                break
            case "4":
                render("You hand her an empty cup. Confused, she breaks her teeth\
                on the rim, and somehow dies.")
                modPrivilege("Crunch! +200 teeth privilege.", 200)
                killGirl();
                switchRoom(entry)
        }
    }
}

var coffeeback = {
    renderTitle: function() {
        render("")
        render("After a while, she begins to sober up. As you lead her to your\
        room, you stop and decide to say something. Something romantic to sweep\
        her off her feet.")
        renderOptions(this);
    },
    options: [
        "'I love you.'",
        "'Can I call you Mommy?'",
        "'I want you to have my abortion.'",
        "'YOU'RE GONNA BE MY NEW MEAT BICYCLE!'"
    ],

    handleInput: function(str) {
        switch(str) {
            case "1":
                render("'I...okay, " + name + ",' she says, pulling you into\
                your room and fumbling with your shirt buttons. 'Let's just \
                do this, okay?")
                modPrivilege("What a stunning display! -500 feelings privilege.", -500);
                switchRoom(bedroom)
                break;
            case "2":
                render("She stops. 'Um, no? Uhh, maybe this isn't gonna work out. Sorry.'\
                And just like that, she's gone, leaving you with a half-chub and\
                a crushing sense of shame.")
                switchRoom(entry)
                break;
            case "3":
                render("She stops. 'What?? What the fuck is wrong with you, " + name + "?' And\
                then she's gone.")
                modPrivilege("You're pro-choice! +200 choice privilege.", 200)
                switchRoom(entry)
                break
            case "4":
                render("She backs away as flecks of your spittle dot her face,\
                and tries to run, but you're faster. You turn her into a meat\
                bicycle.")
                modPrivilege("+300 bicycle privilege.", 300)
                killGirl()
                switchRoom(entry)
        }
    }
}

var bedroom = {
    renderTitle: function() {
        render("")
        render("As she pulls off your clothes, you pause. With a flourish, you\
        pull something out of your pocket and show it to her.")
        renderOptions(this);
    },
    options: [
        "Your other pocket",
        "A hammer and a bullet",
        "Your pocket eggs",
        "Her driver's license"
    ],

    handleInput: function(str) {
        switch(str) {
            case "1":
                if (Math.random() > 0.5) {
                    render("Against all odds, you somehow manage the feat. Her \
                    brain explodes from trying comprehend, killing her in the\
                     process.")
                    killGirl();
                } else {
                    render("The transdimensional fuckery involved in this feat \
                    creates a miniature black hole, which devours you both.")
                    killGirl()
                    killPlayer()
                }
                switchRoom(entry)
                break;
            case "2":
                render("In a bizarre reenactment of the 2011 arthouse film, you \
                break her fingers and shove a bullet down her throat. She chokes\
                 to death.")
                modPrivilege("Chokes to death on that sweet, sweet privilege. \
                +400 Ryan Gosling privilege.", 400)
                killGirl()
                switchRoom(entry)
                break;
            case "3":
                render("She stares at the pocket eggs. You tell her she has to \
                eat them all. She doesn't want to. You tell her, politely but \
                firmly, 'YOU HAVE TO EAT ALL THE EGGS.' She cries. You tell her \
                it was your privilege and leave, knowing the gains will speak for \
                themselves. It turns out food poisoning did instead.")
                killGirl()
                modPrivilege("No! I don't want that! +200 /fit/ privilege. +100 \
                egg privilege.", 300)
                switchRoom(entry)
                break
            case "4":
                render("She stares in disbelief.")
                render("'I-is that mine? Why do you have it? Give it back!'")
                render("'Just a second, m'lady', you tell her. 'According to \
                this, you're only seventeen years old. Underage!'")
                render("You refuse to have sex with her, and stride downstairs \
                in a stunning display of sexual respect.")
                modPrivilege("Wow! -1200 ultimate respect privilege!", -1200)
                endGame();
        }
    }
}
