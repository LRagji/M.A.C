const simpleChannelType = require("./simple-channel");
const restModuleType = require("./rest-module");
const addModuleType = require("./add-module");
const errorModuleType = require("../../dist/index").ConsoleErrorModule;
const completedModuleType = require("../../dist/index").ConsoleCompletedModule;
const simpleChannelInstance = new simpleChannelType();
const errorModuleInstance = new errorModuleType(simpleChannelInstance);
const completedModuleInstance = new completedModuleType(simpleChannelInstance);
const addModuleInstance = new addModuleType(simpleChannelInstance);
const restModuleInstance = new restModuleType(simpleChannelInstance, 3000);

console.log("Process Host Active");