var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 8000;

app.disable('x-powered-by') //remove power by header

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
//Express looks up the files relative to the static directory, so the name of the static directory is not part of the URL.
//Express looks up the files in the order in which you set the static directories with the express.static middleware function.
app.use(express.static('public'));
//if the requested file is not found into the location above, search for it into the next express.static folder
//app.use(express.static('src/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//connect to db
var mongoose = require('mongoose');
var dbUrl = 'mongodb://root:123@ds055535.mongolab.com:55535/myvehicle';
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to ' + dbUrl));
db.once('open', function() {
  console.log('connected successfully to ' + dbUrl + '...');
});

//Routes
var router = express.Router();
app.use('/api', router);

var vehicleRouter = require('./src/routes/vehicleRoutes')(express);
app.use('/vehicle', vehicleRouter);

// var router = express.Router();
// app.use('/api', router);

router.get('/', function(req, res) {
  res.json({
    message: "Express routing is working!"
  });
});

// // Handle 404
// app.use(function(req, res) {
//   res.status(400);
//   res.render('404.jade', {
//     title: '404: File Not Found'
//   });
// });

// // Handle 500
// app.use(function(error, req, res, next) {
//   res.status(500);
//   res.render('500.jade', {
//     title: '500: Internal Server Error',
//     error: error
//   });
// });

//Error handling
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(500).send({
    error: 'Something failed!'
  });
});

app.listen(port, function(err) {
  console.log('Running server on port: ' + port);
});