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

With this, you can edit a common set of materials for all items in the pack, which
saves you time, disk space, and IO load time. It's especially useful if you have
a bunch of similar things like rocks or trees or whatever.

Also, if you have a couple track pieces, or a few different types of rock,
you can keep them all in one item pack, and quickly switch between them instead of 
loading a new item every single time.

## You Will Have To Edit A File

I know, sorry. You can't do it all in-game. I mean, you'll be looking at the files
anyway, if you're exporting 3D models into these folders, but still...

When you create a new item pack, a folder will be created with its name, and a few
starter files.

```
.
└── addon name/
    ├── manifest.json
    ├── Material A/
    ├── Material B/
    ├── Material C/
    └── Material D/
```

You'll need to edit `manifest.json` as you add items, in order to tell NEODRIVE
which folders to look in.

> But why can't NEODRIVE just find them automatically?

Listing folders in a directory and walking through them to find item pack manifests
is more time-consuming than just loading a text file into memory. I'm making the tradeoff
of offloading some of the complexity to you and me, in order to make the game run faster
for everyone.

## Adding A Model To The Pack

Let's say you're making a new track segment in Blender, called MyTrackPiece.
I assume you know how to use Blender.

The Blender file should have at most 3 visual models in it. These are the LODs.
Inside the file, you should have the meshes like this:

```
.
└── MyTrackPiece.blend/
    ├── LOD0
    ├── LOD1
    ├── LOD2
    └── Collision
```

Higher numbers should be less detailed.

**NOTE**: This is optional. If you want to skip levels of detail, you can just have
one model inside the file. It still should be named `LOD0`.

```
.
└── MyTrackPiece.blend/
    ├── LOD0
    └── Collision
```

Collision meshes are optional as well, but are _highly recommended_. A completely bare,
unoptimized file would just be this:

```
.
└── MyTrackPiece.blend/
    ├── LOD0
```

When you export MyTrackPiece, you should create a new folder for it and
export the model as a .glb into it with **the same name as the folder**, like so:

```
.
└── addon name/
    ├── manifest.json
    ├── Material A/
    ├── Material B/
    ├── Material C/
    ├── Material D/
    └── MyTrackPiece/
        ├── MyTrackPiece.glb
        └── manifest.json
```
