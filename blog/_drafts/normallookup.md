---
layout: post
title: 3D to Pixel Art
---

There are many techniques out there for rendering 3D objects as pixel art. It usually looks very bad. I've developed my own method.

![img](https://garzaa.github.io/blog/assets/3dnormal/header.gif)

## Why
Pixels in pixel art art are hand-placed. Therefore, it is:
- Clear
- Imperfect

I want complicated structures like gears and spiral drills in my game. I do not want to animate gears turning in Aseprite, so I needed a 3D method.

![image](https://pyxis.nymag.com/v1/imgs/e72/52d/0de1fd5b9870221160bae2c61acd4e09ba-42-dead-cells.1x.rsquare.w1400.jpg)
Dead Cells uses 3D models for pixel graphics. The game is fun and the animations themselves are great, but I feel it suffers from a lack of clarity during important moments that the art team tries to rectify with additive blending.
There's a lot of bloom and soft gradients here.

It was inspirational. I wanted something similar but without having to deal with normal maps, toon shaders, and lighting.

> You can read their blog post about their art pipeline [here](https://www.gamedeveloper.com/production/art-design-deep-dive-using-a-3d-pipeline-for-2d-animation-in-i-dead-cells-i-).

### Clarity

To get around lights and toon shaders, I drew a normal lookup texture.

![img](https://garzaa.github.io/blog/assets/3dnormal/lookup.png)

Think of it as how I'd shade a sphere in the game's world.

When applying the shader to the model, I use an optional noise texture to roughen the model surface and artificially add detail. You can see that in action on the sphere, which would otherwise look just like the normal lookup image.
```hlsl
fixed4 frag (v2f i) : SV_Target {
	half4 color;
	// offset normal.xy by the noise texture's r and b values
	half2 noiseOffset = (tex2D(_NoiseTex, i.texcoord.xy * _NoiseTex_ST.xy).rb);
	// convert to -1, 1 so it's not just offset positively
	noiseOffset = noiseOffset * 2 - 1;
	// apply noise slider
	noiseOffset *= _NoiseStr;
	color = tex2D(_ColorMap, ((i.normal.xy + 1) / 2) + noiseOffset);
	color = lerp(color, _FlashColor, _FlashColor.a);
	return color;
}
```

![img](https://garzaa.github.io/blog/assets/3dnormal/roughness.gif)

Moving the roughness slider to demonstrate how it works. I use a standard tiled smooth noise texture to modify the vertex normals.

### Imperfection

3D art looks _too_ perfect rendered as pixels. Its smooth movement and consistency stands out too much.
I used two methods to disguise it.

#### Toon Motion

I've touched on this method before. I have a [script](https://gist.github.com/garzaa/59596a6836804338258ad53ff09cd0cb) that cuts objects' movement in Unity into a predefined FPS. 


#### World Space Vertex Jitter

<video src="https://user-images.githubusercontent.com/11641991/204958094-e28d2853-8709-47e0-98c7-6c4d46c69428.webm" autoplay="autoplay" loop="loop" controls style="width: 100%;"></video>
This one is the most interesting to me. I mess up the models just a _tiny_ bit as they move through space to mimic the inconsistencies of rendering a 3D object as pixel art.
