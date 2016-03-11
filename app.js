'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var Promise = require("bluebird");
var app = express();

var config = require('./src/configuration/config.js');

var port = config.web.port;

app.disable('x-powered-by'); //remove power by header

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

//loging
var logDirectory = config.logs.directory;
var logger = require('./src/configuration/logger.js')(logDirectory);
logger.debug('Log Directory: ' + logDirectory);
require('./src/configuration/reuqest-logger.js')(app, logDirectory);

//connect to db
var dbUrl = config.db.url;
logger.debug('DB URL:' + dbUrl);
require('./src/configuration/db.js')(logger, dbUrl);

//redis
if (config.redis.enableRedis) {
  var redisHost = config.redis.host;
  var redisPort = config.redis.port;
  var redisOptions = config.redis.options; //see https://github.com/NodeRedis/node_redis for available options
  redisOptions.max_attempts = 2;
  var redisClient = Promise.promisifyAll(require('./src/configuration/redis.js')(redisHost, redisPort, redisOptions, logger));
}

//log responses on error
var responseLog = require('./src/helpers/log-helper.js')(logger);
app.use(responseLog.logResponseBody);

//Routes
var router = express.Router();
app.use('/api', router);

var vehicleRouter = require('./src/routes/vehicleRoutes')(express, redisClient, logger);
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

//The 404 Route (ALWAYS Keep this as the last route)
app.use('*', function(req, res) {
  res.status(404).send('Page not found!');
});

//Error handling
// production error handler
// no stacktraces leaked to user
app.use(function(req, res) {
  res.status(500).json({
    info: 'Something failed!'
  });
});



app.listen(port, function() {
  console.log('Running server on port: ' + port);
});