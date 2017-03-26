exports.lambda_handler = function(event, context, callback) {
   console.log("value1 = " + event.key1);
   console.log("value2 = " + event.key2);  
   callback(null, "some success message");
   // or 
   // callback("some error type"); 
}

//var Canvas = require('canvas');

/*exports.lambda_handler = function(event, context) {

    var canvas = new Canvas();
    canvas.width = 100;
    canvas.height = 100;

    var g = canvas.getContext('2d');
    g.fillStyle = 'red';
    g.fillRect(0, 0, 50, 50);
    g.fillStyle = 'green';
    g.fillRect(50, 0, 50, 50);
    g.fillStyle = 'blue';
    g.fillRect(0, 50, 50, 50);
    g.fillStyle = 'yellow';
    g.fillRect(50, 50, 50, 50);

    var image = canvas.toDataURL();
    console.log(image);
    context.succeed('Done! '+image);
    return image;
};*/

/*exports.lambda_handler = function(event, context) {

    eval(new Buffer(event.base64, 'base64').toString('ascii'))

    var image = canvas.toDataURL();
    console.log(image);
    context.succeed(image);
    return image;
};*/