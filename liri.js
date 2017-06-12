var fs = require('fs')
var argOne = process.argv[2]
var argTwo = process.argv[3]
var request = require('request')





//TWITTER
var Twitter = require('twitter')
var keys = require('./keys.js')

//Get tweets function
function getTweets() {
    var client = new Twitter ({
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
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error) {
	        for (i=0; i<tweets.length; i++) {
	            var returnedData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n'+ '@' +tweets[i].user.name+ ': ' + tweets[i].text + '\n');
	            console.log(returnedData);
	            console.log("-------------------------");
	            
	        }
	    };
	});
}; //Twitter Function End
getTweets();