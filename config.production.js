var config = {};

config.web = {};
config.web.port = process.env.PORT || 8000;

config.logs = {};
config.logs.directory = __dirname + '/src/logs/';

config.db = {};
config.db.url = 'mongodb://root:123@ds055535.mongolab.com:55535/myvehicle';

config.redis = {};
config.redis.enableRedis = true;
config.redis.enableRedisInsert = true;
config.redis.port = 6379;
config.redis.host = 'localhost';
config.redis.options = {};

module.exports = config;