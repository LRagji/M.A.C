const moduleType = require("../../dist/index").MACModule
const rawActor = require("../actors/mac-actor");
const express = require("express")
const shortid = require('shortid');

module.exports = class RestModule extends moduleType {

    constructor(channelManager, listeningPort) {
        this.name = this.name.bind(this);
        this.templateSelector = this.templateSelector.bind(this);

        super(channelManager, undefined, undefined, templateSelector);

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

    name() {
        return "Rest";
    }

    templateSelector(templateId) {
        return [
            function i1(module) { return "Add"; },
            function i2(module) {
                this.properties.set("Result", module.add(this.properties.get("LHSOperand"), this.properties.get("RHSOperand")));
                return true;
            },
            function i3(module) { return "Rest"; },
            function i4(module) {
                module.results.set(this.id, this.properties.get("Result"));
                return false;
            }
        ]
    }
}
