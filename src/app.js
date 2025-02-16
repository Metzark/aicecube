//#region Imports

import 'dotenv/config';
import { Client, Init, Install, Sleep, RefreshCookies } from "./utils/index.js";
import { Ready, InteractionCreate } from "./handlers/on/index.js"
import { Play, Disconnect } from "./handlers/index.js";

//#endregion Imports

const _30_MIN_ = 30 * 60 * 1000;

async function app() {
    // Main app state
    const state = {
        queue: [], // Queue for songs to be played
        playing: undefined, // Next in the queue to be played
        flags: { // Flags used to dynamically update bot activity
            skip: false
        },
        lastCookieRefreshTime: null,
        adminUsername: process.env.DISCORD_BOT_ADMIN_USERNAME // Need this in places that 'process' isn't available
    }

    // Initialize some stuff
    Init();

    // Install/Register slash commands
    await Install();

    // On ready (after logging in)
    Client.on("ready", Ready);

    // On new interaction
    Client.on("interactionCreate", (interaction) => InteractionCreate(interaction, state));

    // Login in using token
    Client.login(process.env.DISCORD_TOKEN);

    // Infinite loop to continuously play queued songs
    while (true) {

        // Refresh cookies 30 minutes since last refresh has passed
        if(!state.lastCookieRefreshTime || state.lastCookieRefreshTime + _30_MIN_ < Date.now()) {
            state.lastCookieRefreshTime = await RefreshCookies();
        }

        // If not currently playing a song or the skip flag was raised
        if(!state.playing || state.flags.skip) {

            // If the skip flag was raised and there are no songs in the queue, disconnect from voice channel
            if (state.flags.skip && state.queue.length < 1) Disconnect(state);
            
            // If the skip flag was raised, lower it back down
            if(state.flags.skip) state.flags.skip = false;

            // Get next song to be played, undefined if there is nothing in the queue
            state.playing = state.queue.shift();

            // Start playing it
            if (state.playing) await Play(state);
        }

        await Sleep(1000);
    }
}

app();