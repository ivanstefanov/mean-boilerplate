'use strict';
var redis = require('redis');

var init = function(redisHost, redisPort, options, logger) {

  var client = redis.createClient(redisPort, redisHost, options);

  client.on('error', function(err) {
    logger.error('redis error occurred!', 'Error information:', err);
  });

  client.on('ready', function() {
    logger.debug('redis is ready');
  });

  client.on('connect', function() {
    logger.debug('redis is connected. ', 'Connection info:', {
      host: redisHost,
      port: redisPort,
      otherOptions: options
    });
  });

  client.on('reconnecting', function(ctx) {
    logger.debug('redis reconnecting # ' + ctx.attempt + ', delay: ' + ctx.delay);
  });

  client.on('end', function() {
    logger.debug('redis connection is closed');
  });

  client.on('drain', function() {
    logger.debug('redis connection is drained. The TCP connection to the Redis server has been buffering, but is now writable.');
  });

  client.on('idle', function() {
    logger.debug('redis is idled. There are no outstanding commands that are awaiting a response.');
  });

  return client;
};

module.exports = init;