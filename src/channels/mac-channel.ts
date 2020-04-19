import { MACActor } from "../actors/mac-actor";

export abstract class MACChannel {

    constructor() {
        this.registerModule = this.registerModule.bind(this);
        this.serialize = this.serialize.bind(this);
        this.deserialize = this.deserialize.bind(this);
        this.serializeFunction = this.serializeFunction.bind(this);
        this.deserializeFunction = this.deserializeFunction.bind(this);
    }

    abstract registerModule(channelName: string, onActorReceivedHandler: (actor: MACActor) => boolean)
   
    abstract teleport(channelName: string, actor: MACActor): boolean

    serialize(actor: MACActor): string {
        actor.instructions = actor.instructions.map(instruction => this.serializeFunction(instruction));
        return JSON.stringify(actor);
    }

    deserialize(serializedActor: string): MACActor {
        const actor:MACActor = JSON.parse(serializedActor);
        let instructions = actor.instructions.map(instruction => this.deserializeFunction(instruction));
        const completeActor = Object.assign(new MACActor(actor.id,instructions), actor);
        return completeActor;

    }

    private serializeFunction(fn) {
        return fn.toString();
    }

    private deserializeFunction(serial) {
        return new Function(`"use strict"; return ${serial};`)()
    }
}