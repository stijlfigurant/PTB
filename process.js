var fs = require('fs');
var request = require('request');

/*fs.readFile('perlin.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var b64 = new Buffer(data).toString('base64');
  
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
});*/

fs.readFile('perlin-variables.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var renders = 100;

  for (var i = 0; i < renders; i++) {    

    var variables = {
      numAgents: Math.floor((Math.random() * 2000) + 500),
      iterations: Math.floor((Math.random() * 700) + 50),
      noiseScale: Math.floor((Math.random() * 400) + 20),
      noiseStrength: Math.floor((Math.random() * 10) + 1),
      stepSize: Math.floor((Math.random() * 12) + 8),
      noiseSeed: Math.floor(Math.random() * 1000),
      alpha: 0.1 + (Math.random() * 0.3)
    }

    var filename = 'perlin.' + variables.numAgents + '.' 
    + variables.iterations + '.'  
    + variables.noiseScale + '.'  
    + variables.noiseStrength + '.'  
    + variables.stepSize + '.'
    + variables.noiseSeed + '.'
    + variables.alpha

    var json = variables
    json.base64 = new Buffer(data).toString('base64') 

    generateRender(json, filename, i)
  }
    
});

function generateRender(json, filename, index) {
  console.log('render ' + index + ' started')

  request.post('https://ph0c04837l.execute-api.eu-central-1.amazonaws.com/demo',
      { json: json },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log('render ' + index + ' finished')

              var base64Data = body.replace(/^data:image\/png;base64,/, '');

              require('fs').writeFile('renders/' + filename + '.png', base64Data, 'base64', function(err) {
                //console.log(err);
              });
          } else {
            console.log('render ' + index + ' errored out')
          }
      }
  );
}
