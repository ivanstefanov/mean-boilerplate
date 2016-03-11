'use strict';

var config = require('../configuration/config.js');

var dbHelper = function(redisClient) {

  /**
   * Checks if saving to redis is enabled and performs save if it is
   * @param  String redisKey the key behind the stored value
   * @param  String redisValue the value to store in redis
   * @param  boolean isEnabled is the saving allowed
   */
  function saveToRedis(redisKey, redisValue, isEnabled) {
    if (typeof isEnabled === "undefined") {
      isEnabled = config.redis.enableRedisInsert;
    }

    if (isEnabled) {
      redisClient.setAsync(redisKey, redisValue);
    }
  }

  /**
   * Get a value from a redis store
   * @param  string redisKey The key for getting the value from
   * @return string the redis value
   */
  function getFromRedis(redisKey) {
    redisClient.getAsync(redisKey).then(function(reply) {
      return reply;
    });
  }

  return {
    saveToRedis: saveToRedis,
    getFromRedis: getFromRedis
  };
};

module.exports = dbHelper;