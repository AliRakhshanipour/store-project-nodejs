const redisDb = require("redis");
const redisClient = redisDb.createClient();
redisClient.connect();
redisClient.on("connect", () => {
  console.log("connected to redis");
});
redisClient.on("ready", () => {
  console.log("redis ready to user...");
});
redisClient.on("error", (error) => {
  console.log(error.message);
});
redisClient.on("end", () => {
  console.log("disconnected from rdis");
});

module.exports = {
  redisClient,
};
