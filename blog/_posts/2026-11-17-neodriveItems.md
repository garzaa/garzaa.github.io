---
title: Creating Items for NEODRIVE
layout: post
---

An overview of how to create items for NEODRIVE's track editor.

1. test
{:toc}

## Overview

Items in NEODRIVE are stored in structures called Item Packs. This is slightly
more complex, but it makes development of mods easier.

By combining many items into one pack, you can edit a common set of materials for all items, which
saves you time, disk space, and IO load time. It's especially useful if you have
a bunch of similar things like rocks or trees.

Also, if you have a couple track pieces, or a few different types of rock,
you can keep them all in one item pack, and quickly switch between them instead of 
loading a new item every single time.

## Example: Creating a Pack

Let's assume you're creating a new Item Pack called My Item Pack. You intend to have one
track piece in it, called My Track Piece. 

To create a new Item Pack, open the Item Editor and click the button on the top left.

<img src="https://garzaa.github.io/blog/assets/neodrive_items/create pack.png">

You'll be prompted to either open an existing Item Pack or type a name for a new one. 
Any Item Packs you've created and published on Steam will be available to edit and 
update as well. They'll have a number instead of a name because that's their unique
Steam Workshop ID, but their name will still appear.

<img src="https://garzaa.github.io/blog/assets/neodrive_items/new item pack.png">

Once you do this, NEODRIVE will automatically create the folders for your item, as well
as the four available materials and their textures. Depending on your operating system,
it may take a second.

### Adding an Item to the Item Pack

<img src="https://garzaa.github.io/blog/assets/neodrive_items/item blender full.png">

In Blender, this is what the file for My Track Piece should look like: Three LOD (level of detail) meshes, plus
a collision mesh. **They must be named LOD1/2/3 and Collision.**

<img src="https://garzaa.github.io/blog/assets/neodrive_items/item blender structure.png">

#### Item File Structure
- Collision meshes are optional, but recommended.
- The order of the meshes doesn't matter.
- You can have up to three LODs, or just one if you have a simple mesh.
- LOD0 should be the most detailed, and LOD2 should be the least detailed.
- LOD transition distances are determined automatically based on the item's bounding box size, which is also 
determined automatically.

#### Materials

<img src="https://garzaa.github.io/blog/assets/neodrive_items/item material slots.png">

- You can have up to four material slots in your item meshes, but all items in an Item Pack share the same pool of possible materials.
- Fewer material slots means fewer draw calls, which means better performance. But, like me, don't sweat it too much
until people start complaining.

#### Axes
If creating a track piece, its forward direction should be in the **-Y** direction, for reasons I'll describe in the 
Exporting section.

<img src="https://garzaa.github.io/blog/assets/neodrive_items/track axis detail.png">

Be sure to <a href='https://docs.blender.org/manual/en/latest/scene_layout/object/editing/apply.html'>apply your transforms</a> before exporting!
Just rotating the track piece in Object Mode won't cut it.

### Exporting from Blender

NEODRIVE expects item files to be exported as a `.glb`. Blender should be able to export it just fine.

To find the folder to export into, click the folder view icon. It'll open your OS's file explorer to the target item pack folder.

<img src="https://garzaa.github.io/blog/assets/neodrive_items/item pack folder view.png">

> Your folder path will be different. The one shown here is for the game running inside Unity so Item Packs I create here
can be packaged with the game.

Back in Blender, navigate to that folder, and create a **new** folder for what you want your item to be named. 
Assuming you're making an item called My Track Piece, it'd look like this:

<img src="https://garzaa.github.io/blog/assets/neodrive_items/blender export path.png">

Inside that folder, continue with the export of `My Track Piece.glb`. Make sure your export parameters look like these.

<img src="https://garzaa.github.io/blog/assets/neodrive_items/blender export params.png">

#### What & Why:
- `Active Collections/Nested Collections`: In case you have Clone/Mirror modifier pivots, boolean carve objects, scene lights, or anything else,
you don't want them to be included, because they'll inflate the file size. Put them in a separate collection and uncheck it.
- `+Y Up`: Blender's "up" direction is Z. In the Unity engine, the "up" direction is Y. You need to bake this conversion
during the item export stage so NEODRIVE doesn't have issues loading it. As part of this item rotation, the "forward" direction is flipped, which
is why you needed to make the track segment's forward direction -Y as mentioned above.
- `Apply Modifiers`: If you have Clone or Mirror modifiers to create the final segment, like I do, you'll need to also bake them into the exported object.
- `UVs/Normals`: These are required for accurate lighting calculations on the object surface.

### Updating The Manifest

You'll need to update the `manifest.json` file to tell NEODRIVE that there is an item in the pack named My Track Piece.

<img src="https://garzaa.github.io/blog/assets/neodrive_items/pack manifest source.png">

> You won't see any .meta files. Those are autogenerated by Unity, since I'm exporting these into a folder inside the NEODRIVE game project.

When you open it, it'll look like this:
```js
{
  "materials": [
    "Material A",
    "Material B",
    "Material C",
    "Material D"
  ],
  "itemNames": [],
  "version": 1,
  "name": "My Item Pack",
  "authorSteamID": "",
  "addonType": "itemPack",
  "description": null,
  "publishedFileID": null
}
```

You'll need to add your item name to `itemNames`, so it ends up like this:

```js
{
  "materials": [
    "Material A",
    "Material B",
    "Material C",
    "Material D"
  ],
  "itemNames": [
  	"My Track Piece"
  ],
  "version": 1,
  "name": "My Item Pack",
  "authorSteamID": "",
  "addonType": "itemPack",
  "description": null,
  "publishedFileID": null
}
```
> But why can't NEODRIVE just find them automatically?

Listing folders in a directory and walking through them to find item pack manifests
is more time-consuming than just loading a text file into memory. I'm making the tradeoff
of offloading some of the complexity to you and me, in order to make the game run faster
for everyone.

Back in NEODRIVE, click "Save & Rescan Pack" to pick up your new item. You'll see a message about
manifest regeneration.

<img src="https://garzaa.github.io/blog/assets/neodrive_items/manifest generation.png">

You'll need to open that file and edit it a bit, because if you try to load your item now, it'll log an error about material IDs.
It should look like this:

```js
{
  "materialIDs": null,
  "itemType": 0,
  "lodObjectSize": 0.0,
  "lodTransitions": null,
  "convexHull": false
}
```

Since I had two material slots for the mesh in the first image, I'll add two material IDs, to make the file look like this:
```js
{
  "materialIDs": [
  	"Material A",
   	"Material B"
  ],
  "itemType": 0,
  "lodObjectSize": 0.0,
  "lodTransitions": null,
  "convexHull": false
}
```

Back in Neodrive, click on the name for My Track Piece, et voila! Your custom track piece is imported. 

<img src="https://garzaa.github.io/blog/assets/neodrive_items/item import complete.png">

It is also completely white. Do not despair, that is just because the materials were created with their base
values, which show up bright white in an open scene. It's time to play with the material parameters until you're satisfied.


## FAQ

- manifest stuff
- editing others'?
-
