const TwitterPackage = require("twitter");
require("dotenv").config();

console.log("the bot is starting");
const secret = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

const babbleFromTwitter = [];
const Twitter = new TwitterPackage(secret);

const params = { screen_name: "InsidersFinance", count: 3 };
Twitter.get("statuses/user_timeline", params, function(
  error,
  tweets,
  response
) {
  if (!error) {
    tweets.forEach(twit => {
      const regex = /\:(.*)/;
      const match = regex.exec(twit.text);
      let newTwit = match[1];
      console.log(match[1]);
      babbleFromTwitter.push(twit);
    });
    // console.log(tweets[0].text);
  }
});

console.log(babbleFromTwitter);

module.exports = babbleFromTwitter;
