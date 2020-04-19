const baseModuleType = require('./mac-module');

module.exports = class ActorFactory extends baseModuleType {

    static ModuleName() {
        return "ActorFactory";
    }

    constructor(channelManager, templateResolver) {
        super(ActorFactory.ModuleName(), channelManager);

        this.getInstructionFor = templateResolver;
    }
}