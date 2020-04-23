const channelType = require("../../dist/index").MACChannel;
const redisStreamBrokerType = require("redis-streams-broker");
const shortid = require('shortid');

module.exports = class RedisChannel extends channelType {

    constructor(redisConnectionString) {
        super();
        this._redisConnectionString = redisConnectionString;
        this.registerModule = this.registerModule.bind(this);
        this.teleport = this.teleport.bind(this);
        this._channels = new Map();
    }

    async registerModule(channelName, handler) {
        let channel = this._channels.get(channelName);
        if (channel == undefined) {
            channel = new redisStreamBrokerType(this._redisConnectionString, channelName);
            this._channels.set(channelName, channel);
        }
        const actorBuilderWrapper = async (serializedActors) => {
            for (let idx = 0; idx < serializedActors.length; idx++) {
                const message = serializedActors[idx];
                await handler(this.deserialize(message.payload.d));
                await message.markAsRead();
                console.log(message.id + " Acked.");
            };
        }
        const cg = await channel.joinConsumerGroup("Default");
        return await cg.subscribe(shortid.generate(), actorBuilderWrapper);
    }

    async teleport(channelName, actor) {
        if (this._channels.has(channelName)) {
            const payload = { "d": await this.serialize(actor) };
            await this._channels.get(channelName).publish(payload);
            return true;
        }
        return false;
    }

}
