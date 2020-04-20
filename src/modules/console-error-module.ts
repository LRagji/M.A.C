import { MACModule } from "./mac-module";
import { MACActor } from "../actors/mac-actor";

export class ConsoleErrorModule extends MACModule {
    name(): string {
        return "Error";
    }

    templateResolver(templateId: number): (((module: MACModule) => string) | ((module: MACModule) => boolean))[] {
        throw new Error("Method not implemented.");
    }

    constructor(channelManager) {
        super(channelManager);
    }

    handleActorReceived(actor: MACActor): boolean {
        console.error(actor.exception)
        return true;
    }

};