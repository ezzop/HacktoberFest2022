var https = require('follow-redirects').https;
//to maintain maximum 5 concurrent requests
require('events').EventEmitter.prototype._maxListeners = 5;
var scrapeData = require('./crawldata')
const url = "https://stackoverflow.com/questions";

//call the crawler function according to the number of requests
var request = https.get(url, function(response) {
    scrapeData(url);
});