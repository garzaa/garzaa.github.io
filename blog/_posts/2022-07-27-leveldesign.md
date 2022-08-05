---
layout: post
title: Designing Space for Violence
---

How to make a good Trouble in Terrorist Town level

1. test
{:toc}

## Introduction

TTT is a hidden role game like Among Us or Mafia. I always feel uneasy saying the name in public settings, despite the game's creator [saying the same](https://www.troubleinterroristtown.com/about/history/) and providing context for it.

> If you're reading this and you think this is kind of an odd way to talk about terrorism in this day and age, you're probably right! The original Counter-Strike, released in 2000, has a weird and now-anachronistic take on these concepts of "terrorist" and "counter-terrorist". I want to be clear that TTT very much exists in that weird fictional universe (and comments on it in its writing), and is not referring to real-world terrorism in any form.

> Not all TTT modders have gotten this memo, and some custom weapon addons exist with some tasteless stuff in there. If I had known TTT would ever get as big as it has, I would probably have picked a different setting to avoid this.

![img](https://user-images.githubusercontent.com/11641991/181175564-c2b94ac3-ded6-4d67-a193-3c70c770a9a2.png)

TTT is not a military shooter. It is a slapstick game about yelling at your friends.

## Game Patterns

Many games play out like this:

1. Everyone groups up
2. Groups fragment
3. Groups containing traitors are thinned
4. Smaller groups join up again, or innocents clump together out of fear

There are also antipatterns:

- The map has no objectives. People get bored and stand around in an open, well-lit area kicking physics objects around.
- A fast-working traitor-tester is available. Innocents run to it, test themselves, and hang out there for the rest of the game.
- Innocents hide in a dead-end with a single choke point and can easily defend themselves.

A good map circumvents these by giving people a reason to move around and traitors cover to do their things. It also follows other TTT-specific good design rules:
- no areas where people will congregate permanently
- areas where traitors can kill without being seen
- things for innocent people to do that aren't "stand around and wait to be killed" or "try to catch someone else killing"
- no dead-ends for confirmed innocents to hide in and defend

An easy objective for innocents is a traitor-tester. The actual act of testing isn't that important, but the threat of making someone step in the tester and the group objective of powering up or going to the tester is the most potent.

## Basic Map Design

TTT plays like many basic first-person games. People move around as pedestrians, without vehicles or special movement abilities. FPS design traditions carry over.
If nothing else, check out [this GDC talk on designing good levels](https://www.youtube.com/watch?v=iNEe3KhMvXM). Highlights are that good levels can be:
1. Fun to navigate
2. Good-looking
3. Simple
4. Surprising
5. Player-empowering
6. Efficient in space
7. In sync with mechanics

### Guide the player

![image](https://user-images.githubusercontent.com/11641991/181401375-9b1372f3-4db7-4a5e-b18a-d28db55e8326.png)
I wonder if there could be something over this edge ![image](https://cdn.discordapp.com/emojis/817143591217922059.webp?size=32&quality=lossless)

![image](https://user-images.githubusercontent.com/11641991/181401598-980f3c74-144c-4c61-8820-ce7cd52bbb58.png)
Separate paths framed by the arch, with the well-lit underground area behind the arch promising safety

![image](https://user-images.githubusercontent.com/11641991/181401680-8d40615d-49de-497d-b390-5265283ee177.png)
Stark contrast and readable shapes from the jump-pad in front of the sunlit wall, as you exit the house into the yard

![image](https://user-images.githubusercontent.com/11641991/181401857-950a4b96-75c9-4e71-a2f9-fef782fd39cf.png)
Rugs angled to highlight the side exit from this space

![image](https://user-images.githubusercontent.com/11641991/181401970-af518b7e-b5e6-4abd-b9da-afac4152f7ea.png)
Crates breaking up sightlines in the underground area, two doorways hidden from each other

### TTT Specifics

#### Homogenous Map

**There are no lanes.** No opposing spawns where players know the other team will be coming from. Traitors only make up ¼ of the players and are unknown until they act. Therefore, the map needs to allow firefights to break out anywhere.

#### Keep People Moving

Reinforcement:
- Treats (health, free shop items)
- Level objectives
- Traitor tester fuel

Punishment:
- Traitor traps
- Scary zones

![image](https://user-images.githubusercontent.com/11641991/181392999-c80bacf4-9a93-4020-9c71-77e8ed94a5aa.png)
ttt_oldchurch has a traitor tester powered by bananas that appear in different places around the area.

#### Avoid Congregation

People love these things:
1. Light
2. Open space
3. High ground

Try to make every space with >1 of these qualities risky to stay in.

![image](https://user-images.githubusercontent.com/11641991/181200447-be10a473-12ee-45fa-8d72-ca50e34ca433.png)
Innocent terrorists enjoyed standing around in the front yard of ttt_manhouse. I put a traitor trap there where the gas line all along the front of the house explodes, and now it never goes off because nobody goes there anymore. The backyard is just as open, but it's in shadow, so people don't stay there either.

![image](https://user-images.githubusercontent.com/11641991/181200915-65049423-36de-4bad-be20-7fcde107c1e7.png)
People sometimes congrate on the hill in ttt_pigisland. But it's open to fire from inside the house, and there's a tantalizing jump pad just off the right edge.

![image](https://user-images.githubusercontent.com/11641991/181202144-c9a37eb1-7aa8-4ff3-853e-58c11845c70d.png)
ttt_oldchurch is almost all in shadow. People are uneasy in the dark so they can't stay still for long, and are usually trying to climb  the level geometry for treats.

## Traitor Mechanics

### Traitor Testers

A bad traitor tester is defensible, well-lit, and efficient. A good tester is few or none of those.

People are stupid in groups, and _terrible_ at multitasking, so a good traitor tester is simple to operate. It has some excuse to make people split up or argue, whether it's fetching items to power it or hashing out trust issues.

![image](https://user-images.githubusercontent.com/11641991/181189954-ebcdd160-78c2-47b3-9bbc-90838897bfe4.png)
The tester in ttt_community_bowling is well-lit, surrounded by glass, and has a single entrance. It operates slowly, but only requires a button press.

![image](https://user-images.githubusercontent.com/11641991/181189690-f1d19113-96df-44de-892c-d7e2ae91df09.png)
The tester in ttt_manhouse is in a dark, cavernous space next to an explosive water heater. It operates instantly, but requires one of a limited amount of fruits scattered around the map.

![image](https://user-images.githubusercontent.com/11641991/181191883-a7141f2f-2899-4fe9-96d0-c177e66c7469.png)
The tester in ttt_riverside is in a foggy, exposed area and only tests for traitor weapons. It operates quickly, but requires gas cans.

### Traitor Traps

Like good traitor-testers, good traitor traps allow counterplay. They shouldn't be a button to press for free kills, because it feels bad to die instantly. 

![image](https://user-images.githubusercontent.com/11641991/181398411-c32adfec-9ac8-4550-b3c1-cad25fd086be.png)
ttt_oldchurch's falling masonry falls on a high-traffic path, but has routes around it.

![image](https://user-images.githubusercontent.com/11641991/181398666-a8be3818-8808-49aa-bed9-14368f5f8bfe.png)
ttt_manhouse's exploding boiler has a large radius, but plenty of room to navigate around it. 

Both of the above traps rely on laziness and complacence on the part of the innocent team.

![image](https://user-images.githubusercontent.com/11641991/181399329-bc5e0815-9888-4bfa-b7cf-f1aa20d6b472.png)
ttt_nighttrap puts the titular Night Traps in well-lit areas next to TVs. It's a good way to make scary zones.

Counterplay can take the form of:
- traps with some audio/visual cue before they activate
- traps in a high-traffic path that has a longer/inconvenient, yet safe, detour
- "traps" that spawn something not immediately hostile, like an explosive barrel

#### thanks for reading! 
{:.no_toc}
maps featured:
- [ttt_PigIsland](https://steamcommunity.com/sharedfiles/filedetails/?id=2839995999)
- [ttt_OldChurch](https://steamcommunity.com/sharedfiles/filedetails/?id=2762219146)
- [ttt_ManHouse](https://steamcommunity.com/sharedfiles/filedetails/?id=2479468104)
- [ttt_community_bowling](https://steamcommunity.com/sharedfiles/filedetails/?id=131667838)
- [ttt_riverside](https://steamcommunity.com/sharedfiles/filedetails/?id=312731430)
- [ttt_NightTrap](https://steamcommunity.com/sharedfiles/filedetails/?id=270698403)
