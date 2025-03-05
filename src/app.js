//#region Imports

import 'dotenv/config';
import OpenAI from "openai";
import { Client, Init, Install, Sleep, RefreshCookies } from "./utils/index.js";
import { Ready, InteractionCreate, MessageCreate } from "./handlers/on/index.js"
import { Play, Disconnect } from "./handlers/index.js";

//#endregion Imports

const _10_MIN_ = 10 * 60 * 1000;

async function app() {
    // Main app state
    const state = {
        queue: [], // Queue for songs to be played
        playing: undefined, // Next in the queue to be played
        flags: { // Flags used to dynamically update bot activity
            skip: false
        },
        lastCookieRefreshTime: null, // Used to automatically refresh yt cookies
        adminUsername: process.env.DISCORD_BOT_ADMIN_USERNAME, 
        openai: new OpenAI({ apiKey: process.env.DISCORD_BOT_OPENAI_KEY }),
        lastImageGenerationTime: Date.now(),
        imageGenerationTimeout: Number(process.env.DISCORD_BOT_IMAGE_GENERATION_TIMEOUT) * 1000 // In ms
    }

    // Initialize some stuff
    Init();

    // Install/Register slash commands
    await Install();

    // On ready (after logging in)
    Client.on("ready", Ready);

    // On new interaction
    Client.on("interactionCreate", (interaction) => InteractionCreate(interaction, state));

    Client.on("messageCreate", (message) => MessageCreate(message));

    // Login in using token
    Client.login(process.env.DISCORD_TOKEN);

    // Infinite loop to continuously play queued songs
    while (true) {

        // Refresh cookies 30 minutes since last refresh has passed
        if(!state.lastCookieRefreshTime || state.lastCookieRefreshTime + _10_MIN_ < Date.now()) {
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