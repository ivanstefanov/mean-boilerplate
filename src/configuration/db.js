'use strict';

var mongoose = require('mongoose');

var init = function(logger, dbUrl) {
  logger.debug('connecting to database');
  mongoose.connect(dbUrl);

  var db = mongoose.connection;
  db.on('error', function() {
    logger.error('error connecting to ' + dbUrl);
  });
  db.once('open', function() {
    logger.debug('connected successfully to ' + dbUrl + '...');
  });
};

module.exports = init;