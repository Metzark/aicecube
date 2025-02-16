//#region Imports

import 'dotenv/config';
import Client from "./utils/client.js";
import { Init } from './utils/init.js';
import { Install } from './utils/commands.js';
import { Ready, InteractionCreate } from "./handlers/index.js"

//#endregion Imports

async function app() {

    // Initialize some stuff
    Init();

    // Install/Register slash commands
    await Install();

    // On ready (after logging in)
    Client.on("ready", Ready);

    // On new interaction
    Client.on("interactionCreate", InteractionCreate);

    // Login in using token
    Client.login(process.env.DISCORD_TOKEN);
}

app();