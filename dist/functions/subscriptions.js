"use strict";
/**
 * Use this File to organize functions which pertain directly to subscriptions,
 * or which may be referenced by subscriptions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToEvents = void 0;
const commands_1 = require("../config/commands");
/*
    //Space Member Permssions, to create Moderator or Owner limited actions.
    Note: spaceId here is the randomly generated characters before the space name, ie spaceId\\spaceName, not both parts
    [spaceId:string]:{playerId:{currentlyEquippedWearables:{...},name:string,roles:{DEFAULT_BUILDER:boolean,OWNER:boolean,DEFAULT_MOD:boolean}}}
*/
const connection_1 = require("./connection");
const subscribeToEvents = (game) => {
    /*
      game.subscribeToEvent("playerChats",({playerChats},context)=>{
          
      })
      */
    let compressorImage = "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/r8ULKH9t1Yzye0p3/mDJ7eDEjgqSH6JkbPTms0G";
    game.setObject("compress1", "lCompress", { normal: compressorImage, id: "lCompress", x: 3, y: 2, type: 0, height: 4, width: 3 });
    game.setObject("compress1", "rCompress", { normal: compressorImage, id: "rCompress", x: 18, y: 2, type: 0, height: 4, width: 3 });
    game.subscribeToEvent("playerMoves", ({ playerMoves }, context) => {
        console.log("Player " + context.player + "moves " + playerMoves.x + "and " + playerMoves.y);
        let playerPosX = context.player?.x;
        let playerPosY = context.player?.y;
        let playersInArea1 = 0;
        let playersInArea2 = 0;
        let playersInArea3 = 0;
        let playersInArea4 = 0;
        let playersInAllAreas = 0;
        let playersC = game.getPlayersInMap("compress1");
        for (let i = 0; i < playersC.length; i++) {
            if (playersC[i].x > 2 && playersC[i].x < 20 && playersC[i].y == 6) {
                playersInArea1++;
            }
            else if (playersC[i].x > 2 && playersC[i].x < 20 && playersC[i].y == 7) {
                playersInArea2++;
            }
            else if (playersC[i].x > 2 && playersC[i].x < 20 && playersC[i].y == 8) {
                playersInArea3++;
            }
            else if (playersC[i].x > 2 && playersC[i].x < 20 && playersC[i].y == 9) {
                playersInArea4++;
            }
        }
        playersInAllAreas = playersInArea1 + playersInArea2 + playersInArea3 + playersInArea4;
        let ratio = 0;
        let currentPlayers = game.players;
        if (playersInAllAreas != 0) {
            ratio = Math.round((playersInArea1 * 0 + (playersInArea2 * 2) + (playersInArea3 * 4) + (playersInArea4 * 6)) / playersInAllAreas);
            if (ratio == 6) {
                let playerIds = Object.keys(game.players);
                setTimeout(() => {
                    //game.setObject("compress1", "fire", {normal: fireImage, id: "fire", x: 11, y: 4, type:0, height: 4, width: 3})
                    //game.setObject("compress1", "smoke", {normal: smokeImage, id: "smoke", x: 11, y: 4, type:0, height: 4, width: 3})
                    for (let j = 0; j < playerIds.length; j++) {
                        if (currentPlayers[playerIds[j]].x == 11 && currentPlayers[playerIds[j]].y == 5) {
                            game.teleport("compress1", 21, 5, playerIds[j]);
                        }
                    }
                    //game.moveMapObject("compress1", "smoke", {x: 11, y:2}, 1200, "Cubic")
                    // setTimeout(() => {
                    //     game.deleteObject("compress1", "smoke");
                    // }, 1200)
                }, 600);
            }
        }
        let lStart = 3;
        let rStart = 18;
        console.log("1: " + playersInArea1 + " and 2: " + playersInArea2 + " and 3: " + playersInArea3 + " and 4: " + playersInArea4 + " and all: " + playersInAllAreas);
        console.log("ratio: " + ratio);
        game.moveMapObject("compress1", "lCompress", { x: lStart + ratio, y: 2 }, 1000, "Linear");
        game.moveMapObject("compress1", "rCompress", { x: rStart - ratio, y: 2 }, 1000, "Linear");
    });
    //setting up star objs
    let score1 = 0;
    let score2 = 0;
    let score3 = 0;
    let starStaticImage = "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/iq44NYsI898G_-Irx3w6k";
    let starMovingImage = "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/r8ULKH9t1Yzye0p3/0GKUOGcee9HgcDANXp7G5t";
    game.setObject("stage1", "starDesk1", { normal: starStaticImage, id: "starDesk1", x: 5, y: 11, type: 5, width: 1, height: 1, previewMessage: "+1" });
    game.setObject("stage1", "starDesk2", { normal: starStaticImage, id: "starDesk2", x: 10, y: 11, type: 5, width: 1, height: 1, previewMessage: "+1" });
    game.setObject("stage1", "starDesk3", { normal: starStaticImage, id: "starDesk3", x: 15, y: 11, type: 5, width: 1, height: 1, previewMessage: "+1" });
    let clearAllImage = "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/r8ULKH9t1Yzye0p3/BgZpx0gvRCmo3C4m1mjcQn";
    game.setObject("stage1", "clearAll", { normal: clearAllImage, id: "clearAll", x: 21, y: 8, type: 5, width: 1, height: 1, previewMessage: "CLEAR ALL SCORES" });
    game.subscribeToEvent("playerInteracts", ({ playerInteracts }, context) => {
        console.log(context.player + " x with " + playerInteracts.objId);
        let nearestObj = playerInteracts.objId;
        let nearestObjIdStart = playerInteracts.objId.substring(0, 13);
        console.log("idnearestis: " + nearestObjIdStart);
        switch (nearestObj) {
            case "starDesk1":
                throwStar(context.player?.x, context.player?.y, 7, 3, 1);
                break;
            case "starDesk2":
                throwStar(context.player?.x, context.player?.y, 11, 3, 2);
                break;
            case "starDesk3":
                throwStar(context.player?.x, context.player?.y, 15, 3, 3);
                break;
            case "clearAll":
                score1 = 0;
                score2 = 0;
                score3 = 0;
                let scoreLabelX1 = "https://2y74lxqi4a.execute-api.us-west-2.amazonaws.com/dev/draw-text?text=" + score1 + "&font=Roboto-Bold.ttf&red=250&green=250&blue=200";
                let scoreLabelX2 = "https://2y74lxqi4a.execute-api.us-west-2.amazonaws.com/dev/draw-text?text=" + score2 + "&font=Roboto-Bold.ttf&red=250&green=250&blue=200";
                let scoreLabelX3 = "https://2y74lxqi4a.execute-api.us-west-2.amazonaws.com/dev/draw-text?text=" + score3 + "&font=Roboto-Bold.ttf&red=250&green=250&blue=200";
                game.setObject("stage1", "score1", { normal: scoreLabelX1, id: "score1", x: 7, y: 3, type: 0, width: 3, height: 1 });
                game.setObject("stage1", "score2", { normal: scoreLabelX2, id: "score2", x: 11, y: 3, type: 0, width: 3, height: 1 });
                game.setObject("stage1", "score3", { normal: scoreLabelX3, id: "score3", x: 15, y: 3, type: 0, width: 3, height: 1 });
                break;
            default: break;
        }
    });
    game.subscribeToEvent("playerSendsCommand", ({ playerSendsCommand }, context) => {
        const parser = playerSendsCommand.command.split(" ");
        if (Object.keys(commands_1.commandList).includes(parser[0])) {
            commands_1.commandList[parser[0]].fx({
                game,
                parser,
                playerSendsCommand,
                context,
            });
        }
    });
    // game.subscribeToEvent("playerTriggersItem",({playerTriggersItem},context)=>{
    // })
    async function throwStar(startX, startY, endX, endY, board) {
        await game.setObject("stage1", "starFlying", { normal: starMovingImage, id: "starFlying", x: startX, y: startY, type: 5, width: 1, height: 1 });
        await game.moveMapObject("stage1", "starFlying", { x: endX, xOffset: 0, y: endY, yOffset: 0 }, 1800, "Cubic");
        setTimeout(() => {
            game.deleteObject("stage1", "starFlying");
            if (board == 1) {
                score1++;
                let scoreLabel1 = "https://2y74lxqi4a.execute-api.us-west-2.amazonaws.com/dev/draw-text?text=" + score1 + "&font=Roboto-Bold.ttf&red=250&green=250&blue=200";
                game.setObject("stage1", "score1", { normal: scoreLabel1, id: "score1", x: 7, y: 3, type: 0, width: 3, height: 1 });
            }
            else if (board == 2) {
                score2++;
                let scoreLabel2 = "https://2y74lxqi4a.execute-api.us-west-2.amazonaws.com/dev/draw-text?text=" + score2 + "&font=Roboto-Bold.ttf&red=250&green=250&blue=200";
                game.setObject("stage1", "score2", { normal: scoreLabel2, id: "score2", x: 11, y: 3, type: 0, width: 3, height: 1 });
            }
            else if (board == 3) {
                score3++;
                let scoreLabel1 = "https://2y74lxqi4a.execute-api.us-west-2.amazonaws.com/dev/draw-text?text=" + score3 + "&font=Roboto-Bold.ttf&red=250&green=250&blue=200";
                game.setObject("stage1", "score3", { normal: scoreLabel1, id: "score3", x: 15, y: 3, type: 0, width: 3, height: 1 });
            }
        }, 1800);
    }
    function delay(ms) {
        console.log("awaited delay- " + ms);
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};
exports.subscribeToEvents = subscribeToEvents;
/**
 * Function checks permissions of given user
 * @param game
 * @param playerId
 * @param roles
 * @param operand //Operation to perform on role array. Defaults to AND
 * @returns
 */
var Role;
(function (Role) {
    Role[Role["OWNER"] = 0] = "OWNER";
    Role[Role["DEFAULT_MOD"] = 1] = "DEFAULT_MOD";
    Role[Role["DEFAULT_BUILDER"] = 2] = "DEFAULT_BUILDER";
    Role[Role["MEMBER"] = 3] = "MEMBER";
})(Role || (Role = {}));
const checkUserPermissions = (game, playerId, roles, operand) => {
    //OWNER, DEFAULT_MOD, DEFAULT_BUILDER
    let check = [];
    for (let role of roles) {
        check.push(connection_1.spaceRoles[game.spaceId.split("\\")[0]][playerId].roles[role]);
    }
    switch (operand) {
        case "AND":
            return !check.includes(false);
            break;
        case "OR":
            return check.includes(true);
            break;
        case "NOT":
            return !check.includes(true);
            break;
        default:
            return !check.includes(false);
            break;
    }
};
