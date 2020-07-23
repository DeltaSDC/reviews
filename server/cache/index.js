const redis = require('redis');
const config = require('../../config.js');

const portRedis = config.cache.port;

// create and connect redis
const cache = redis.createClient(portRedis);
cache.on('error', (err) => {
  console.log('redis error', err);
});

const addToCache = (key, value) => {
  cache.set(key, JSON.stringify(value));
};

const getFromCache = (key, callback) => {
  cache.get(key, (err, data) => {
    if (err) {
      console.log('error getting from cache');
      callback(err);
    }
    if (data !== null) {
      console.log('got info from cache');
      callback(null, data);
    } else {
      console.log('no info in cache');
      callback(null, data);
    }
  });
};

module.exports = {
  addToCache,
  getFromCache,
};
