---
layout: post
title: Foolproof Unity Saving
---

The title is a bit hyperbolic, because we are all fools. But here is the flexible, ironclad JSON saving method I've been using for Vapor Trails.

1. tabool of contents
{:toc}

## Introduction
I previously used a binary saver, but I wanted to be able to debug my saves more easily, so it was time for a refactor.

There are a lot of insane things on the Unity forums, mostly one of "use this bloated dependency injection framework" or "buy my $15 asset pack." I didn't want to do either, so here we are.

You will need [Unity's JSON serialization package](https://docs.unity3d.com/Packages/com.unity.nuget.newtonsoft-json@3.0/manual/index.html).

## Overview
I wanted to make it as simple as possible, so here are the assumptions I'm working with:
- each Saved Object will have a `<string, object>` dictionary of properties to save
- it will expose two methods to inherited classes to load and save from those properties

NOTHING ELSE. Restricting APIs now means less thinking later. Let's start writing classes from the bottom up.

## Code

### JsonSaver
The Json Saver utility class needs to know if a file exists at a save slot number. If so, support loading it and comparing versions.
I've annotated the code with comments.
```c#
using UnityEngine;
using System;
using System.IO;
using Newtonsoft.Json;
using System.Threading.Tasks;

public class JsonSaver {
    const string extension = ".json";
    readonly string persistentDataPath;
    const string folder = "saves";

	// We cache the save path here because we want file writing to be async.
	// Async tasks cannot call Unity APIs (here, to get Application.PersistentDataPath)
	// so it needs to be figured out ahead of time.
    public JsonSaver(string datapath) {
        persistentDataPath = datapath;
    }

	// this is the actual async task to do the file I/O
    public async void SaveFile(Save save, int slot) {
        string saveString = JsonConvert.SerializeObject(save, Formatting.Indented);
        string filePath = GetSavePath(slot);
        using StreamWriter jsonWriter = new StreamWriter(filePath, append: false);
        jsonWriter.Write(saveString);
        await Task.Yield();
	}

    public Save LoadFile(int slot) {
        string filePath = GetSavePath(slot);
        string fileJson;
        using (StreamReader r = new StreamReader(filePath)) {
            fileJson = r.ReadToEnd();
        }
        return JsonConvert.DeserializeObject<Save>(fileJson);
    }

    public bool HasFile(int slot) {
        string filePath = GetSavePath(slot);
        if (!File.Exists(filePath)) return false;

        try {
            return CompatibleVersions(slot);
        } catch (Exception) {
            return false;
        }
    }
    
    string GetSavePath(int slot) {
        return Path.Combine(GetFolderPath(slot), slot+extension);
    }

    public string GetFolderPath(int slot) {
        string folderPath;
        folderPath = Path.Combine(persistentDataPath, folder, slot.ToString());
        Directory.CreateDirectory(folderPath);
        return folderPath;
    }

	// Standard semantic versioning rules - https://semver.org/
    public bool CompatibleVersions(int saveSlot) {
        string version = LoadFile(saveSlot).version;

        string[] saveVersion = version.Split('.');
        string[] currentVersion = Application.version.Split('.');

        return saveVersion[0].Equals(currentVersion[0]));
    }
}
```

### Save
This is the object that actually gets serialized as JSON and saved to the disk.
```c#
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

[System.Serializable]
public class Save {
	public string version;
	public Dictionary<string, object> objects = new Dictionary<string, object>();

	// Simpler than it looks! The save just has a version string and a giant dict
	// to hold its objects.

	// When a SavedObject asks the save for the properties dict at the object's path,
	// it descends through the slash-delimited path, creating sub-dicts as necessary,
	// and returns a reference to the terminal one.

	public Dictionary<string, object> LoadAtPath(string rawPath) {
		List<string> path = new List<string>(rawPath.Split('/'));
		Dictionary<string, object> current = objects;
		for (int i=0; i<path.Count; i++) {
			current = GetSubDict(current, path[i]);
		}
		return current;
	}

	Dictionary<string, object> GetSubDict(Dictionary<string, object> current, string key) {
		if (!current.ContainsKey(key)) {
			current[key] = new Dictionary<string, object>();
		} else if (current[key].GetType().Equals(typeof(JObject))) {
			current[key] = (current[key] as JObject).ToObject<Dictionary<string, object>>();
		}
		return current[key] as Dictionary<string, object>;
	}

	public void Wipe() {
		objects.Clear();
	}
}
```

### SaveManager
The orchestrator object that calls SavedObjects in the scene to sync/load their state when necessary.
```c#
using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.SceneManagement;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

public class SaveManager : MonoBehaviour {
	Save save = new();

	// Eternal saves are a special case, they exist outside saving/loading
	// This is only for achievements and the speedrun timer.
	Save eternalSave = new();
	const int eternalNum = -1;

	// You can yank this out or replace it with your own transition code
	// It's just responsible for handling scene transitions.
	TransitionManager transitionManager;

	static JsonSaver jsonSaver;
	static int slot = 1;

	static SaveManager instance;

	public GameObject saveIndicator;
	SavedObject[] savedObjects;
	string appVersion;

	// We are using the singleton instance for this
	// I normally prefer not to, but it's what works best with DontDestroyOnLoad.
	void Awake() {
		if (instance != null) {
			Destroy(gameObject);
			return;
		}

		instance = this;
		transform.parent = null;
		DontDestroyOnLoad(gameObject);
		// Since this script is not recreated every scene, need a custom scene load handler
		// instead of Awake().
		SceneManager.sceneLoaded += OnLevelLoad;
		jsonSaver = new JsonSaver(Application.persistentDataPath);
		appVersion = Application.version;
		savedObjects = FindObjectsOfType<SavedObject>(includeInactive: true);
	}

	public int GetSlot() {
		return slot;
	}

	void OnLevelLoad(Scene scene, LoadSceneMode mode) {
		transitionManager = GameObject.FindObjectOfType<TransitionManager>();
		// Load a slot zero save if it exists
		if (jsonSaver.HasFile(eternalNum)) {
			eternalSave = jsonSaver.LoadFile(eternalNum);
		}

		// These are the save-dependent objects
		// I'll get into their functioning further down the post
		savedObjects = FindObjectsOfType<SavedObject>(includeInactive: true);
		foreach (SavedObject o in savedObjects) {
			o.StartUp();
		}
	}

	public static Save GetSaveFor(SavedObject o) {
		if (o.useEternalSave) {
			return instance.eternalSave;
		} else {
			return instance.save;
		}
	}

	// Standard debugging. [ and ] to quicksave/quickload.
#if UNITY_EDITOR
	
	void Update() {
		if (Input.GetKeyDown(KeyCode.LeftBracket)) {
			Save();
		} else if (Input.GetKeyDown(KeyCode.RightBracket)) {
			Load();
		}
	}

#endif

	public static void Save() {
		instance.AsyncSave();
	}

	async void AsyncSave() {
		// It's a good idea to have a little spinner or something that
		// shows the user their progress is being saved.
		saveIndicator.SetActive(true);
		instance.save.version = appVersion;
		foreach (SavedObject o in savedObjects) {
			o.SyncToRuntime();
		}
		await Task.Run(() => {
			WriteEternalSave();
			jsonSaver.SaveFile(instance.save, slot);
		});
		// Don't just flash the save icon, even if the save is fast
		await Task.Delay(1000);
		FindObjectOfType<TimeSinceSave>()?.OnSave();
		saveIndicator.SetActive(false);
	}

	public static void Load() {
		WriteEternalSave();
		instance.StartCoroutine(FadeAndLoad());
	}

	static IEnumerator FadeAndLoad() {
		instance.transitionManager.FadeToBlack();
		yield return new WaitForSeconds(0.5f);
		instance.save = jsonSaver.LoadFile(slot);
		foreach (SavedObject o in FindObjectsOfType<SavedObject>(includeInactive: true)) {
			// When loading something like playerposition: 
			// if it's enabled don't jerk the camera around
			o.AfterDiskLoad();
		}
		instance.transitionManager.LoadLastSavedScene();
	}

	public static string GetSaveFolderPath() {
        return jsonSaver.GetFolderPath(slot);
    }

	public static void WipeSave() {
		instance.save.Wipe();
	}

	public static void WriteEternalSave() {
		foreach (SavedObject o in instance.savedObjects) {
			if (o.useEternalSave) o.SyncToRuntime();
		}
		instance.eternalSave.version = instance.appVersion;
		jsonSaver.SaveFile(instance.eternalSave, eternalNum);
	}

	public void OnApplicationQuit() {
		WriteEternalSave();
	}

	public static void TransitionPrep() {
		foreach (SavedObject o in instance.savedObjects) {
			o.SyncToRuntime();
		}
		WriteEternalSave();
	}
}

```

### SavedObject
This is the meat of the saving code, as it turns out. All saved objects inherit from this class.
```c#
using UnityEngine;
using System.Collections.Generic;
using UnityEngine.SceneManagement;
using Newtonsoft.Json.Linq;
using System.Linq;
using System;

public abstract class SavedObject : MonoBehaviour {
	[Tooltip("Persist over ALL playthroughs and reloads (e.g. an achievement)")]
	public bool useEternalSave = false;

	[Tooltip("Use state shared between scenes for objects with this hierarchichal name.")]
	public bool useGlobalNamespace;

	private Dictionary<string, object> properties = new();

	bool HasSavedData => properties.Count > 0;

	Save save;

	// This is called from the SaveManager, once the save is in order
	public void StartUp() {
		Load();
		Initialize();
		if (HasSavedData) LoadFromProperties();
	}

	public void Load() {
		properties = SaveManager.GetSaveFor(this).LoadAtPath(GetObjectPath());
	}

	public void SyncToRuntime() {
		SaveToProperties(ref properties);
		foreach (String s in properties.Keys.ToArray()) {
			if (properties[s] is Vector3) {
				SanitizeVector3(s);
			}
		}
	}

	// putting a vanilla vec3 in a dict will result in a circular ref error
	// w.r.t. normalization
	void SanitizeVector3(string s) {
		Vector3 v = (Vector3) properties[s];
		properties[s+"X"] = v.x;
		properties[s+"Y"] = v.y;
		properties[s+"Z"] = v.z;
		properties.Remove(s);
	}

	public void AfterDiskLoad() {
		Load();
		if (HasSavedData) LoadFromProperties();
	}

	// This happens first, to hook up inter-object references in the inheritor class.
	protected virtual void Initialize() {}

	// Inheritor reads its own properties. If this is called, they're guaranteed to exist.
	protected abstract void LoadFromProperties();

	// Inheritor syncs its own state to the properties dict
	protected abstract void SaveToProperties(ref Dictionary<string, object> properties);

	// Global namespaces are for things like player inventory that stay the same between scenes
	public virtual string GetObjectPath() {
		if (useGlobalNamespace) return $"global/{name}/{GetType().Name}";
		return $"{SceneManager.GetActiveScene().name}/{GetHierarchicalName()}/{GetType().Name}";
	}

	// Inheritors call this method to read a property. You have to do a little finagling
	// for some types of objects, but generally for simple non-nested objects this is fine.
	// Remember: this is necessary because it's saved as a generic JSON object.
	protected T Get<T>(string key) {	
		if (typeof(T).Equals(typeof(Vector3))) {
			return (T) Convert.ChangeType(GetVector3(key), typeof(T));
		}

		var v = properties[key];
		try {
			return (T) v;
		} catch (InvalidCastException) {
			// simple conversions that are serialized as C# types
			if (typeof(T).Equals(typeof(float))) {
				return (T) Convert.ChangeType(v, typeof(float));
			} else if (typeof(T).Equals(typeof(int))) {
				return (T) Convert.ChangeType(v, typeof(int));
			} else if (properties[key].GetType().Equals(typeof(JObject))) {
				return (properties[key] as JObject).ToObject<T>();
			}
		}
		throw new InvalidCastException("No valid cast for property "+key+"!");
	}

	// For sub-lists and hash sets, below, you need to do more conversion work
	protected List<T> GetList<T>(string key) {
		var v = properties[key];
		try {
			return (List<T>) v;
		} catch (InvalidCastException) {
			return (v as JArray).ToObject<List<T>>();
		}
	}

	protected HashSet<T> GetHashSet<T>(string key) {
		var v = properties[key];
		try {
			return (HashSet<T>) v;
		} catch (InvalidCastException) {
			return (v as JArray).ToObject<HashSet<T>>();
		}
	}

	Vector3 GetVector3(string key) {
		return new Vector3(
			Get<float>(key+"X"),
			Get<float>(key+"Y"),
			Get<float>(key+"Z")
		);
	}

	string GetHierarchicalName() {
		string name = this.name;
		GameObject g;
		while (transform.parent != null) {
			g = transform.parent.gameObject;
			name = g.name + "/" + name;
		}
		return name;
	}
}
```

Ok, that was a lot. You can copy-paste the code into your own game if you want, but it's worth reading comments for any caveats
in case you want to extend a SavedObject with a special one-off case or something.

## Use-cases
### SavedAnimation
This is a simple case of a SavedObject. It's for something like a door opening.
```c#
using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class SavedAnimation : SavedObject {
	public AnimationClip transition;
	public AnimationClip stay;
	Animator animator;

	bool run = false;

	protected override void Initialize() {
		animator = GetComponent<Animator>();
	}

	protected override void LoadFromProperties() {
		run = Get<bool>("run");
		if (run) animator.Play(stay.name);
	}

	protected override void SaveToProperties(ref Dictionary<string, object> properties) {
		properties["run"] = run;
	}

	// This method is called externally to fire the animation.
	public void Run() {
		animator.Play(transition.name);
		this.run = true;
	}
}
```
### PlayerProperties
This object saves information about a player's state, like:
- which direction they're facing
- position
- current HP, energy, etc

```c#
using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class PlayerProperties : SavedObject {
	EntityController player;
	ValCombatController combatController;
	HP hp;

	override protected void Initialize() {
		player = GetComponent<EntityController>();
		combatController = GetComponent<ValCombatController>();
		hp = GetComponent<HP>();
	}

	protected override void LoadFromProperties() {
		// if transition is empty, then it's a from-disk load
		// as opposed to a transition load
		// there are different types of transitions: door, subway, respawn
		// each with their own events called at the end
		bool fromDiskLoad = FindObjectOfType<TransitionManager>().transition.IsEmpty();

		hp.SetCurrent(Get<int>("currentHP"));
		hp.SetMax(Get<int>("maxHP"));
		combatController.currentEP.Set(Get<int>("currentEP"));
		combatController.maxEP.Set(Get<int>("maxEP"));
		if (fromDiskLoad) {
			transform.position = Get<Vector3>("pos");
		}
		bool right = Get<bool>("facingRight");
		if ((right && !player.facingRight) || (!right && player.facingRight)) {
			player._Flip();
		}

		player.LoadAbilities(GetList<Ability>("abilities"));
	}

	protected override void SaveToProperties(ref Dictionary<string, object> properties) {
		properties["currentHP"] = hp.GetCurrent();
		properties["maxHP"] = hp.GetMax();
		properties["currentEP"] = combatController.currentEP.Get();
		properties["maxEP"] = combatController.maxEP.Get();
		// reload the player on the ground next time, if they're not already
		Vector3 pos = transform.position;
		if (!player.GetComponent<GroundCheck>().groundData.grounded) {
			float neutralDistance = GetComponent<CapsuleCollider2D>().bounds.extents.y;
			pos.y -= GetComponent<GroundCheck>().groundData.distance;
			pos.y += neutralDistance + 4f/64f;
		}
		properties["pos"] = pos;
		properties["facingRight"] = player.facingRight;
		properties["abilities"] = player.GetAbilities();
	}
}
```

## Conclusion
That's all. Thanks for reading. I'm sure there are better ways to do it, but this one has served me well for the last couple years.
