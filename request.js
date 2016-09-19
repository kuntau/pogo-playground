var fs = require('fs');
var os = require('os');
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

      // proceed if no error
      console.log(data.result);
      return data.result;

    }
  })
}

function readCoord(file) {
  fs.readFile(file, function (err, data) {
    if (err) console.log(err);
    var fileCoords = JSON.parse(data);
    var pokeCoords = [];
    var tempCoord;

    fileCoords.forEach(function (loc) {
      setTimeout(function () {
        tempCoord = fpm_getPokemon(loc.lat, loc.lng);
        pokeCoords.push(tempCoord);
      },1000)

    })
    appendFile('results.json', JSON.stringify(pokeCoords, null, 2) + os.EOL);
  })
}

function appendFile(file, data) {
  fs.appendFile(file, data, function (err) {
    if (err) console.log("appendFile ", err)
    console.log("appendFile ", file, data);
  })
}

function writeFile(file, data) {
  fs.writeFile(file, data, function (err) {
    if (err) console.log("writeFile ", err)
    console.log("writeFile ", file, data);
  })
}

// fpm_getPokemon(1,2);
// readCoord('POGO_KL_POI.json');
readCoord('POI.json');
// writeFile('results.json', '')
// appendFile('results.json', 'LOREM IPSUM')
