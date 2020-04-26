const redisChannelType = require("mac-redis-channel").RedisChannel;
const keyValueModuleType = require("mac-keyvalue-module").KeyValueModule;
const restModuleType = require("mac-rest-module").RestModule;
const instructionSelector = require("./instructions");
const shortid = require("shortid");
const consoleErrorModuleType = require("mac-design-pattern").ConsoleErrorModule;
const consoleCompletedModuleType = require("mac-design-pattern").ConsoleCompletedModule;
const macActorType = require("mac-design-pattern").MACActor;
const express = require("express");

const defaultRedisConnectionString = "redis://127.0.0.1:6379/";
const channel = new redisChannelType(defaultRedisConnectionString, 1000);
const errorModule = new consoleErrorModuleType(channel);
const completedModule = new consoleCompletedModuleType(channel);
const kvpModule = new keyValueModuleType(channel, defaultRedisConnectionString);
const restController = new restModuleType(channel);
const routes = express.Router();

routes.post("/math/add", async (req, res) => await mathOperationRoute(req, res, "add"));
routes.post("/math/subtract", async (req, res) => await mathOperationRoute(req, res, "subtract"));
routes.post("/math/multiply", async (req, res) => await mathOperationRoute(req, res, "multiply"));
routes.post("/math/divide", async (req, res) => await mathOperationRoute(req, res, "divide"));
routes.post("/math/mod", async (req, res) => await mathOperationRoute(req, res, "mod"));
routes.get("/math/results/:id", mathResultsRoute);

async function mathOperationRoute(req, res, operation) {
    let actorProperties = new Map();
    actorProperties.set("LHSOperand", req.body.LHSOperand);
    actorProperties.set("RHSOperand", req.body.RHSOperand);
    const actorId = shortid.generate();
    const actorInstructions = instructionSelector(operation);
    let result = await restController.processNewActor(new macActorType(actorId, actorInstructions, actorProperties));
    if (result === true) {
        res.location("http://localhost:3000/math/results/" + actorId);
        res.sendStatus(201);
    }
    else {
        res.sendStatus(500);
    }
}

async function mathResultsRoute(req, res) {
    const requestId = req.params.id;
    let response = { "result": parseFloat(await kvpModule.get(requestId)) };
    res.send(response);
}

restController.listen(routes, 3000);
