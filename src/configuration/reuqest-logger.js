'use strict';

var morgan = require('morgan');
var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');

var init = function(app, logDirectory) {

  // ensure log directory exists
  fs.access(logDirectory, fs.F_OK, function(err) {
    if (err) {
      fs.mkdirSync(logDirectory);
    }
  });

  // create a rotating write stream
  var accessLogStream = FileStreamRotator.getStream({
    filename: logDirectory + '/%DATE%-requests.log',
    frequency: 'daily',
    verbose: false,
    date_format: "YYYYMMDD"
  });

  // setup the logger
  //remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
  app.use(morgan('combined', {
    stream: accessLogStream
  }));
};

module.exports = init;