const moduleType = require("../../dist/index").MACModule

module.exports = class AddModule extends moduleType {

    constructor(channelManager) {
        super(channelManager);
        
        this.name = this.name.bind(this);
        this.add = this.add.bind(this);
    }

    name() {
        return "Add";
    }

    add(LHSOperand, RHSOperand) {
        return LHSOperand + RHSOperand;
    }
}