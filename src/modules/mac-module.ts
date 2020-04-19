import { MACChannel } from "../channels/mac-channel";
import { MACActor } from "../actors/mac-actor";

export abstract class MACModule {
    #channel: MACChannel;
    #templateResolver: (templateId: number) => (((module: MACModule) => string) | ((module: MACModule) => boolean))[];
    #errorChannelName: string;
    #recycleChannelName: string;

    abstract name(): string;

    constructor(channel: MACChannel, errorChannelName: string = "Error", recycleChannelName = "Recycle", templateResolver: (templateId: number) => (((module: MACModule) => string) | ((module: MACModule) => boolean))[] = (templateId) => [(module) => false]) {
        this.handleActorReceived = this.handleActorReceived.bind(this);
        this.name = this.name.bind(this);
        this.fetchActor = this.fetchActor.bind(this);

        this.#channel = channel;
        this.#channel.registerModule(this.name(), this.handleActorReceived);
        this.#templateResolver = templateResolver;
        this.#errorChannelName = errorChannelName;
        this.#recycleChannelName = recycleChannelName;
    }

    handleActorReceived(actor: MACActor) {
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

    fetchActor(templateId: number, actorId: string, properties: Map<string, any>): MACActor {
        return new MACActor(actorId, this.#templateResolver(templateId), properties);
    }

}