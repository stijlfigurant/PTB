var fs = require('fs');
var request = require('request');

fs.readFile('perlin.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var b64 = new Buffer(data).toString('base64');
  console.log(b64)

  request.post('https://ph0c04837l.execute-api.eu-central-1.amazonaws.com/demo',
      { json: { base64: b64 } },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              //console.log(body)

              var base64Data = body.replace(/^data:image\/png;base64,/, "");

              require("fs").writeFile("perlin.png", base64Data, 'base64', function(err) {
                console.log(err);
              });
          }
      }
  );
});

