import { MACActor } from "../actors/mac-actor";
import { MACModule } from "../modules/mac-module";

export abstract class MACChannel {

    constructor() {
        this.registerModule = this.registerModule.bind(this);
        this.serialize = this.serialize.bind(this);
        this.deserialize = this.deserialize.bind(this);
        this.serializeInstructions = this.serializeInstructions.bind(this);
        this.deserializeInstructions = this.deserializeInstructions.bind(this);
        this.serializeProperties = this.serializeProperties.bind(this);
        this.deserializeProperties = this.deserializeProperties.bind(this);
    }

    abstract registerModule(channelName: string, onActorReceivedHandler: (actor: MACActor) => Promise<boolean>)

    abstract async teleport(channelName: string, actor: MACActor): Promise<boolean>

    private serialize(actor: MACActor): string {
        const proxyActor = new SerializedActor();
        proxyActor.instructions = actor.instructions.map(instruction => this.serializeInstructions(instruction));
        proxyActor.properties = this.serializeProperties(actor.properties);
        proxyActor.id = actor.id;
        proxyActor.exception = actor.exception !== undefined ? actor.exception.message : undefined;
        return JSON.stringify(proxyActor);
    }

    private deserialize(serializedActor: string): MACActor {
        const proxyActor: SerializedActor = JSON.parse(serializedActor);
        let instructions = proxyActor.instructions.map(instruction => this.deserializeInstructions(instruction));
        let properties = this.deserializeProperties(proxyActor.properties);
        let error: Error = proxyActor.exception !== undefined ? new Error(proxyActor.exception) : undefined;

        return new MACActor(proxyActor.id, instructions, properties, error);
    }

    private serializeInstructions(instruction:((module: MACModule) => Promise<string | boolean>)): string {
        return instruction.toString();
    }

    private deserializeInstructions(serializedFunction: string): ((module: MACModule) => Promise<string | boolean>) {
        return new Function(`"use strict"; return ${serializedFunction};`)()
    }

    private serializeProperties(props: Map<string, any>): string {
        return JSON.stringify([...props.entries()]);
    }

    private deserializeProperties(serializedProps: string): Map<string, any> {
        return JSON.parse(serializedProps).reduce((m, [key, val]) => m.set(key, val), new Map());
    }
}

class SerializedActor {
    id: string;
    instructions: string[];
    properties: string;
    exception: string;
}