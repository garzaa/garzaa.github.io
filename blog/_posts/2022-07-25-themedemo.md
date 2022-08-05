---
layout: post
title: Theme Demo
usemathjax: true
---

this is a theme demo


1. test
{:toc}

## Sample H2
### Sample h3
#### sample h4

table of contents generated with `{:toc}`

[gem](https://rubygems.org/gems/crane-theme) / [github](https://github.com/garzaa/crane-theme)

---

fira code with ligatures and rougify base16 syntax highlighting

```c#
return a != b
while (j <= i) { }
Func<int, int> square = x => x * x;
Color x = new Color(0xee609c);
```
set `usemathjax: true` in the front matter to see my old ML problem sets

  When $$k=1$$ there is only one cluster center, call it $$c$$. Our optimization problem thus reduces to finding the optimal $$c \in \mathbb{R}^d$$. We can express the optimization of
  
  $$ 
  \sum_{i=1}^{n} ||x_i - c||^2
  $$
  
  as
  
   $$ 
  \text{argmin}_{c \in \mathbb{R}^d} \sum_{i=1}^{n} ||x_i - c||^2
  $$
  
try pressing `Ctrl``T` to send a brush to a `func_detail` entity.

_aorugh ough_

### misc markdown
#### ordered

1. one
1. five
1. ¼

#### unordered

- bullet
- bullet

#### some links
stay informed: [google.com](https://google.com)

stay **safe**: [vampirewebsite.net](http://vampirewebsite.net/)

#### blockquote
> Eventually you placed a hand on the fuselage and told me: the thing that makes them hover is slowing down the planet’s rotation, a little each day. The energy had to come from somewhere. Maybe years and years from now, we would figure out how to keep it from happening, put the speed back into the earth. It couldn’t last forever.

> You barely touched the tea. I didn’t know what you ate or drank those days, whether you’d still indulge in something that reminded you of home. Our lives kept us both in the air, but I was always attached to the windmills so I wouldn’t fall. I needed things from the earth, drank green tea and used root vegetables in my cooking. Untethered, you sipped high-altitude condensation and fell down the track in a straight line.

## Code Blocks

`c#`
```c#
void FollowRedirects(Vector3Int currentPos, GameTile from, ref HashSet<GameTile> results, HashSet<Vector3Int> visited) {
	if (!HasWarp(currentPos)) {
		results.Add(GetTileNoRedirect(currentPos));
		return;
	}

	foreach (KeyValuePair<TileWarpType, TileTraversal> kv in tileWarps) {
		TileWarpType warpType = kv.Key;
		TileTraversal traversal = kv.Value;
		if (traversal.HasTargets(currentPos)) {
			foreach (Vector3Int warpTarget in traversal.GetTargets(currentPos)) {
				// reflection is a special case, it might not have immediate neighbors
				// it can have been visited by other warps, but it always needs to hit the reflection here
				if (warpType == TileWarpType.REFLECT) {
					results.Add(from);
					visited.Add(currentPos);
					visited.Add(warpTarget);
					FollowRedirects(from.boardPosition, from, ref results, visited);
				}

				if (!visited.Contains(warpTarget)) {
					switch (warpType) {
						case TileWarpType.COPY:
							results.Add(GetTileNoRedirect(currentPos));
							goto case TileWarpType.REDIRECT;

						case TileWarpType.REDIRECT:
							visited.Add(currentPos);
							visited.Add(warpTarget);
							FollowRedirects(warpTarget, from, ref results, visited);
							break;
					}
				} else {
					results.Add(GetTileNoRedirect(currentPos));
				}
			}
		}
	}
}

```

`hlsl`
```hlsl
fixed4 frag(v2f IN) : SV_Target {
	half4 color = (tex2D(_MainTex, IN.texcoord) + _TextureSampleAdd) * IN.color;

	#ifdef UNITY_UI_CLIP_RECT
	color.a *= UnityGet2DClipping(IN.worldPosition.xy, _ClipRect);
	#endif

	#ifdef UNITY_UI_ALPHACLIP
	clip (color.a - 0.001);
	#endif

	fixed2 maskUV = (IN.texcoord / _MainTex_TexelSize) * _Overlay_TexelSize;
	fixed4 overlay = tex2D (_Overlay, maskUV + (_Time.w * _Speed));

	if (any(color.a > 0)) {
		color.rgba = overlay.rgba;
	}

	return color;
}
```
that's it 

![image](https://64.media.tumblr.com/e12227b5c91676c0b3aeafe9d4738c68/3246a312a009689b-56/s1280x1920/cbf9b8abc0173ff7d8220968963fdb581c8e8a56.png)
<sup>that was an image, this is some superscript</sup>

#### other considerations
there are none thanks for reading


