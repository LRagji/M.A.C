module.exports = function instructionSelector(commandName) {
    switch (commandName) {
        case "add":
            return cloneInstructions([
                async function i1(module) {
                    return "Keyvalue";
                },
                async function i2(module) {
                    const result = this.properties.get("LHSOperand") + this.properties.get("RHSOperand");
                    const saved = await module.add(this.id, result.toString());
                    if (saved === false) {
                        throw new Error("Saving result failed for actor id" + this.id);
                    }
                    return false;
                },
            ]);
            break;
        case "subtract":
            return cloneInstructions([
                async function i1(module) {
                    return "Keyvalue";
                },
                async function i2(module) {
                    const result = this.properties.get("LHSOperand") - this.properties.get("RHSOperand");
                    const saved = await module.add(this.id, result.toString());
                    if (saved === false) {
                        throw new Error("Saving result failed for actor id" + this.id);
                    }
                    return false;
                },
            ]);
            break;
        case "multiply":
            return cloneInstructions([
                async function i1(module) {
                    return "Keyvalue";
                },
                async function i2(module) {
                    const result = this.properties.get("LHSOperand") * this.properties.get("RHSOperand");
                    const saved = await module.add(this.id, result.toString());
                    if (saved === false) {
                        throw new Error("Saving result failed for actor id" + this.id);
                    }
                    return false;
                },
            ]);
            break;
        case "divide":
            return cloneInstructions([
                async function i1(module) {
                    return "Keyvalue";
                },
                async function i2(module) {
                    const result = this.properties.get("LHSOperand") / this.properties.get("RHSOperand");
                    const saved = await module.add(this.id, result.toString());
                    if (saved === false) {
                        throw new Error("Saving result failed for actor id" + this.id);
                    }
                    return false;
                },
            ]);
            break;
        case "mod":
            return cloneInstructions([
                async function i1(module) {
                    return "Keyvalue";
                },
                async function i2(module) {
                    const result = this.properties.get("LHSOperand") % this.properties.get("RHSOperand");
                    const saved = await module.add(this.id, result.toString());
                    if (saved === false) {
                        throw new Error("Saving result failed for actor id" + this.id);
                    }
                    return false;
                },
            ]);
            break;
        default:
            throw new Error(`No instruction for command ${commandName} were found.`)
    }
};

function cloneInstructions(instructions, argToBind = this) {
    //return instructions.map(fn => fn.bind(argToBind));
    return instructions;
}