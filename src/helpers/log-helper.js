'use strict';

var logHelper = function(logger) {

  /**
   * Logs the body response
   * @param  {object}   req  Express http request object
   * @param  {object}   res  Express http response object
   * @param  {Function} next The next function to pass the control to the next matching route
   */
  function logResponseBody(req, res, next) {
    var oldWrite = res.write,
      oldEnd = res.end;

    var chunks = [];

    res.write = function(chunk) {
      chunks.push(chunk);
      oldWrite.apply(res, arguments);
    };

    res.end = function(chunk) {
      if (chunk) {
        chunks.push(chunk);
      }

      var body = Buffer.concat(chunks).toString('utf8');
      logger.info(res.statusCode, req.originalUrl, body);

      oldEnd.apply(res, arguments);
    };

    next();
  }

  return {
    logResponseBody: logResponseBody
  };
};

module.exports = logHelper;