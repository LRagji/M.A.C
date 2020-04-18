module.exports = class MACModule {
    constructor(name, channelManager) {
        this.handleActorReceived = this.handleActorReceived.bind(this);
        this._channelManager = channelManager;
        this._channelManager.registerModule(name, this.handleActorReceived);
    }

    handleActorReceived(actor) {

        let keepGoing = false;
        do {
            keepGoing = actor.executeNextInstruction(this);//This line here is the inception!!, cant think of anything better
        }
        while (keepGoing === true)

        if (keepGoing !== false) {
            this._channelManager.teleport(keepGoing, actor);
        }
    }

}