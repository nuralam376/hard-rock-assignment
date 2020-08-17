function fetchLyric(artist, title) {
	fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
		.then((response) => response.json())
		.then((json) => console.log(json));
}

// Display the songs in the page
function displaySongs(song) {
	const albumTitle = song.album.title;
	const artistName = song.artist.name;

	console.log(albumTitle + " " + artistName);
	document.querySelector(
		".search-result .single-result #songInfo h3"
	).innerHTML = albumTitle;
	document.querySelector(
		".search-result .single-result #songInfo p"
	).innerHTML = artistName;
}

// Handles the songs info
function handleSongs(songs) {
	if (songs.data < 0) {
		alert("No Data found");
		return;
	}

	document.querySelector(".search-result").style.display = "block";

	for (let song of songs.data) {
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

	fetchSongs(songName);
});
