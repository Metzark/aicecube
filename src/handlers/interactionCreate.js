//#region Imports

import { Hey, Play } from "./interactions/index.js";

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
        default:
            break;
    }
}