import { MACModule } from "./mac-module";
import { MACActor } from "../actors/mac-actor";

export class ConsoleErrorModule extends MACModule {
    name(): string {
        return "Error";
    }

    async templateResolver(templateId: number): Promise<((module: MACModule) => Promise<string | boolean>)[]> {
        throw new Error("Method not implemented.");
    }

    constructor(channelManager) {
        super(channelManager);
    }

    async handleActorReceived(actor: MACActor): Promise<boolean> {
        console.error(actor.exception)
        return true;
    }

};