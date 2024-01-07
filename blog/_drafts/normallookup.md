---
layout: post
title: 3D to Pixel Art
---

There are many techniques out there for rendering 3D objects as pixel art. It usually looks very bad. I've developed my own method.

![img](https://garzaa.github.io/blog/assets/3dnormal/header.gif)

### Why
Pixels in pixel art art is hand-placed. Therefore, it is:
- Clear
- Imperfect

I want complicated structures like gears and spiral drills in my game. I do not want to animate gears turning in Aseprite, so I needed a 3D method.

![image](https://pyxis.nymag.com/v1/imgs/e72/52d/0de1fd5b9870221160bae2c61acd4e09ba-42-dead-cells.1x.rsquare.w1400.jpg)
Dead Cells uses 3D models for pixel graphics. The game is fun and the animations themselves are great, but I feel it suffers from a lack of clarity during important moments that the art team tries to rectify with additive blending.
There's a lot of bloom and soft gradients here.

It was inspirational. I wanted something similar but without having to deal with normal maps, toon shaders, and lighting.

> You can read their blog post about their art pipeline [here](https://www.gamedeveloper.com/production/art-design-deep-dive-using-a-3d-pipeline-for-2d-animation-in-i-dead-cells-i-).

### Clarity

To get around lights and toon shaders, I just look at the normal direction of the face from the camera and pick the corresponding color from a normal map.

Here's the normal lookup image for the header. Think of it as how I'd shade a sphere in the game's world.

And here's the corresponding part of the fragment shader:
```hlsl
fixed4 frag (v2f i) : SV_Target {
				half4 color;
				// now just offset normal.xy by the noise texture's r and b values
				half2 noiseOffset = (tex2D(_NoiseTex, i.texcoord.xy * _NoiseTex_ST.xy).rb);
				// convert to -1, 1
				noiseOffset = noiseOffset * 2 - 1;
				// scale by noiseStr
				noiseOffset *= _NoiseStr;
				color = tex2D(_ColorMap, ((i.normal.xy + 1) / 2) + noiseOffset);
				color = lerp(color, _FlashColor, _FlashColor.a);
				return color;
            }
```
