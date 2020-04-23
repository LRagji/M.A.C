const defaultRedisConnectionString = "redis://127.0.0.1:6379/";
const simpleChannelType = require("./simple-channel");
const redisChannelType = require("../redis-stream-channel/redis-channel");
const restModuleType = require("./rest-module");
const addModuleType = require("./add-module");
const errorModuleType = require("../../dist/index").ConsoleErrorModule;
const completedModuleType = require("../../dist/index").ConsoleCompletedModule;
const simpleChannelInstance = new simpleChannelType();
const redisChannelInstance = new redisChannelType(defaultRedisConnectionString);
const errorModuleInstance = new errorModuleType(redisChannelInstance);
const completedModuleInstance = new completedModuleType(redisChannelInstance);
const addModuleInstance = new addModuleType(redisChannelInstance);
const restModuleInstance = new restModuleType(redisChannelInstance, 3000);

console.log("Process Host Active");