# 🔎 Steam Workshop Project Exporter

> **Purpose.** Export **all** your Steam Workshop uploads to a clean JSON file using the Steam Web API. This is a PoC project I made to fix the recurring issue where **artworks** mess up your Workshop page.

---

## Why this exists (and why it matters for Artworks)

Steam’s profile Workshop page can go wrong, especially when you upload **Artwork** (long artwork used in showcases):

* Your **profile says you have N Workshop items**, but **the list is empty or incomplete** with random spaces between items.
* Items are **visible only when filtering by a specific game**, or **only to you** while others see nothing.
* Your **Workshop Artwork** becomes invisible but still messes up your page, and you want to delete them.

When this happens, it's very hard or impossible to clean up. This script bypasses the UI and **pulls your uploads directly from the Steam Web API (`IPublishedFileService/GetUserFiles`)**, so you can find back those freaking project URLs.

> This project **does not change** anything or delete content; it only exports metadata so you can decide what to do next (e.g., make artworks private, remove, etc).

---

## Features

* Fetch the **total** of your Workshop uploads and their **full details**.
* Output `processedWorkshop.json` with a compact, practical subset:

  * `title`, `description`, `app_name`, `id`, `url`
  * `views`, `subscribers`, `comment_count`, `favorited`, `likes`, `dislikes`
  * `fileSize` (MiB)

---

## Requirements

* **Steam Web API Key** – [https://steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey)
* **SteamID64** of your account.

## Configuration

Set credentials at the top of the script:

```js
const API_KEY = "<your_api_key>"; // https://steamcommunity.com/dev/apikey
const STEAM_ID = "<your_steamid64>";
```

To find your SteamID64, use a resolver like steamid.pro from your profile URL.

---

## Usage

```bash
node index.js
```

**Output:**

* Console logs the detected item count.
* Creates `processedWorkshop.json` at repo root.

### Example output

```json
[
	{
		"title": "Ballistic Shields - Astolfo Reskin 🌹 - Content ONLY",
		"description": "Astolfo Reskin on Ballistic Shields You need to subscribe to both addon and search for the best loading order in workshop (last screenshot)",
		"app_name": "Garry's Mod",
		"id": "3497647876",
		"url": "https://steamcommunity.com/sharedfiles/filedetails/?id=3497647876",
		"views": 296,
		"subscribers": 41,
		"comment_count": 0,
		"favorited": 16,
		"likes": 12,
		"dislikes": 2,
		"fileSize": "10.34 MB"
	}
]
```

---

FUCK THE STEAM WEB API DOCUMENTATION, IT'S THE WORST AND ALSO BIG THANKS TO THIS REPO [https://github.com/SteamDatabase/SteamTracking/](https://github.com/SteamDatabase/SteamTracking/)
