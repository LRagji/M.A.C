const channelManagerType = require("./channels/mac-channel-manager");
const addModuleType = require("./modules/add-module");
const actorFactoryModuleType = require("./modules/actor-factory-module");
const restModuleType = require("./modules/rest-module");
const channelInstance = new channelManagerType();
const addModuleInstance = new addModuleType(channelInstance);
const actoryFactoryModuleInstance = new actorFactoryModuleType(channelInstance);
const restModuleInstance = new restModuleType(channelInstance, 3000);

// const doubleOperandActorType = require("./actors/double-operand-actor");

// const addModuleHost = new hostModuleType(addModuleType.ModuleName(), channelInstance, new addModuleType());
// const doubleOperator = new doubleOperandActorType(1);
// doubleOperator.LHSOperand = 5;
// doubleOperator.RHSOperand = 5;

//channelInstance.teleport()


