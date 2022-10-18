"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandList = void 0;
exports.commandList = {
    commands: {
        description: "Chats to the user all the public commands registered by this extension.",
        public: true,
        fx: async ({ game, context }) => {
            Object.keys(exports.commandList).forEach((key) => {
                if (exports.commandList[key].public) {
                    game.chat(context.playerId, [], context.player.map, {
                        contents: `Command: /${key}\nDescription: ${exports.commandList[key].description}\n`,
                    });
                }
            });
        },
    },
    help: {
        description: "Chats to the user detailed instructions about a command.",
        public: true,
        helptext: "Enter /help [command] to get details about /[command].",
        example: "'/help commands'",
        fx: async ({ game, context, parser }) => {
            if (parser.length > 1 && exports.commandList[parser[1]].public) {
                game.chat(context.playerId, [], context.player.map, {
                    contents: `Command: /${parser[1]}` +
                        `\nInstructions:\n${exports.commandList[parser[1]].helptext ??
                            exports.commandList[parser[1]].description}` +
                        (exports.commandList[parser[1]].example
                            ? `\nExample:\n${exports.commandList[parser[1]].example}`
                            : ``) +
                        `\n--------`,
                });
            }
            else if (parser.length === 1) {
                game.chat(context.playerId, [], context.player.map, {
                    contents: `Command: /${"help"}` +
                        `\nInstructions:\n${exports.commandList["help"].helptext}` +
                        `\nExample:\n${exports.commandList["help"].example}` +
                        `\n--------`,
                });
            }
            else {
                game.chat(context.playerId, [], context.player.map, {
                    contents: `Sorry, no such command found.\n--------`,
                });
            }
        },
    },
    /*
    "command": {
      description: "Short description of what the command does",
      helptext: "Longer description of what the function does. Explain parameters here using [variables].",
      example: "'/command example'" //Example of the command being used. Note the '' around the command, to prevent recursive use.
      public: true or false, //Determines if command is shown when /command is run.
      fx: {({game, parser, context, playerSendsCommand}: CommandProps) => {}} //This is the function that is run when the command is used. Can be async if needed.
    }
    */
};
