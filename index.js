let singleLyrics = document.querySelector(".single-lyrics");
let fancySearchResult = document.querySelector(".search-result");
let simpleSearchResult = document.querySelector(".simple-result");

// Handles the go back button of the lyrics
const showSongsResults = () => {
	singleLyrics.style.display = "none";
	fancySearchResult.style.display = "block";
	simpleSearchResult.style.display = "block";
};

// Displays the lyrics on the page
const displayLyrics = (song, artist, title) => {
	// Throw an alert if no lyrics is found
	if (!song.lyrics) {
		alert("Sorry, Lyrics is not found for this song. Try for another one");
		return;
	}

	singleLyrics.innerHTML = `
        <button class="btn go-back" onclick = "showSongsResults()">&lsaquo;</button>
        <h2 class="text-success mb-4">${title} - ${artist} </h2>
        <pre class="lyric text-white">${song.lyrics}</pre>
    `;

	simpleSearchResult.style.display = "none";
	fancySearchResult.style.display = "none";
	singleLyrics.style.display = "block";
	window.scrollTo(0, 0);
};

// Fetch the the lyrics of the song
const fetchLyric = (artist, title) => {
	fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
		.then((response) => response.json())
		.then((json) => displayLyrics(json, artist, title))
		.catch((error) => alert(error));
};

// Displays the lists in the simple design
const simpleSongResults = (songTitle, albumTitle, artistName) => {
	const simpleSong = document.createElement("div");
	simpleSong.className = "text-center";
	simpleSong.innerHTML = `
            <p class="author lead">
                <strong>${albumTitle}</strong> Album by <span>${artistName}</span> 
                <button onclick = "fetchLyric('${artistName}','${songTitle}')" class="btn btn-success">
                    Get Lyrics
                </button>
            </p>
    `;

	simpleSearchResult.appendChild(simpleSong);
};

// Displays the lists in the fancy design
const fancySongResults = (songTitle, albumTitle, artistName) => {
	const songInfo = document.createElement("div");
	songInfo.className = "single-result row align-items-center my-3 p-3";
	songInfo.innerHTML = `
    <div class="col-md-9" id="songInfo">
        <h3 class="lyrics-name">${songTitle}</h3>
        <p class="author lead">${albumTitle} Album by <span>${artistName}</span></p>
    </div>
    <div class="col-md-3 text-md-right text-center" id="getLyrics">
        <button onclick = "fetchLyric('${artistName}','${songTitle}')" class="btn btn-success">Get Lyrics</button>
    </div>`;

	fancySearchResult.appendChild(songInfo);
};

// Display the songs in the page
const displaySongs = (song) => {
	const songTitle = song.title;
	const albumTitle = song.album.title;
	const artistName = song.artist.name;

	simpleSongResults(songTitle, albumTitle, artistName);
	fancySongResults(songTitle, albumTitle, artistName);
};

// Handles the songs info after getting the result from the API
const handleSongs = (songs) => {
	if (!songs.data) {
		alert("No Data found");
		return;
	}

	simpleSearchResult.style.display = "block";
	fancySearchResult.style.display = "block";

	for (let [index, song] of songs.data.entries()) {
		// Shows only 10 items of the songs array
		if (index == 10) {
			break;
		}
		displaySongs(song);
	}
};

// Fetch the results of the songs user entered
const fetchSongs = (songName) => {
	fetch(`https://api.lyrics.ovh/suggest/${songName}`)
		.then((response) => response.json())
		.then((json) => handleSongs(json))
		.catch((error) => alert(error));
};

// Handles the click after the user click the search button
document.getElementById("search-song").addEventListener("click", function () {
	const songName = document.getElementById("song-name").value;

	singleLyrics.style.display = "none";

	// Checks whether the user types anything
	if (!songName || songName.trim() == "") {
		alert("Please enter the song name first");
		return;
	}

	simpleSearchResult.innerHTML = ""; // Clears the previous lists if any
	fancySearchResult.innerHTML = ""; // Clears the previous lists if any
	fetchSongs(songName);
});
