const config = require("config");
const redis = require("redis");

const redisClient = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  db: 1,
});
redisClient.onReady = new Promise((resolve) => {
  redisClient.on("ready", () => {
    redisClient.info((err, msg) => {
      if (err) {
        console.log("[REDIS] : ERROR info");
        console.log(err);
        // ...
      }

      redisClient._isReady = true;

      const info = require("redis-info").parse(msg);
      redisClient.info = info;
      redisClient.info.redis_version_arr = redisClient.info.redis_version
        .split(".")
        .map((x) => {
          return parseInt(x);
        });

      console.log(
        "[REDIS] : connected to Redis. Version " +
          redisClient.info.redis_version_arr[0] +
          "." +
          redisClient.info.redis_version_arr[1] +
          "." +
          redisClient.info.redis_version_arr[2] +
          " | " +
          "host: " +
          config.redis.host +
          ":" +
          config.redis.port
      );

      resolve(redisClient);
    });
  });
});

module.exports = {
  redis,
  redisClient,

  getRedisClientData(s_token) {
    console.log("stoken => ", s_token);
    return new Promise((resolve) => {
      const key = this.makeSTokenKey(s_token);
      redisClient.get(key, (err, clientData) => {
        redisClient.get(key, (err, clientData) => {
          clientData = JSON.parse(clientData || "{}");
          resolve(clientData);
        });
      });
    });
  },

  setRedisClientData(s_token, clientData) {
    return new Promise((resolve) => {
      const key = this.makeSTokenKey(s_token);
      const oneDay = 60 * 60 * 24;
      redisClient.setex(
        key,
        oneDay,
        JSON.stringify(clientData),
        function (err) {
          resolve(err);
        }
      );
    });
  },

  makeSTokenKey(s_token) {
    return config.redis.prefix + "ws:" + s_token;
  },
};
