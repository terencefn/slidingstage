/**
 * Use this File to organize functions which pertain directly to subscriptions,
 * or which may be referenced by subscriptions.
 */

import { Game, PlayerTriggersItem } from "@gathertown/gather-game-client";
import { commandList } from "../config/commands";

/*
    //Space Member Permssions, to create Moderator or Owner limited actions.
    Note: spaceId here is the randomly generated characters before the space name, ie spaceId\\spaceName, not both parts
    [spaceId:string]:{playerId:{currentlyEquippedWearables:{...},name:string,roles:{DEFAULT_BUILDER:boolean,OWNER:boolean,DEFAULT_MOD:boolean}}}
*/
import { spaceRoles } from "./connection";

export const subscribeToEvents = (game: Game): void => {
  /*
    game.subscribeToEvent("playerChats",({playerChats},context)=>{
        
    })
    */
  
  let winterMap = "8AXY8HeY2D9Eh7iSqyKUI";
  let headShotsMap = "jJfUTOxoD_IOndkKNuDHJ";

    let compressorImage = "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/r8ULKH9t1Yzye0p3/mDJ7eDEjgqSH6JkbPTms0G";
  game.setObject("compress1", "lCompress", {normal: compressorImage, id: "lCompress", x: 3, y: 2, type:0, height: 4, width: 3})
  game.setObject("compress1", "rCompress", {normal: compressorImage, id: "rCompress", x: 18, y: 2, type:0, height: 4, width: 3})

    game.subscribeToEvent("playerMoves",({playerMoves},context)=>{
        //console.log("Player " + context.player + "moves " + playerMoves.x + "and " + playerMoves.y)
        if(context.player?.map == winterMap){

        }
        
        if(context.player?.map == "compress1"){
        let playerPosX = context.player?.x;
        let playerPosY = context.player?.y;

        let playersInArea1 = 0;
        let playersInArea2 = 0;
        let playersInArea3 = 0;
        let playersInArea4 = 0;
        let playersInAllAreas = 0;

        let playersC = game.getPlayersInMap("compress1");

        for(let i=0; i<playersC.length; i++){
                if(playersC[i].x > 2 && playersC[i].x < 20 && playersC[i].y == 6){
                  playersInArea1++; 
                }
                else if(playersC[i].x > 2 && playersC[i].x < 20 && playersC[i].y == 7){
                  playersInArea2++; 
                }
                else if(playersC[i].x > 2 && playersC[i].x < 20 && playersC[i].y == 8){
                  playersInArea3++; 
                }
                else if(playersC[i].x > 2 && playersC[i].x < 20 && playersC[i].y == 9){
                  playersInArea4++; 
                }
        }
        
        playersInAllAreas = playersInArea1 + playersInArea2 + playersInArea3 + playersInArea4;

        let ratio = 0;
        let currentPlayers = game.players;
        if (playersInAllAreas != 0){
            ratio = Math.round((playersInArea1*0 + (playersInArea2 * 2) + (playersInArea3 * 4) + (playersInArea4 * 6)) / playersInAllAreas);
            if(ratio == 6){
                let playerIds = Object.keys(game.players)
                
                setTimeout(() => {
                    //game.setObject("compress1", "fire", {normal: fireImage, id: "fire", x: 11, y: 4, type:0, height: 4, width: 3})
                    //game.setObject("compress1", "smoke", {normal: smokeImage, id: "smoke", x: 11, y: 4, type:0, height: 4, width: 3})
                    for(let j=0; j<playerIds.length; j++){
                        if(currentPlayers[playerIds[j]].x == 11 && currentPlayers[playerIds[j]].y ==5){
                            game.teleport("compress1", 21, 5, playerIds[j])
                        }
                    }
                    //game.moveMapObject("compress1", "smoke", {x: 11, y:2}, 1200, "Cubic")
                    // setTimeout(() => {
                    //     game.deleteObject("compress1", "smoke");
                    // }, 1200)
                }, 600)

            }
        }
        let lStart = 3;
        let rStart = 18;
        console.log("1: " + playersInArea1 + " and 2: " + playersInArea2 + " and 3: " + playersInArea3 + " and 4: " + playersInArea4 + " and all: " + playersInAllAreas)
        console.log("ratio: "+ ratio);
        game.moveMapObject("compress1", "lCompress", {x: lStart + ratio, y: 2}, 1000, "Linear")
        game.moveMapObject("compress1", "rCompress", {x: rStart - ratio, y: 2}, 1000, "Linear")
      }
    })
    
  //setting up star objs
  let score1 =0;
  let score2 =0;
  let score3 =0;
  let starStaticImage = "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/iq44NYsI898G_-Irx3w6k";
  let starMovingImage = "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/r8ULKH9t1Yzye0p3/0GKUOGcee9HgcDANXp7G5t";
  game.setObject("stage1", "starDesk1", {normal: starStaticImage, id:"starDesk1", x:5, y: 11, type: 5, width:1, height:1, previewMessage: "+1"})
  game.setObject("stage1", "starDesk2", {normal: starStaticImage, id:"starDesk2", x:10, y: 11, type: 5, width:1, height:1, previewMessage: "+1"})
  game.setObject("stage1", "starDesk3", {normal: starStaticImage, id:"starDesk3", x:15, y: 11, type: 5, width:1, height:1, previewMessage: "+1"})
  let clearAllImage = "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/r8ULKH9t1Yzye0p3/BgZpx0gvRCmo3C4m1mjcQn";
  game.setObject("stage1", "clearAll", {normal: clearAllImage, id:"clearAll", x:21, y: 8, type: 5, width:1, height:1, previewMessage: "CLEAR ALL SCORES"})

  let plantGrowIm = [
    "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/CSHUOJxC_xQAyEXhynxLJ",
    "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/ZZpdZxUuqj-a0UzTudr_g",
    "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/kI3601Q7x2a6KiGFsBOiP",
    "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/wJuT08ghwNSwZZvm-S-L1",
    "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/CtHgp7kHnFZ3qTfqu_MR3"
  ];

    game.subscribeToEvent("playerInteracts",({playerInteracts},context)=>{
      console.log(context.player + " x with " + playerInteracts.objId)
      let nearestObj = playerInteracts.objId;
      let nearestObjIdStart = playerInteracts.objId.substring(0, 13);
      console.log("idnearestis: " + nearestObjIdStart);

      switch (playerInteracts.mapId) {

        case "stage1":

      if(game.getObject(playerInteracts.objId, "stage1")){
        console.log("obj is known to be in stage1 room")
      switch (nearestObj) {
        case "starDesk1":
          throwStar(context.player?.x!, context.player?.y!, 7, 3, 1)
        break;
        case "starDesk2":
          throwStar(context.player?.x!, context.player?.y!, 11, 3, 2)
        break;
        case "starDesk3":
          throwStar(context.player?.x!, context.player?.y!, 15, 3, 3)
        break;
        case "clearAll":
            score1 = 0;  score2 = 0; score3 = 0;
            let scoreLabelX1 = "https://2y74lxqi4a.execute-api.us-west-2.amazonaws.com/dev/draw-text?text=" + score1 + "&font=Roboto-Bold.ttf&red=250&green=250&blue=200";
            let scoreLabelX2 = "https://2y74lxqi4a.execute-api.us-west-2.amazonaws.com/dev/draw-text?text=" + score2 + "&font=Roboto-Bold.ttf&red=250&green=250&blue=200";
            let scoreLabelX3 = "https://2y74lxqi4a.execute-api.us-west-2.amazonaws.com/dev/draw-text?text=" + score3 + "&font=Roboto-Bold.ttf&red=250&green=250&blue=200";
            game.setObject("stage1", "score1", {normal: scoreLabelX1, id:"score1", x:7, y: 3, type: 0, width:3, height:1})
            game.setObject("stage1", "score2", {normal: scoreLabelX2, id:"score2", x:11, y: 3, type: 0, width:3, height:1})
            game.setObject("stage1", "score3", {normal: scoreLabelX3, id:"score3", x:15, y: 3, type: 0, width:3, height:1})
            break;

      default: break;
      }
    }
    break;
    case "library":
      

      if(game.getObject(playerInteracts.objId, "library")){
        let theObj = game.getObject(playerInteracts.objId, "library")
        console.log("obj is known to be in library room")
        if(theObj){
        let itemString = context.player?.itemString?.substring(7)
        let theObjX = theObj.obj?.x
        let theObjY = theObj.obj?.y
      console.log("itemstring = " + itemString)
        if(itemString?.startsWith("water") && nearestObj.startsWith("fern1")){
           replaceObj(2, plantGrowIm[1], theObjX!, theObjY!)
        }
        else if(itemString?.startsWith("water") && nearestObj.startsWith("fern2")){
         replaceObj(3, plantGrowIm[2], theObjX!, theObjY!)
        }
        else if(itemString?.startsWith("water") && nearestObj.startsWith("fern3")){
         replaceObj(4, plantGrowIm[3], theObjX!, theObjY!)

        }
        else if(itemString?.startsWith("water") && nearestObj.startsWith("fern4")){
          replaceObj(5, plantGrowIm[4], theObjX!, theObjY!)
 
         }
      }
    }
      break;
    
      case headShotsMap: //headshots room
      let cardNumber = nearestObj.substring(6, 7)
      console.log("card number is "+cardNumber);
        let card = game.getObject("cardsShuffled"+cardNumber, headShotsMap);
        let cardXPos = card?.obj?.x;
        let cardYPos = card?.obj?.y;
        if(cardXPos && cardYPos){
        switch (nearestObj){
        case "arrowR1":
          game.moveMapObject(headShotsMap, "cardsShuffled1", {x: cardXPos +6, y: cardYPos}, 300, "Linear")
          break
        case "arrowR2":
          game.moveMapObject(headShotsMap, "cardsShuffled2", {x: cardXPos +6, y: cardYPos}, 300, "Linear")
          break
        case "arrowR3":
          game.moveMapObject(headShotsMap, "cardsShuffled3", {x: cardXPos +6, y: cardYPos}, 300, "Linear")
          break
        case "arrowR4":
          game.moveMapObject(headShotsMap, "cardsShuffled4", {x: cardXPos +6, y: cardYPos}, 300, "Linear")
          break
          case "arrowL1":
            game.moveMapObject(headShotsMap, "cardsShuffled1", {x: cardXPos -6, y: cardYPos}, 300, "Linear")
            break
          case "arrowL2":
            game.moveMapObject(headShotsMap, "cardsShuffled2", {x: cardXPos -6, y: cardYPos}, 300, "Linear")
            break
          case "arrowL3":
            game.moveMapObject(headShotsMap, "cardsShuffled3", {x: cardXPos -6, y: cardYPos}, 300, "Linear")
            break
          case "arrowL4":
            game.moveMapObject(headShotsMap, "cardsShuffled4", {x: cardXPos -6, y: cardYPos}, 300, "Linear")
            break
        default: break;
        }
      }
      break;
      default: break;
      }
    })
    

  game.subscribeToEvent(
    "playerSendsCommand",
    ({ playerSendsCommand }, context) => {
      const parser = playerSendsCommand.command.split(" ");

      if (Object.keys(commandList).includes(parser[0])) {
        commandList[parser[0]].fx({
          game,
          parser,
          playerSendsCommand,
          context,
        });
      }
    }
  );

  let wateringCanImage = "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F8YrjYBZGBNlW75Wh?alt=media&token=99a5dd66-947d-4f49-ad50-0fef9d68cbf3"    

    game.subscribeToEvent("playerTriggersItem",({playerTriggersItem},context)=>{
      console.log("triggersItem huh itemString = " + context.player?.itemString + "playerId: " + context.playerId + " closestobjsubstring " + playerTriggersItem.closestObject?.substring(0, 8) + " closestobject:  " + playerTriggersItem.closestObject + " closestobjtemplate?: " + playerTriggersItem.closestObjectTemplate + " space with " + context.map?.objects)
      let playerPosSnowX = context.player?.x
      let playerPosSnowY = context.player?.y
      let playerPosSnowD = context.player?.direction
      let itemString = context.player?.itemString?.substring(7)
      if(itemString?.startsWith("snowball")){
        console.log("has snowball itemstring is: " + itemString)
        if(playerPosSnowD == 1) { //down
          console.log("facing down")
        throwSnowball(playerPosSnowX!, playerPosSnowY!, playerPosSnowX!, playerPosSnowY!+7, playerPosSnowD)
        game.clearItem(context.playerId) 
        }
        if(playerPosSnowD == 3) { //up
          throwSnowball(playerPosSnowX!, playerPosSnowY!, playerPosSnowX!, playerPosSnowY!-7, playerPosSnowD)
          game.clearItem(context.playerId) 
        }
        if(playerPosSnowD == 5) { //left
          throwSnowball(playerPosSnowX!, playerPosSnowY!, playerPosSnowX!-7, playerPosSnowY!, playerPosSnowD)
          game.clearItem(context.playerId) 
        }
        if(playerPosSnowD == 7) { //right
          throwSnowball(playerPosSnowX!, playerPosSnowY!, playerPosSnowX!+7, playerPosSnowY!, playerPosSnowD)
          game.clearItem(context.playerId) 
        }

      }
      
      if(context.playerId && playerTriggersItem.closestObject){

        let closestObject = playerTriggersItem.closestObject
        let closestObjectStart = playerTriggersItem.closestObject.substring(0, 8)
        let itemString = context.player?.itemString //.substring(7)
        switch(closestObjectStart) {

        case "waterSource":

         
         if(itemString?.startsWith("water")) {
            game.clearItem(context.playerId) 
          }
          else game.setItem("water", wateringCanImage, context.playerId);
        break;

       case "snowball":
        console.log("knows its a snowball")
          if(itemString?.startsWith("snowball")) {
            game.clearItem(context.playerId) 
          }
          else game.setItem("snowball", snowball, context.playerId);
        break;

        default: break;

        }
      }
    })
    
    async function throwStar(startX: number, startY: number, endX: number, endY: number, board: number){
      
      await game.setObject("stage1", "starFlying", {normal: starMovingImage, id:"starFlying", x:startX, y: startY, type: 5, width:1, height:1})
      await game.moveMapObject("stage1", "starFlying", {x: endX, xOffset: 0, y: endY, yOffset: 0}, 1800, "Cubic")
     setTimeout(() => {
      game.deleteObject("stage1", "starFlying")
      if (board == 1){
        score1 ++;
        let scoreLabel1 = "https://2y74lxqi4a.execute-api.us-west-2.amazonaws.com/dev/draw-text?text=" + score1 + "&font=Roboto-Bold.ttf&red=250&green=250&blue=200";
        game.setObject("stage1", "score1", {normal: scoreLabel1, id:"score1", x:7, y: 3, type: 0, width:3, height:1})
      }
      else if (board ==2){
        score2 ++;
        let scoreLabel2 = "https://2y74lxqi4a.execute-api.us-west-2.amazonaws.com/dev/draw-text?text=" + score2 + "&font=Roboto-Bold.ttf&red=250&green=250&blue=200";
        game.setObject("stage1", "score2", {normal: scoreLabel2, id:"score2", x:11, y: 3, type: 0, width:3, height:1})

      }
      else if (board == 3){
        score3 ++;
        let scoreLabel1 = "https://2y74lxqi4a.execute-api.us-west-2.amazonaws.com/dev/draw-text?text=" + score3 + "&font=Roboto-Bold.ttf&red=250&green=250&blue=200";
        game.setObject("stage1", "score3", {normal: scoreLabel1, id:"score3", x:15, y: 3, type: 0, width:3, height:1})


      }
     
      }, 1800);
    
    }
let splat = "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/zngCzxt4Ixn555vFRWVYi"
let snowball = "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/r8ULKH9t1Yzye0p3/XqgX6HPDbVUjFsQSkFc4bo"
let playersHit = []

async function throwSnowball(startX: number, startY: number, endX: number, endY: number, direction: number){
  let time = Date.now()
      console.log("time set to" + time)
      await game.setObject("8AXY8HeY2D9Eh7iSqyKUI", "snowballFlying"+time, {normal: snowball, id:"snowballFlying", x:startX, y: startY, type: 0, width:1, height:1})
      await game.moveMapObject("8AXY8HeY2D9Eh7iSqyKUI", "snowballFlying"+time, {x: endX, xOffset: 0, y: endY, yOffset: 0}, 1000, "Linear")

            let players = game.players; 


            
            Object.keys(players).forEach(async key=>{
                if(snowBallHit(players[key].x, players[key].y, endX, endY, direction, 7)){
                  if(players[key].x! > 35 && players[key]!.x! < 62 && players[key].y! > 20 && players[key].y! < 42){
              console.log("caught" + key);
              let prevOutfit = players[key].outfitString;
              await delay(1000)
              game.setOutfitString("{\"skin\":{\"id\":\"KPK1RNe5O32vJ8IhOicy\",\"color\":\"3\",\"name\":\"typical\",\"type\":\"skin\",\"subType\":null,\"style\":null,\"isDefault\":true,\"previewUrl\":\"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/BbNpZNRQylqIUmzc2QveW\",\"startDate\":null,\"endDate\":null,\"createdAt\":\"2022-04-01T15:00:00.000Z\",\"updatedAt\":\"2022-09-27T18:09:09.817Z\",\"parts\":[{\"layerId\":\"skin front\",\"spritesheetId\":\"dQCYs4n7O99ksXuBIe33\"}]},\"hair\":{\"id\":\"OvyC9tDroW9xWSv03mK5\",\"color\":\"pink\",\"name\":\"flat top\",\"type\":\"hair\",\"subType\":null,\"style\":null,\"isDefault\":true,\"previewUrl\":\"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/824J4buRqlA7_3eE7ddaX\",\"startDate\":null,\"endDate\":null,\"createdAt\":\"2022-04-01T15:00:00.000Z\",\"updatedAt\":\"2022-09-27T18:09:09.825Z\",\"parts\":[{\"layerId\":\"hair front\",\"spritesheetId\":\"m5KqGj0aFmWdKDFaRYdu\"}]},\"facial_hair\":null,\"top\":{\"id\":\"RjHZpJroqxJb85HeASYK\",\"color\":\"white\",\"name\":\"t shirt\",\"type\":\"top\",\"subType\":null,\"style\":null,\"isDefault\":true,\"previewUrl\":\"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/d4krzTQ_x5dOWL3mXzVLC\",\"startDate\":null,\"endDate\":null,\"createdAt\":\"2022-04-01T15:00:00.000Z\",\"updatedAt\":\"2022-09-27T18:09:09.828Z\",\"parts\":[{\"layerId\":\"top front\",\"spritesheetId\":\"agEvFKFD4Ta3MQ09ENbU\"}]},\"bottom\":{\"id\":\"3whimWi11oWLEVMa6auu\",\"color\":\"orange\",\"name\":\"pants\",\"type\":\"bottom\",\"subType\":null,\"style\":null,\"isDefault\":true,\"previewUrl\":\"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/wxqJfQgIwYvCS7K6W_aKx\",\"startDate\":null,\"endDate\":null,\"createdAt\":\"2022-04-01T15:00:00.000Z\",\"updatedAt\":\"2022-09-27T18:09:08.235Z\",\"parts\":[{\"layerId\":\"bottom front\",\"spritesheetId\":\"6HsAcvI5gGPVIQAzhvtb\"}]},\"shoes\":{\"id\":\"jWRxPyatM2P0bdzSnf50\",\"color\":\"black\",\"name\":\"generic\",\"type\":\"shoes\",\"subType\":null,\"style\":null,\"isDefault\":true,\"previewUrl\":\"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/rbpTyhl5PUK9bdvPehj3W\",\"startDate\":null,\"endDate\":null,\"createdAt\":\"2022-04-01T15:00:00.000Z\",\"updatedAt\":\"2022-09-27T18:09:11.461Z\",\"parts\":[{\"layerId\":\"shoes front\",\"spritesheetId\":\"Thh1O95hOZKq4yyTmVQD\"}]},\"hat\":null,\"glasses\":null,\"other\":null,\"costume\":{\"id\":\"ishqcD2XucZbSQF3WGrX\",\"color\":\"black\",\"name\":\"snowman\",\"type\":\"costume\",\"subType\":\"seasonal\",\"style\":null,\"isDefault\":true,\"previewUrl\":\"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/7xZEwfgpSt73whnJ4tUB2\",\"startDate\":null,\"endDate\":null,\"createdAt\":\"2022-04-01T15:00:00.000Z\",\"updatedAt\":\"2022-09-27T18:09:11.461Z\",\"parts\":[{\"layerId\":\"costume front\",\"spritesheetId\":\"f7fmkLFy2kaWMGLiB1uY\"}]},\"mobility\":null,\"jacket\":null}"
 , key)
               game.setSpeedModifier(0.4, key)
              await delay(7000)
              game.setOutfitString(prevOutfit, key)
              game.setSpeedModifier(1, key)

            }
          }
          })
        
        }
  
      
function snowBallHit(playerX: number, playerY: number, destX: number, destY: number, direction: number, throwLength: number){
if(direction === 1){
  if(playerX == destX && playerY <= destY && playerY > destY-throwLength) return true;
}
else if(direction === 3){
  if(playerX == destX && playerY >= destY && playerY < destY+throwLength) return true;
}
else if(direction === 5){
  if(playerY == destY && playerX >= destX && playerX < destX+throwLength) return true;
}
else if(direction === 7){
  if(playerY == destY && playerX <= destX && playerX > destX-throwLength) return true;
}
else return false;
}

    async function replaceObj(sequence: number, imageLink: string, x:number, y:number){
      let sequenceMinus1 = sequence-1
      let toDelete = "fern"+sequenceMinus1
      await game.setObject("library", "fern"+sequence, {normal: imageLink, id:"fern"+sequence, x:x, y: y, type: 5, width:1, height:1})
      await game.deleteObject("library", toDelete)
    
    }
    
    function delay(ms: number) {
      console.log("awaited delay- " + ms)
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

};

/**
 * Function checks permissions of given user
 * @param game
 * @param playerId
 * @param roles
 * @param operand //Operation to perform on role array. Defaults to AND
 * @returns
 */

enum Role {
  OWNER,
  DEFAULT_MOD,
  DEFAULT_BUILDER,
  MEMBER,
}

const checkUserPermissions = (
  game: Game,
  playerId: string,
  roles: Role[],
  operand?: "AND" | "OR" | "NOT"
) => {
  //OWNER, DEFAULT_MOD, DEFAULT_BUILDER
  let check: boolean[] = [];
  for (let role of roles) {
    check.push(spaceRoles[game.spaceId!.split("\\")[0]][playerId!].roles[role]);
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

