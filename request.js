var fs = require('fs');
var r = require('request');

var fpm_lat = 2.9352298769971,
    fpm_lng = 101.68939948081972;

var base_url = "https://api.fastpokemap.se/";
var fpm_path = "/?key=allow-all&ts=0&lat=" + fpm_lat + "&lng=" + fpm_lng

var fpm_options = {
  url: 'https://api.fastpokemap.se' + fpm_path,
  headers: {
    accept: 'application/json, text/javascript, */*; q=0.01',
    origin: 'https://fastpokemap.se/beta'
  }
}

function fpm_getPokemon(lat, lng) {
  r.get(fpm_options, function (err, res, body) {
    if (!err & res.statusCode == 200) {

      var data = JSON.parse(body);
      if (data.error == "overload") {
        return setTimeout(function() {
          fpm_getPokemon(lat, lng);
        }, 500);
      }
      else {
        // fs.write
        console.log(data);
      }

    }
  })
}


fpm_getPokemon(1,2);
