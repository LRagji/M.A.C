const channelManagerType = require("../../channels/mac-channel-manager");
const addModuleType = require("../../modules/add-module");
const actorFactoryModuleType = require("../../modules/actor-factory-module");
const restModuleType = require("../../modules/rest-module");
const channelInstance = new channelManagerType();
const addModuleInstance = new addModuleType(channelInstance);
const actoryFactoryModuleInstance = new actorFactoryModuleType(channelInstance, (templateId) => {
    return [
        function i1(module) { return "Add"; },
        function i2(module) {
            this.result = module.add(this.LHSOperand, this.RHSOperand);
            return true;
        },
        function i3(module) { return "Rest"; },
        function i4(module) {
            module.results.set(this.id, this.result);
            return false;
        }
    ]
});
const restModuleInstance = new restModuleType(channelInstance, 3000);


