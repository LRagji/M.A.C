import { MACChannel } from "../channels/mac-channel";
import { MACActor } from "../actors/mac-actor";

export abstract class MACModule {
    #channel: MACChannel;
    #errorChannelName: string;
    #recycleChannelName: string;

    abstract name(): string;
    abstract templateResolver(templateId: number): (((module: MACModule) => string) | ((module: MACModule) => boolean))[];

    constructor(channel: MACChannel, errorChannelName: string = "Error", completedChannelName = "Completed") {
        this.handleActorReceived = this.handleActorReceived.bind(this);
        this.name = this.name.bind(this);
        this.processNewActor = this.processNewActor.bind(this);

        this.#channel = channel;
        this.#channel.registerModule(this.name(), this.handleActorReceived);
        this.#errorChannelName = errorChannelName;
        this.#recycleChannelName = completedChannelName;
    }

    handleActorReceived(actor: MACActor):boolean {
        let keepGoing: string | boolean = false;
        try {
            do {
                keepGoing = actor.executeNextInstruction(this);//This line here is the inception!!, cant think of anything better
            }
            while (keepGoing === true)

            if (keepGoing !== false) {
                this.#channel.teleport(keepGoing, actor);
            }

            if (keepGoing === false) {
                this.#channel.teleport(this.#recycleChannelName, actor);
            }
        }
        catch (err) {
            actor.exception = err;
            this.#channel.teleport(this.#errorChannelName, actor);
        }

        return true;
    }

    processNewActor(templateId: number, actorId: string, properties: Map<string, any>): boolean {
        let newActor: MACActor = new MACActor(actorId, this.templateResolver(templateId), properties);
        return this.handleActorReceived(newActor);
    }

}