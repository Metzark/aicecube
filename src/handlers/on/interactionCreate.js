//#region Imports

import { Hey, Queue, ShowQueue, Skip, ReplaceCookies, Disconnect, Info, Image } from "../interactions/index.js";

//#endregion Imports

// Handles Client.on("interactionCreate")
export default async function InteractionCreate(interaction, state) {
    switch(interaction.commandName) {
        case "info":
            await Info(interaction);
            break;
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
            await ReplaceCookies(interaction, state.adminUsername);
            break;
        case "image":
            await Image(interaction, state);
            break;
        case "disconnect":
            await Disconnect(interaction, state);
            break;
        default:
            break;
    }
}