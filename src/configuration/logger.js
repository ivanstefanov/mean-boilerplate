'use strict';

var winston = require('winston');
winston.emitErrs = true;

// logger.error('error');
// logger.warn('warn');
// logger.info('info');
// logger.verbose('verbose');
// logger.debug('debug');
// logger.silly('silly');
var init = function(logDirectory) {
    var logger = new winston.Logger({
        transports: [
        new winston.transports.File({
                level: 'info',
                filename: logDirectory + 'logs.log',
                handleExceptions: true,
                json: false,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            }),
        new winston.transports.Console({
                level: 'debug',
                handleExceptions: true,
                json: false,
                colorize: true
            })
    ],
        exitOnError: false
    });

    return logger;
};

module.exports = init;