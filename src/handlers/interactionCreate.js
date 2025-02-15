//#region Imports

import { Hey } from "./interactions/index.js";

//#endregion Imports

// Handles Client.on("interactionCreate")
export default async function InteractionCreate(interaction) {
    switch(interaction.commandName) {
        case "hey":
            await Hey(interaction);
            break;
        default:
            break;
    }
}