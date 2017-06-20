var fs = require('fs')
var argOne = process.argv[2]
var argTwo = process.argv[3]
var request = require('request')
var Twitter = require('twitter')
var keys = require('./keys.js')
var prettyjson = require('prettyjson')
var logText = 'log.txt'



fs.readFile(logText, 'utf8', function(err, data) {
    if (err) {
        console.log(err)
    }

    const logInfo = data.split(',')
})

//TWITTER
if (argOne === "my-tweets") {

    var twitterClient = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    //parameters for the twitter function screen name and count
    var params = {
        screen_name: 'cozy_joe',
        count: 20
    }
    twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error && response.statusCode === 200) {
            for (i = 0; i < tweets.length; i++) {
                var returnedData = ('Number: ' + (i + 1) + '\n' + tweets[i].created_at + '\n' + '@' + tweets[i].user.name + ': ' + tweets[i].text + '\n');
                console.log(returnedData);
                console.log("-------------------------");
            }
            fs.appendFile(logText, '\n\n my-tweets was executed', function(err){
            	if (err) {
            		console.log(err)
            	}
            })
        };
    });
    //TWITTER FUNCTION END


    //OMDB FUNCTION START
} else if (argOne === "movie-this" && argTwo !== undefined) {

    request('http://www.omdbapi.com/?apikey=40e9cece&t=' + argTwo + '&r=json', function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('===============================================================');
            console.log('Movie: ' + JSON.parse(body).Title);
            console.log('Year: ' + JSON.parse(body).Year);
            console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
            console.log('Metascore: ' + JSON.parse(body).Metascore)
            console.log('Country: ' + JSON.parse(body).Country);
            console.log('Language: ' + JSON.parse(body).Language);
            console.log('Plot: ' + JSON.parse(body).Plot);
            console.log('Actors: ' + JSON.parse(body).Actors);
            console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
            console.log('===============================================================')
        }

        fs.appendFile(logText, ", \n\n " + body, function(err) {
            if (err) {
                console.log(err)
            }
        });
    });
} else if (argOne === "movie-this" && !argTwo) {
    request('http://www.omdbapi.com/?apikey=40e9cece&t=mr+nobody&r=json', function(error, response, body) {
        if (!error && response.statusCode === 200) {

            console.log('Movie: ' + JSON.parse(body).Title);
            console.log('Year: ' + JSON.parse(body).Year);
            console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
            console.log('Metascore: ' + JSON.parse(body).Metascore)
            console.log('Country: ' + JSON.parse(body).Country);
            console.log('Language: ' + JSON.parse(body).Language);
            console.log('Plot: ' + JSON.parse(body).Plot);
            console.log('Actors: ' + JSON.parse(body).Actors);
            console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
        }

        fs.appendFile(logText, ", " + JSON.prettify(body), function(err) {
            if (err) {
                console.log(err)
            }
        })
    });


    //Do WHAT IT SAYS
} else if (argOne === "do-what-it-says") {

    fs.readFile('random.txt', 'utf8', function(err, data) {
            if (err) {
                console.log(err)
            }
            fs.appendFile(logText, ", " + data, function(err) {
                if (err) {
                    console.log(err)
                }
            })
            console.log(data)

        })
        //SPOTIFY
} else if (argOne === "spotify-this-song") {
    spotify.search({ type: 'track', query: input }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        // Console log something, api doesnt work, dont know what i would put here
        console.log(data)
    });
}
