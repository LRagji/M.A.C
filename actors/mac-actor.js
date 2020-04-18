module.exports = class MACActor {

    constructor(id) {
        this.id = id;
        this.templateId = 0;
        this._instructions = [
            function i1(module) { return "ActorFactory"; },
            function i2(module) {
                this._instructions = module.getInstructionFor(this.templateId);
                this._instructionPointer = 0;
                return true;
            }
        ];
        this._instructionPointer = 0;
        this.executeNextInstruction = this.executeNextInstruction.bind(this);
    }

    executeNextInstruction(moduleInstance) {
        let currentInstruction = this._instructions.shift();
        currentInstruction = currentInstruction.bind(this);
        return currentInstruction(moduleInstance);
    }
}