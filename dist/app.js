"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection = __importStar(require("./functions/connection"));
const subscriptions_1 = require("./functions/subscriptions");
const commands_1 = require("./config/commands");
global.WebSocket = require("isomorphic-ws");
const run = async () => {
    //const commands:string[] = ["example"]; //registers /example as a command
    //const userState:string = ""; //'invis' or 'npc'
    const games = await connection.connectToSpaces(Object.keys(commands_1.commandList) ?? undefined);
    for (let id in games) {
        (0, subscriptions_1.subscribeToEvents)(games[id]);
    }
};
run();
