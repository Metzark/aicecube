//#region Imports

import { Hey, Play, Login } from "./interactions/index.js";

//#endregion Imports

// Handles Client.on("interactionCreate")
export default async function InteractionCreate(interaction) {
    switch(interaction.commandName) {
        case "hey":
            await Hey(interaction);
            break;
        case "play":
            await Play(interaction);
            break;
        case "login":
            await Login(interaction);
            break;
        default:
            break;
    }
}