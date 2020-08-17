function fetchLyric(artist, title) {
	fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
		.then((response) => response.json())
		.then((json) => console.log(json));
}

// Display the songs in the page
function displaySongs(song) {
	console.log(song);
	const songTitle = song.title;
	const albumTitle = song.album.title;
	const artistName = song.artist.name;

	const songResults = document.querySelector(".search-result");

	const songInfo = document.createElement("div");
	songInfo.className = "single-result row align-items-center my-3 p-3";
	songInfo.innerHTML = `
    <div class="col-md-9" id="songInfo">
        <h3 class="lyrics-name">${songTitle}</h3>
        <p class="author lead">Album: ${albumTitle} by <span>${artistName}</span></p>
    </div>
    <div class="col-md-3 text-md-right text-center" id="getLyrics">
        <button class="btn btn-success">Get Lyrics</button>
    </div>`;

	songResults.appendChild(songInfo);
}

// Handles the songs info
function handleSongs(songs) {
	if (songs.data < 0) {
		alert("No Data found");
		return;
	}

	document.querySelector(".search-result").style.display = "block";

	for (let [index, song] of songs.data.entries()) {
		// Shows only 10 items of the songs array
		if (index == 10) {
			break;
		}
		displaySongs(song);
	}
}

// Fetch the results of the songs user entered
function fetchSongs(songName) {
	fetch(`https://api.lyrics.ovh/suggest/${songName}`)
		.then((response) => response.json())
		.then((json) => handleSongs(json));
}

// Handles the click after the user click the search button
document.getElementById("search-song").addEventListener("click", function () {
	const songName = document.getElementById("song-name").value;

	if (songName.length == 0 || songName.trim() == "") {
		alert("Please enter the song name first");
	}

	document.querySelector(".search-result").innerHTML = ""; // Clears the previous lists if any
	fetchSongs(songName);
});
