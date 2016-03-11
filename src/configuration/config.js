var config;

if (process.env.NODE_ENV === 'development') {
  config = require('../../config.production.js');
} else {
  config = require('../../config.development.js');
}

module.exports = config;