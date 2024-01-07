---
layout: post
title: 3D to Pixel Art
---

There are many techniques out there for rendering 3D objects as pixel art. It usually looks very bad. I've developed my own method.


### Why
Pixels in pixel art art is hand-placed. Therefore, it is:
- Clear
- Imperfect

I want complicated structures like gears and spiral drills in my game. I do not want to animate gears turning in Aseprite, so I needed a 3D method.

![image](https://pyxis.nymag.com/v1/imgs/e72/52d/0de1fd5b9870221160bae2c61acd4e09ba-42-dead-cells.1x.rsquare.w1400.jpg)
Dead Cells uses 3D models for pixel graphics. The game is fun and the animations themselves are great, but I feel it suffers from a lack of clarity during important moments that the art team tries to rectify with additive blending.
There's a lot of bloom and soft gradients here.

It was inspirational, but I wanted something similar but without having to deal with normal maps, toon shaders, and lighting.

> You can read their blog post about their art pipeline [here](https://www.gamedeveloper.com/production/art-design-deep-dive-using-a-3d-pipeline-for-2d-animation-in-i-dead-cells-i-).

### Clarity

