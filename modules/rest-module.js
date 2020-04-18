const baseModuleType = require("./mac-module");
const rawActor = require("../actors/mac-actor");
const express = require("express")
const shortid = require('shortid');

module.exports = class RestModule extends baseModuleType {

    static ModuleName() {
        return "Rest";
    }

    constructor(channelManager, listeningPort) {
        super(RestModule.ModuleName(), channelManager);
        this.results = new Map();
        this._app = express();
        this._app.use(express.json()) // for parsing application/json
        this._app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

        this._app.get("/results/:id", (req, res) => {
            let response = { "result": this.results.get(req.params.id) }
            res.send(response);
        });

        this._app.post('/add', (req, res) => {
            let tempActor = new rawActor(shortid.generate());
            tempActor.templateId = 1;
            tempActor.LHSOperand = req.body.LHSOperand;
            tempActor.RHSOperand = req.body.RHSOperand;
            this.handleActorReceived(tempActor);
            res.location("http://localhost:3000/results/" + tempActor.id);
            res.sendStatus(201);
        });

        this._app.listen(listeningPort, () => console.log(`Rest module listening at http://localhost:${listeningPort}`))
    }

}
