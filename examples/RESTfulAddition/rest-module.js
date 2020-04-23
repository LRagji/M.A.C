const moduleType = require("../../dist/index").MACModule
const express = require("express")
const shortid = require('shortid');

module.exports = class RestModule extends moduleType {

    constructor(channelManager, listeningPort) {
        super(channelManager);

        this.name = this.name.bind(this);
        this.templateResolver = this.templateResolver.bind(this);

        this.results = new Map();
        this._app = express();
        this._app.use(express.json()) // for parsing application/json
        this._app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

        this._app.get("/results/:id", (req, res) => {
            let response = { "result": this.results.get(req.params.id) }
            res.send(response);
        });

        this._app.post('/add', async (req, res) => {
            let properties = new Map();
            properties.set("LHSOperand", req.body.LHSOperand);
            properties.set("RHSOperand", req.body.RHSOperand);
            const id = shortid.generate();
            const result = await this.processNewActor(0, id, properties);
            if (result === true) {
                res.location("http://localhost:3000/results/" + id);
                res.sendStatus(201);
            }
            else {
                res.sendStatus(500);
            }
        });

        this._app.listen(listeningPort, () => console.log(`Rest module listening at http://localhost:${listeningPort}`))
    }

    name() {
        return "Rest";
    }

    async templateResolver(templateId) {
        return [
            async function i1(module) { return "Add"; },
            async function i2(module) {
                const result = await module.add(this.properties.get("LHSOperand"), this.properties.get("RHSOperand"));
                this.properties.set("Result", result);
                return true;
            },
            async function i3(module) { return "Rest"; },
            async function i4(module) {
                module.results.set(this.id, this.properties.get("Result"));
                return false;
            }
        ]
    }
}
