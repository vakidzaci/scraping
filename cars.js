var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var obj = JSON.parse(fs.readFileSync('movies.json', 'utf8'));


var url = "https://kolesa.kz/new-cars/mercedes-benz/almaty/";


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
      var tables = $('div.row.list-item.a-elem').nextAll('div.row.list-item.a-elem');
      // var tables = $('a.list-link');
      tables.each(function(){
        console.log($(this)['0'].attribs['data-id']);

      })
      // tables.each(function(){
        // console.log($(this).text())
      // })
    },0);
});
}
