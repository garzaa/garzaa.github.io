---
layout: post
title: Procedural Water
usemathjax: true
---

How to generate pseudo-3D water with a noise texturea and some color ramps

<video src="https://user-images.githubusercontent.com/11641991/204958094-e28d2853-8709-47e0-98c7-6c4d46c69428.webm" autoplay="autoplay" loop="loop" controls style="width: 100%;"></video>

1. toc son
{:toc}

## Setup

I used:
- the [2d pixel perfect](https://docs.unity3d.com/Packages/com.unity.2d.pixel-perfect@1.0/manual/index.html) package
- a [perlin noise texture](http://kitfox.com/projects/perlinNoiseMaker/)


## Perspective distortion

I initally set parameters for:
- a horizon distance (how many repeats of the texture it takes to get to the horizon)
- main noise texture scale
- texture move speed

![image](https://user-images.githubusercontent.com/11641991/205401449-1da13328-6859-4567-b380-bbdd32d03e7f.png)

Excerpt from the fragment shader:
```hlsl
// make uv x centered in screen space to put the vanishing point in the screen center
// i.e. remap from 0-1 to -1 - 1
uv.x = (uv.x*2) - 1;

// bottom of the texture should start at 0 instead of 1 for easier calculations
uv.y = 1 - uv.y;

// it needs to increase massively and then decrease a bit
float logCurve = log(uv.y)+1;
float powerCurve = pow(uv.y, 8);

// closer UVs use more of the worldPosition
uv.x = lerp(uv.x, worldpos.x, 1-logCurve);

uv.y = powerCurve * _HorizonDistance;
uv.x /= lerp(0, _HorizonDistance, 1-logCurve);

uv += _Time.x * _MoveSpeed;

fixed4 c = tex2D (_NoiseTex, uv/_MainScale.xy);
return c;
```

The difference between `logCurve` and `powerCurve` is important here. To mimic foreshortening as the water approaches the horizon, I use two different curves to represent distance.

For y-texture compression, I use the power curve, represented by:

$$
	y = (x^8) * horizonDistance
$$

![image](https://user-images.githubusercontent.com/11641991/205402169-c07a2464-a9ab-4815-b1ac-5530460c268e.png)

Instead of the linear $$x$$ curve (red) or the $$x^2$$ curve (green), the $$x^8$$ curve (blue) gives a slow increase in computed distance that rapidly increases
towards the maximum distance.

Behavior on the X axis is slightly different. To mimic parallax, the closer water needs to move with the player's `worldPos` while the water further towards the horizon needs to move less, if at all. I tweaked some values and eventually settled on this distance formula for the X axis:

$$
	y = \log_{e}(x) + 1
$$

![image](https://user-images.githubusercontent.com/11641991/205402676-986955ab-70d1-43ff-baff-696a442b8f7b.png)

## Colorization

Now that the noise was distorted correctly, I mapped it to a color. I added a new texture field for a color ramp, and provided this texture:

![image](https://user-images.githubusercontent.com/11641991/205402838-0325327d-dfc5-46bb-98de-85180aa34be3.png)

Then I colorized the ocean by mapping lightness values and distance to the X and Y coordinates of the image.
```hlsl
c = tex2D(_ColorRamp, fixed2(c.r, powerCurve));
```

![image](https://user-images.githubusercontent.com/11641991/205403255-6ec587e5-c020-4826-8507-a72efb826414.png)

With some movement, that led to this translation:
![image](https://user-images.githubusercontent.com/11641991/205401449-1da13328-6859-4567-b380-bbdd32d03e7f.png)
![basicmovement](https://user-images.githubusercontent.com/11641991/205404035-149087b2-e553-45fb-9afe-dbba4a7ad7ef.gif)

Looks boring. One trick to instantly add complex movement is to overlay another texture on the first one and move it at a different rate.
I added two lines of code to do that, before I do the color lookup:

```hlsl
	// get another color from a larger noise texture moving diagonally
	fixed4 c2 = tex2D(_NoiseTex, (uv+ fixed2(_Time.x/2, _Time.z/2))/_MainScale.xy/4 );
	// combine the colors of the two based on how light the second one is
	c = lerp(c, c2, c2.r*0.5);
```
![overlaynoise](https://user-images.githubusercontent.com/11641991/205404043-3f6dc8a0-200b-4591-aa16-a2a0eaf109c9.gif)
This is what the noise texture looks like now before I do the color lookup.

![overlaycolorized](https://user-images.githubusercontent.com/11641991/205404044-99bfbf7d-a4bd-4b6b-927d-fce54142e812.gif)
Colorized, it looks much more natural and chaotic.

## Extras

I added foam moving over the surface, which was as simple as duplicating the material with a different movement speed and providing this color ramp instead:

![image](https://user-images.githubusercontent.com/11641991/205405151-6202419e-de5d-4efe-94f1-e6504f28af7f.png)

That translated into the final version:

![overlayfoam](https://user-images.githubusercontent.com/11641991/205404041-b673c78c-235c-43c8-ae53-7bfcecfc2180.gif)

Thanks for reading.

- [source code](https://github.com/garzaa/vaportrails/blob/master/Assets/Shaders/PerspectiveWater.shader)
- [playable demo](https://sevencrane.itch.io/vaportrails-physics)
