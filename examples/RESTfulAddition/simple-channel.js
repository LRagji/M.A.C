const channelType = require("../../dist/index").MACChannel
module.exports = class SimpleChannel extends channelType {

    constructor() {
        super();

        this.registerModule = this.registerModule.bind(this);
        this.teleport = this.teleport.bind(this);

        this._channelMap = new Map();
    }

    registerModule(channelName, onActorReceivedHandler) {
        const handler = (serializedActor) => {
            const actor = this.deserialize(serializedActor);
            onActorReceivedHandler(actor);
        }
        this._channelMap.set(channelName, handler);
    }

    teleport(channelName, actor) {
        const serializedActor = this.serialize(actor);
        console.log(`Teleporting ${actor.id} to ${channelName}`)
        //Publish it on that channel.
        this._channelMap.get(channelName)(serializedActor);
    }

}