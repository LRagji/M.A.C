const baseModuleType = require('./mac-module');

module.exports = class ActorFactory extends baseModuleType {

    static ModuleName() {
        return "ActorFactory";
    }

    constructor(channelManager) {
        super(ActorFactory.ModuleName(), channelManager);

        this.getInstructionFor = this.getInstructionFor.bind(this);
    }

    getInstructionFor(templateId) {
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
    }
}