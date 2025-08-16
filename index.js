/*
 * Steam Workshop Artwork Exporter
 *
 * Why this exists:
 *   Uploading artwork to Steam Workshop can mess up everything:
 *     - Items disappear from your Workshop
 *     - Can't find your uploaded files anymore
 *     - Display becomes inconsistent
 *     - Standard Steam UI is unreliable
 *
 *
 * Big thx to this GitHub repo for being a better documentation than the official lol :
 *   https://github.com/SteamDatabase/SteamTracking/blob/master/API/IPublishedFileService.json
 * 
 * (Official Steam API docs were sadly fucking useless)
 * 
 * Done at 3 am, don't mind the code please.
 * 
 * Made by NightSpaceGTT
 */

const fs = require("node:fs");

const API_KEY = "<your_api_key>"; // https://steamcommunity.com/dev/apikey
const STEAM_ID = "<your_steamid64>";

async function GetUserFileCount() {
	const params = new URLSearchParams({
		key: API_KEY,
		steamid: STEAM_ID,
	});
	const res = await fetch(
		`https://api.steampowered.com/IPublishedFileService/GetUserFiles/v1/?${params}`
	);
	const data = await res.json();

	return data.response?.total || 0;
}

async function GetUserFileDetails(fileCount) {
	const params = new URLSearchParams({
		key: API_KEY,
		steamid: STEAM_ID,
		numperpage: fileCount,
	});
	const res = await fetch(
		`https://api.steampowered.com/IPublishedFileService/GetUserFiles/v1/?${params}`
	);
	const data = await res.json();

	return data.response.publishedfiledetails;
}

async function ProcessFileData(rawFileDetails) {
	let processedFileDataArray = [];

	for (let i = 0; i < rawFileDetails.length; i++) {
		const file = rawFileDetails[i];
		processedFileDataArray.push({
			title: file.title,
			description: file.short_description,
			app_name: file.app_name,
			id: file.publishedfileid,
			url: `https://steamcommunity.com/sharedfiles/filedetails/?id=${file.publishedfileid}`,

			views: file.views,
			subscribers: file.subscriptions,
			comment_count: file.num_comments_public,
			favorited: file.favorited,
			likes: file.vote_data.votes_up,
			dislikes: file.vote_data.votes_down,
			fileSize: `${(file.file_size / (1024 * 1024)).toFixed(2)} MB`,
		});
	}

	return processedFileDataArray;
}

(async () => {
	const fileCount = await GetUserFileCount();

	if (fileCount == 0) {
		console.log("User seems to not have any workshop files.");
		console.log("Might be an error, contact me for help.");
		return;
	}

	console.log(`User has ${fileCount} workshop files uploaded.`);
	const rawFileDetails = await GetUserFileDetails(fileCount);
	const processedFileDetails = await ProcessFileData(rawFileDetails);
	fs.writeFileSync(
		"processedWorkshop.json",
		JSON.stringify(processedFileDetails, null, `\t`),
		"utf-8"
	);

	console.log("User workshop details saved to processedWorkshop.json");
})();
