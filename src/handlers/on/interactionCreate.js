//#region Imports

import { Hey, Queue, ShowQueue, Skip, ReplaceCookies } from "../interactions/index.js";

//#endregion Imports

// Handles Client.on("interactionCreate")
export default async function InteractionCreate(interaction, state) {
    switch(interaction.commandName) {
        case "hey":
            await Hey(interaction);
            break;
        case "queue":
            await Queue(interaction, state.queue);
            break;
        case "show_queue":
            await ShowQueue(interaction, state.queue);
            break;
        case "skip":
            await Skip(interaction, state);
            break;
        case "replace_cookies":
            await ReplaceCookies(interaction);
            break;
        default:
            break;
    }
}