import { MACModule } from "../modules/mac-module";

export class MACActor {
    id: string;
    instructions: ((module: MACModule) => Promise<string | boolean>)[];
    exception: Error;
    properties: Map<string, any>;

    constructor(id: string, instructions: ((module: MACModule) => Promise<string | boolean>)[], properties: Map<string, any> = new Map<string, any>(), error: Error = undefined) {
        this.id = id;
        this.instructions = instructions;
        this.exception = error;
        this.properties = properties;
        this.executeNextInstruction = this.executeNextInstruction.bind(this);
    }

    async executeNextInstruction(moduleInstance: MACModule): Promise<string | boolean> {
        let currentInstruction: (module: MACModule) => Promise<string | boolean> = this.instructions.shift();
        currentInstruction = currentInstruction.bind(this);
        return await currentInstruction(moduleInstance);
    }
};