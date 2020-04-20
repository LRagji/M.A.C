import { MACModule } from "./mac-module";
import { MACActor } from "../actors/mac-actor";

export class ConsoleCompletedModule extends MACModule {
    name(): string {
        return "Completed";
    }

    templateResolver(templateId: number): (((module: MACModule) => string) | ((module: MACModule) => boolean))[] {
        throw new Error("Method not implemented.");
    }

    constructor(channelManager) {
        super(channelManager);
    }

    handleActorReceived(actor: MACActor): boolean {
        console.log("Completed:" + actor.id + ", " + actor);
        return true;
    }
};