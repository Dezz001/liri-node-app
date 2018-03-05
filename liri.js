

// Terminal Commands

	// * `my-tweets`

	// * `spotify-this-song`

	// * `movie-this`

	// * `do-what-it-says`



// Required Packages
require("dotenv").config();

var request = require("request");

var Spotify = require("node-spotify-api");

var Twitter = require("twitter");

var OMDB = require("omdb");

var fs = require("fs");

var keys = require("./keys");



// Assigning client keys
var twitterClientKey = new Twitter(keys.twitterKey);
var spotifyClientKey = new Spotify(keys.spotifyKey);
// var omdbClientKey = new OMDB("trilogy");



// testing keys
// console.log(twitterClientKey)
// console.log(spotifyClientKey)


// Command line argument setup
var liriCommand = process.argv[2];

var mySong = process.argv[3];

var myMovie = process.argv[3];

var doIt = process.argv[2];






// Twitter Function
var getTwitterStuff = function() {

	
	// Object parameters
	var params = {
		screen_name: "PopaPop7",
		count: 20
	};

	// Asking Twitter to search for tweets with the indicated parameters
	twitterClientKey.get("statuses/user_timeline", params, function(error, tweets, response) {
		if (!error) {

			// Twitter data is held here
			var twitterResults = [];

			// Creating loop to collect and push Twitter data to array.
			for (var i = 0; i < tweets.length; i++) {
				
				twitterResults.push({
					"Tweet created at: " :tweets[i].created_at,
					"Tweet: " : tweets[i].text,
					"Tweet ID: " : tweets[i].id,
				})
			};

			// Testing output
			// console.log(tweets);

			// Required output
			console.log("-----------------")
			console.log(twitterResults);
			console.log("-----------------")  

		}

	});

};





// Spotify Function
var getSpotifyStuff = function(mySong) {

	

	// Default search if music not indicated
	if (mySong === undefined) {
		var mySong = "The Sign";
	}

	// Asking Spotify to search for song based on entry
	spotifyClientKey.search({type: "track", query: mySong}, function (error, response) {

		if (!error) {

			var music = response.tracks.items

			// Spotify results is held here
			var spotifyResults = [];

			// Creating loop to collect and push all returned results to array.
			for (var i = 0; i < music.length; i++) {
				spotifyResults.push({
					"Artist(s): " :music[i].artists,
					"Song Name: " : music[i].name,
					"Preview Song: " : music[i].preview_url,
					"Album: " : music[i].album.name,
				});
			}

			// Required output
			console.log("-----------------")
			console.log(spotifyResults);
			console.log("-----------------")

		}

	});
}


// Movie Function
var getMovieStuff = function(myMovie) {

	// Default search if movie not indicated
	if (myMovie === undefined) {
		myMovie = "Mr. Nobody.";
		console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/")
		console.log("It\s on Netflix!")
	}

	// Asking OMDB to search for movies based on entry
	var movieURL = "http://www.omdbapi.com/?t=" + myMovie + "&y=&plot=short&apikey=trilogy";

	request(movieURL, function (error, response, body) {

		if (!error) {

			var movie = JSON.parse(body);

			// Spotify results is held here
			var movieResults = [];

			// Creating loop to collect and push all returned results to array.
			// for (var i = 0; i < movie.length; i++) {
				movieResults.push({
					"Title: " : movie.title,
					"Year: " : movie.year,
					"IMDB Rating: " : movie.imdbRating,
					"Rotten tomatoes Rating: " : movie.ratings,
					"Production Country: " : movie.country,
					"Movie Language: " : movie.language,
					"Movie Plot: " : movie.plot,
					"Movie Actors: " : movie.actors,
				});
			// }

			// Required output
			console.log("-----------------")
			console.log(movieResults);
			console.log("-----------------")

		}

	});

}





// do-what-it-says
var randomText = function() {

	var doItResults = [];
	
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (!error) {
			doItResults.push({data});
			console.log(doItResults);
		}
	});


}






// Determine which LIRI command is being requested by the user
if (liriCommand === "my-tweets") {
	getTwitterStuff();

}

else if (liriCommand === "spotify-this-song") {

	getSpotifyStuff();
}

else if (liriCommand === "movie-this") {

	getMovieStuff();
}

else if (liriCommand === "do-what-it-says") {

	randomText();
}

else {
	console.log("Test Marker");
}

