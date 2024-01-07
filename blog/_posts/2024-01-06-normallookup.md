---
layout: post
title: 3D to Pixel Art
---

There are many techniques out there for rendering 3D objects as pixel art. It usually looks very bad. I've developed my own method.

![img](https://garzaa.github.io/blog/assets/3dnormal/header.gif)

## Why
Pixels in pixel art art are hand-placed. Therefore, pixel art is:
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

<video src="https://user-images.githubusercontent.com/11641991/294740096-38f6ccc5-f147-4e5a-87bb-af340aef85a1.webm" autoplay="autoplay" loop="loop" controls style="width: 100%;"></video>

I've touched on this method before. I have a [script](https://gist.github.com/garzaa/59596a6836804338258ad53ff09cd0cb) that cuts objects' movement in Unity into 12 or 16 FPS.


#### World Space Vertex Jitter

![img](https://garzaa.github.io/blog/assets/3dnormal/jitter.gif)

I mess up the models just a _tiny_ bit as they move through space to mimic the inconsistencies of rendering a 3D object as pixel art.
> The sphere stays unchanged because its vertices aren't moving through space.

Here's the vertex shader:

```hlsl
v2f vert (appdata_base v) {
	v2f o;
	v.vertex.xyz += noise(mul(unity_ObjectToWorld, v.vertex).xyz) * _VertJitter * 0.001;
	o.pos = UnityObjectToClipPos(v.vertex);
	// use worldspace to avoid jitter when the camera moves
	o.texcoord = v.texcoord;
	o.normal = UnityObjectToWorldNormal(v.normal);
	return o;
}
```

## In-Game
<video src="https://github-production-user-asset-6210df.s3.amazonaws.com/11641991/294740390-8e533c3f-f709-4d1e-849f-1c33248b882a.webm" autoplay="autoplay" loop="loop" controls style="width: 100%;"></video>

Here's a boss arena with gears turning as a backdrop.

> These are terrible gears that look fine but would break in the real world. See [this post](https://kremlin.enterprises/post/616163773634494464/explain-to-me-how-gears-are-machined) for more.
