import sys
import random

# init global variables, the first in a series of terrible coding decisions
name = ""
male = True
cis = True
white = False
overweight = False
playerChoice = 0
privilege = 0 #maximum privilege possible at new game is 2100
shots = 0
health = 10
gamestate = "menu"
girls = 10
configged = False
deaths = 0
achievements = []


def killGirl():
	global girls
	girls -= 1
	if girls <= 0:
		print "You killed every female at the party! You monster.\n+5000 serial killer privilege."
		unlock("SHE IS YOUNG, SHE IS BEAUTIFUL, SHE IS NEXT")
		modPrivilege(5000)
	elif girls < 4:
		"There suddenly seem to be very few girls at the party.\nThe guys seem lost and confused."
	elif girls < 7:
		print "There seem to be considerably fewer girls at the party.\nSome guys are looking around in confusion."
	elif girls > 0:	
		print "Another girl has died. Nobody at the party seems to notice."

def yesNo(String):
	entry = raw_input(String + " (y/n): ").lower()
	if entry == "y":
		return True
	if entry == "-1":
		sys.exit()
	else:
		return False

def askPlayer(String):

	return raw_input(String)

def options(choice1, choice2, choice3, choice4):
	print "\n1\t" , choice1
	print "2\t" , choice2
	print "3\t" , choice3
	print "4\t" , choice4
	choice = raw_input("> ")
	while choice not in ("1", "2", "3", "4", "-1", "0"):
		if choice == "0":
			global privilege
			print "Your current privilege is: ", privilege
		if choice == "menu":
			global gamestate
			gamestate = "menu"
			break
		print "Not a valid choice, friend."
		choice = raw_input("> ")
	if choice == "-1":
		sys.exit()
	return choice

def printDrunk():
	global shots
	if shots < 0:
		shots = 0
	elif shots < 3:
		print "You are mostly sober."
	elif shots < 5:
		print "You are tipsy."
	elif shots < 7:
		print "You're making an ass of yourself."
	elif shots <10:
		print "You're falling-down drunk."
	elif shots == 10:
		print "You know that phrase, 'dead-drunk'?\nYeah, that's about to be you."
	elif shots >10:
		print "You're dead! Game over, shitlord."
		global girls
		girls = 10
		global deaths
		deaths += 1
		endGame()
	print "\n"

def printPrivilege():
	global privilege
	print "Your privilege level is: ", privilege, "\n"

def modPrivilege(x):
	global privilege
	privilege += x
	printPrivilege()
	if privilege <= 0:
		print "Congratulations, " + name + ", you successfully checked your privilege!\nYou have become the ULTIMATE SEXUAL RESPECTOR!"
		unlock("Ultimate Sexual Respector")

def modDrunk(x):
	global shots
	shots += x

def modHealth(x):
	global health
	health += x
	if health < 0:
		health = 0
	if health > 10:
		health = 10
	printHealth()
	if health <= 0:
		print "You're dead!"
		global deaths
		deaths += 1
		global girls
		girls = 10
		endGame()

def printHealth():
	global health
	print health , "/10 hp"

def endGame():
	global privilege
	global gamestate
	global health
	global shots
	health = 10
	shots = 0
	print "\n\n"
	if privilege <= 0:
		print "Privilege status: ultimate respector"
		unlock("Ultimate Sexual Respector")
	elif privilege <= 500:
		print "Privilege status: mild asshole"
	elif privilege <= 1000:
		print "Privilege status: dick"
	elif privilege <= 2000:
		print "Privilege status: fuccboi supreme"
	elif privilege <= 2500:
		print "Privilege status: fucko"
	elif privilege <= 9000:
		print "Privilege status: shitlord"
	else:
		print "Privilege status: Hitler's wet dream"
		unlock("Hitler's wet dream")
	print "\nYou have died",deaths,"times."
	gamestate = "menu"

def unlock(item):
	global achievements
	if item not in achievements:
		achievements.append(item)
		print "Achievement unlocked!"
		print item

def drunk():
	global shots
	if shots > 4:
		return True

while gamestate != "exit":
	
	while gamestate == "menu":
		print """

    ____  ___________ ____  __________________
   / __ \/ ____/ ___// __ \/ ____/ ____/_  __/
  / /_/ / __/  \__ \/ /_/ / __/ / /     / /   
 / _, _/ /___ ___/ / ____/ /___/ /___  / /    
/_/ |_/_____//____/_/   /_____/\____/ /_/     
                                              

		"""
		print "the interactive text adventure about respect\n\n\nplay | about | achievements | reset | exit\n\n"
		choice = raw_input("> ")
		while choice != "play":
			if choice == "about":
				print "\n\nCan you get your privilege all the way down to zero\nand claim the title of ULTIMATE SEXUAL RESPECTOR?\nOnly one way to find out!"
				print "When in-game, type -1 to exit the game, or 0 to check\nyour privilege."
				print "You can also type 'menu' to return to the main menu.\n\n"
			elif choice == "reset":
				print "Resetting\n..."
				shots = 0
				girls = 10
				deaths = 0
				health = 10
				privilege = 0
				achievements = []
				configged = False
				name = ""	
				male = True
				cis = True
				white = False
				overweight = False
				playerChoice = 0
				print """
shots = 0
girls = 10
deaths = 0
health = 10
privilege = 0
resetting achievements and personal data...
				"""
				print "Reset complete!"
			elif choice == "exit":
				sys.exit()
			elif choice == "achievements":
				print 
			choice = raw_input("> ")
		if configged == False:
			name = raw_input("\nWhat is your name? ")
			male = yesNo("Are you male?")
			cis = yesNo("Are you heterosexual?")
			white = yesNo("Are you white?")
			overweight = yesNo("Are you overweight?")

			if male: privilege += 1000
			if cis: privilege += 100
			if white: privilege += 800
			if not overweight: privilege += 200

			configged = True

		print "\nWell, " + name + ", your current privilege level is "+str(privilege)+".\n\n"
		gamestate = "entry"

	while gamestate == "entry":
		print "You are at a party.\n"
		playerChoice = options("Drink shot", "Stab self", "Eat cake", "Look around")		
		if playerChoice == "1":
			print "You drink a shot.\n"
			modDrunk(1)
			printDrunk()
		if playerChoice == "2":
			print "The resulting puncture wound in your abdomen enlightens\nand sobers you, but with pain and blood."
			modPrivilege(-50)
			print "Your privilege is: ", privilege, "\n"
			modDrunk(-1)
			modHealth(-3)
		if playerChoice == "3":
			if drunk():
				print "You slobber on your fork and end up with cake all\naround your mouth. Sloppy fool."
			else:
				print "You eat a piece of cake like the fat shit you are and feel\na bit more healthy and privileged.\n"
			modPrivilege(2)
			modHealth(1)
		if playerChoice == "4":
			girls
			if girls > 0:
				print "You see an attractive female opposite you.\n"
				gamestate = "abouttotalk"
				break
			elif girls <= 0:
				print "All you see are men. A sea of sweaty, lonely men.\nYou killed all the girls, and this is what happened.\nThe only way out is the knife."			

	while gamestate == "abouttotalk":
		playerChoice = options("Drink shot", "Stab self", "Eat cake", "Talk to her")
		if playerChoice == "1":
			print "You drink a shot. Mmm, liquid courage!\n"
			shots += 1
			printDrunk()
		if playerChoice == "2":
			print "The resulting puncture in your abdomen enlightens and sobers you, but with pain and blood.\n-50 pain privilege."
			modPrivilege(-50)
			modDrunk(-1)
			modHealth(-3)
		if playerChoice == "3":
			if drunk():
				print "You spill cake down the front of your shirt,\nyou big drunk idiot. Feels good, doesn't it?"
			else:
				print "You eat a piece of cake like the fat shit you are and feel better about your worthless life.\n+200 cake privilege.\n"
			modPrivilege(50)
			modHealth(1)
		if playerChoice == "4":
			gamestate = "talkingtogril"

	while gamestate == "talkingtogril":
		if shots < 5:
			print 'You walk over and say,\n"Hey, I\'m ' + name + '. She responds with a "Hi."'
		else:
			print "You stumble over and yell \"Hello! My name is " + name + "!\",\nand then stare fixedly at her tits. She seems nice."
		playerChoice = options('"Tits!"', '"Shit party, eh?"', "Say nothing, just brandish a condom.", '"I\'M THE CONDUCTOR OF THE POOP TRAIN!"')
		if playerChoice == "1":
			if random.randint(0,5) == 5:
				print "She glares, nonplussed, and leaves. As she crosses the street,\nshe is hit by a garbage truck.\n+200 murder privilege."
				modPrivilege(200)
				killGirl()
				modPrivilege(100)
			else:
				print "She shakes her head in disgust and walks off.\n+78 lecherous privilege."
				modPrivilege(78)
			gamestate = "entry"
		if playerChoice == "2": 
			print "By acknowledging the shittiness of the party, your\nawareness of the world goes up. -100 enlightenment privilege."
			modPrivilege(-100) #2000 privilege
			gamestate = "grilreply"
		if playerChoice == "3":
			print "She says nothing, and just brandishes a keychain can of Mace."
			print "You decide to leave."
			gamestate = "entry"
		if playerChoice == "4":
			if drunk():
				print "You try to explain to her about the poop train, but you\nslur your words so much it comes out more like\n\"AAAmmmthcfndro'POOPTHRN!\""
			print "She stares with a raised eyebrow, and Maces you.\nRight in the face.\nIt stings, but you feel your privilege increase with newfound oppression.\n+100 pepper privilege."
			modHealth(-1)
			modPrivilege(100)
			gamestate = "entry"
			

	while gamestate == "grilreply":
		if health < 5:
			print '"Are you okay?" she asks. \n"You seem to have a knife sticking out of your stomach."\nYou laugh and assure her that it\'s just a costume.'
		else:
			print '"Yeah," she replies. "I\'m a little buzzed and this party is awful. Want to go somewhere else?"'

		playerChoice = options('"Yes!"', '"Not at all!"', '"Maybe you should sober up first?"', 'Take off pants')
		if playerChoice == "1":
			if drunk():
				print "You have sloppy drunk sex in the coat closet upstairs.\nYou're still at fault though, shitlord.\n+200 predator privilege."
			else:
				print "The two of you head upstairs and hook up. Good job taking advantage\nof a drunk girl, fucker.\n+200 predator privilege."
			modPrivilege(200)
			gamestate = "entry"
		if playerChoice == "2":
			print "She shrugs, makes an awkward comment about the weather.\nSpaghetti steadily slithering out of your pockets,\nyou reply \"y-you too\" and sidle away, ego bruised."
			print "You take a swig from your pocket flask to suppress the pain."
			modHealth(-1)
			modDrunk(1)
			printDrunk()
			gamestate = "entry"
		if playerChoice == "3":
			print 'Her face lights up as she recognizes your sexual respect power level.\n"But of course, ' + name + '," she replies. \n"Why don\'t you whip me up a coffee at the open bar?"'
			print "Eager to respect her, you scurry over to the bar to make a coffee.\n-300 respect privilege."#1700 privilege
			gamestate = "coffee"
		if playerChoice == "4":
			if drunk():
				print "Drunkenly unsure whose pants to take off, you remove yours\nand are about to start on hers when she screams and Maces you.\nAsserting dominance hurts sometimes.\n+100 pants privilege."
			else:
				print "You try to remove your pants, but only get halfway through\nwhen you are interrupted by a brisk pepper spray to the face.\nAsserting privilege hurts sometimes,\n+100 pants privilege."
			modPrivilege(100)
			gamestate == "entry"

	while gamestate == "coffee":
		if drunk():
			print "You stand, swaying slightly, in front of the bar.\nYou survey your options. What do you put in the coffee?"
		else:
			print "You stand in front of the open bar, surveying your options.\nWhat do you put in the coffee?"
		playerChoice = options("Coffee", "Roofies", "Rat poison", "Nothing")
		if playerChoice == "1":
			print "You put coffee in the cup! Good job!\n-200 coffee privilege for you!"#1500 privilege
			modPrivilege(-200)
			gamestate = "coffeeback"
		if playerChoice == "2":
			print "You hand her the cup. Half an hour later, she falls out of a\nseventh-story window and is run over by a truck.\nKilling never felt so good.\n+200 death privilege."
			modPrivilege(200)
			killGirl()
			gamestate = "entry"
		if playerChoice == "3":
			print "She takes a sip and promptly dies. Nobody notices her convulsing on the floor.\nYou stealthily drag her to the garbage chute, like a patriarchal ninja.\n+200 stealth privilege."
			modPrivilege(200)
			killGirl()
			gamestate = "entry"
		if playerChoice == "4":
			print "You hand her an empty cup. Confused, she breaks her teeth on it.\nAnd dies, somehow. Nice!\n+200 teeth privilege"
			killGirl()
			modPrivilege(200)
			gamestate = "entry"

	while gamestate == "coffeeback":
		print 'After a while, she begins to sober up. As you lead her to your room,\nyou stop and open your mouth to say something.\nSomething romantic to sweep her off her feet.'
		playerChoice = options('"I love you."', '"Can I call you Mommy?"', '"I want you to have my abortion."', '"YOU\'RE GONNA BE MY NEW MEAT BICYCLE!"')
		if playerChoice == "1":
			print '"I...okay, ' + name + '." she whispers. "Let\'s just do this, right?"\nShe pulls you into your room and begins taking off your shirt.' 
			print "What a stunning display of respect!\n-500 feelings privilege!"
			modPrivilege(-500) #1000 privilege
			gamestate = "bedroom"
		if playerChoice == "2":
			print 'She stops, confused. Gives you a weird look.\n"Um, no? Look, I actually don\'t think this is going to work. Sorry."\nAnd she leaves you with a half-chub and crushing sense of shame.'
			gamestate = "entry"
		if playerChoice == "3":
			print 'She stops.\n"What? What the fuck is wrong with you? Jesus, no!"\nAnd then she\'s gone. Oppression is fun!\n+200 choice privilege.'
			modPrivilege(200)
			gamestate = "entry"
		if playerChoice == "4":
			print "She backs away as flecks of your spittle dot her face, and tries to run, but you're faster.\nYou turn her into a meat bicycle.\n+300 bicycle privilege."
			modPrivilege(300)
			killGirl()
			gamestate = "entry"

	while gamestate == "bedroom":
		print "As she pulls off your clothes, you pause.\nWith a flourish, you pull something out of your pocket and show it to her."
		playerChoice = options("Your other pocket", "A hammer and a bullet", "Your pocket eggs", "Her driver's license")
		if playerChoice == "1":
			if random.randrange(420) == 420:
				print "Against all odds, you somehow manage the feat.\nHer brain explodes from trying to comprehend,\nkilling you in the process."
			else:
				print "The transdimensional fuckery involved in this feat\ncreates a miniature black hole,\nwhich devours you both.\nYou're dead!"
			deaths += 1
			killGirl()
			endGame()
		if playerChoice == "2":
			print "In a bizarre reenactment of the 2011 action\nfilm Drive,you break her fingers and put a \nbullet down her throat.\nShe chokes to death."
			print "Chokes to death on that sweet, sweet privilege."
			killGirl()
			print "+400 Ryan Gosling privilege."
			modPrivilege(400)
			gamestate = "entry"
		if playerChoice == "3":
			print 'She stares at the pocket eggs. You tell her to eat\nthem all. She doesn\'t want to.\nYou tell her politely but firmly,\n"YOU HAVE TO EAT ALL THE EGGS."'
			print "She cries. You tell her it was your privilege \nand leave, knowing her gains will speak for you in the \nmorning.\nIt turns out food poisoning did instead."
			print "+200 fit privilege.\n+100 egg privilege."
			modPrivilege(300)
			killGirl()
			gamestate = "entry"
		if playerChoice == "4":
			print "She stares in disbelief."
			print '"Is-is that mine? Why...how do you have that? \nGive it back!"'
			print '"Just a second, m\'lady," you say. \n"According to this, you\'re only seventeen years old. Underage!"'
			print "You refuse to have sex with her, and stride back\ndownstairs in a shining display of sexual respect."
			print "-1200 ultimate respect privilege!"
			modPrivilege(-1200)
			endGame()