import { MACChannel } from "../channels/mac-channel";
import { MACActor } from "../actors/mac-actor";

export abstract class MACModule {
    #channel: MACChannel;
    #errorChannelName: string;
    #recycleChannelName: string;

    abstract name(): string;

    constructor(channel: MACChannel, errorChannelName: string = "Error", completedChannelName = "Completed") {
        this.handleActorReceived = this.handleActorReceived.bind(this);
        this.name = this.name.bind(this);
        this.processNewActor = this.processNewActor.bind(this);

        this.#channel = channel;
        this.#channel.registerModule(this.name(), this.handleActorReceived);
        this.#errorChannelName = errorChannelName;
        this.#recycleChannelName = completedChannelName;
    }

    async handleActorReceived(actor: MACActor): Promise<boolean> {
        let keepGoing: string | boolean = false;
        try {
            do {
                keepGoing = await actor.executeNextInstruction(this);//This line here is the movie inception!!, cant think of anything better
            }
            while (keepGoing === true)

            if (keepGoing !== false) {
                await this.#channel.teleport(keepGoing, actor);
            }

            if (keepGoing === false) {
                await this.#channel.teleport(this.#recycleChannelName, actor);
            }
        }
        catch (err) {
            actor.exception = err;
            await this.#channel.teleport(this.#errorChannelName, actor);
        }

        return true;
    }

    async processNewActor(actor: MACActor): Promise<boolean> {
        return await this.handleActorReceived(actor);
    }

}