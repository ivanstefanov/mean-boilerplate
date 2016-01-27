var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
//Express looks up the files relative to the static directory, so the name of the static directory is not part of the URL.
//Express looks up the files in the order in which you set the static directories with the express.static middleware function.
app.use(express.static('public'));
//if the requested file is not found into the location above, search for it into the next express.static folder
//app.use(express.static('src/views'));


app.listen(port, function(err) {
  console.log('Running server on port: ' + port);
});