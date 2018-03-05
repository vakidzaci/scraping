var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var obj = JSON.parse(fs.readFileSync('movies.json', 'utf8'));


var movie = obj[0];
var url = "https://en.wikipedia.org" + movie.href;


async.mapSeries(url,scrapPlot, function(err, results) {
  if(err)
    throw err;

});

function scrapPlot(callback){
  setTimeout(function() {
    request(url, function(err, res, body) {
      if(err)
        throw err;
      if (res.statusCode != 200)
        throw new Error('wikipedia returned an error response: ' + res.statusCode);
      var $ = cheerio.load(body);
      var tables = $('#Plot').parent().nextUntil('h2');
      tables.each(function(){
        console.log($(this).text())
      })
      // console.log(tables.html());
    },0);
});
}
