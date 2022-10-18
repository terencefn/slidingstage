"use strict";
/**
 * The connections file handles all of the websocket connection to the spaces.
 * It is not recommended to alter this file, unless you have a specific reason.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToSpaces = exports.spaceRoles = void 0;
const gather_game_client_1 = require("@gathertown/gather-game-client");
const config_1 = require("../config/config");
require("dotenv").config();
const API_KEY = process.env.API_KEY;
exports.spaceRoles = {};
const connectToSpaces = (commands) => {
    return new Promise(async (resolve, reject) => {
        let games = {};
        try {
            for (let url of config_1.SPACE_URLS) {
                const parser = url.split("?")[0].split("/");
                const cleanName = decodeURI(parser[5]);
                const game = new gather_game_client_1.Game([parser[4], cleanName].join("\\"), () => Promise.resolve({ apiKey: API_KEY }));
                if (commands) {
                    registerCommands(game, commands);
                }
                getUserRoles(game);
                //enterAsNPC(game); /*Remove comment line to enter space as NPC*/
                game.connect();
                await game.waitForInit();
                games[parser[4]] = game;
            }
        }
        catch (error) {
            console.log(error);
            reject(error);
        }
        resolve(games);
    });
};
exports.connectToSpaces = connectToSpaces;
const registerCommands = (game, commands) => {
    game.subscribeToConnection((connected) => {
        if (connected) {
            for (let cmd of commands) {
                game.registerCommand(cmd);
            }
        }
    });
};
const enterAsNPC = (game) => {
    game.subscribeToConnection((connected) => {
        if (connected) {
            game.enter({ isNpc: true });
        }
    });
};
const getUserRoles = (game) => {
    game.subscribeToEvent("spaceSetsSpaceMembers", (data, context) => {
        exports.spaceRoles[game?.spaceId?.split("\\")[0]] =
            data.spaceSetsSpaceMembers.members;
    });
};
