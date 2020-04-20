import { MACModule } from "../modules/mac-module";

export class MACActor {
    id: string;
    instructions: (((module: MACModule) => string) | ((module: MACModule) => boolean))[];
    exception: Error;
    properties: Map<string, any>;

    constructor(id: string, instructions: (((module: MACModule) => string) | ((module: MACModule) => boolean))[], properties: Map<string, any> = new Map<string, any>(), error: Error = undefined) {
        this.id = id;
        this.instructions = instructions;
        this.exception = error;
        this.properties = properties;
        this.executeNextInstruction = this.executeNextInstruction.bind(this);
    }

    executeNextInstruction(moduleInstance: MACModule): string | boolean {
        let currentInstruction = this.instructions.shift();
        currentInstruction = currentInstruction.bind(this);
        return currentInstruction(moduleInstance);
    }
};