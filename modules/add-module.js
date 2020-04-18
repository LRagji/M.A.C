const baseModuleType = require('./mac-module');

module.exports = class AddModule extends baseModuleType {

    static ModuleName() {
        return "Add";
    }

    constructor(channelManager) {
        super(AddModule.ModuleName(), channelManager);
        this.add = this.add.bind(this);
    }

    add(LHSOperand, RHSOperand) {
        return LHSOperand + RHSOperand;
    }

}