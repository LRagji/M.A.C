const macActor = require("../actors/mac-actor");

module.exports = class MACChannelManager {


    constructor() {
        this.registerModule = this.registerModule.bind(this);
        this._serialize = this._serialize.bind(this);
        this._deserialize = this._deserialize.bind(this);
        this._serializeFunction = this._serializeFunction.bind(this);
        this._deserializeFunction = this._deserializeFunction.bind(this);

        this._map = new Map();//This is just a simulation of real channel
    }

    registerModule(channelName, onActorReceived) {
        //Make a consumer group with the channel name.
        const handler = (serializedActor) => {
            const actor = this._deserialize(serializedActor);
            onActorReceived(actor);
        }
        this._map.set(channelName, handler);
    }

    teleport(channelName, actor) {
        const serializedActor = this._serialize(actor);
        console.log(`Teleporting Actor:${actor.id} to ${channelName}.`)
        //Publish it on that channel.
        this._map.get(channelName)(serializedActor);
    }

    _serialize(actor) {
        actor._instructions = actor._instructions.map(instruction => this._serializeFunction(instruction));
        //actor.executeNextInstruction = this._serializeFunction(actor.executeNextInstruction);
        return JSON.stringify(actor);
    }

    _deserialize(serializedActor) {
        const actor = JSON.parse(serializedActor);
        //actor.executeNextInstruction = this._deserializeFunction(actor.executeNextInstruction);
        actor._instructions = actor._instructions.map(instruction => this._deserializeFunction(instruction));
        const completeActor = Object.assign(new macActor(actor.id), actor);
        return completeActor;

    }

    _serializeFunction(fn) {
        return fn.toString();
    }

    _deserializeFunction(serial) {
        return new Function(`"use strict"; return ${serial};`)()
    }
}