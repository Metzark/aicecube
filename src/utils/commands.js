//#region Imports 

import { REST, Routes } from 'discord.js';

//#endregion Imports

const commands = [
    {
        name: "info",
        description: "Show list of commands",
        type: 1
    },
    {
        name: "hey",
        description: "Say hey to Aice Cube",
        type: 1,
    },
    {
        name: "show_queue",
        description: "Show the current queue of songs to be played",
        type: 1,
    },
    {
        name: "skip",
        description: "Skip the song that is currently playing",
        type: 1,
    },
    // {
    //     name: "disconnect",
    //     description: "Forcefully disconnect bot from voice channel",
    //     type: 1,
    // },
    {
        name: "queue",
        description: "Add a song from youtube to the queue",
        type: 1,
        options: [
            {
                type: 3,
                name: "url",
                description: "The url of a song on youtube",
                required: true
            }
        ]
    },
    {
        name: "replace_cookies",
        description: `Attach a cookies.txt to replace cookies. Only for ${process.env.DISCORD_BOT_ADMIN_USERNAME}.`,
        type: 1,
        options: [
            {
                type: 11,
                name: "file",
                description: "File containing cookies",
                required: true
            }
        ]
    },
    {
        name: "image",
        description: "Generate an image using Dall-E-3",
        type: 1,
        options: [
            {
                type: 3,
                name: "prompt",
                description: "Prompt for image generation",
                required: true
            },
            {
                type:3,
                name: "size",
                description: "Size of the image",
                required: true,
                choices: [
                    { name: "1024x1024", value: "1024x1024" },
                    { name: "1792x1024", value: "1792x1024" },
                    { name: "1024x1792", value: "1024x1792" }
                ]
            }
        ]
    }
]

export async function Install() {
    // Create a rest client using Discords REST thing
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    try {
        // Add slash commands and overwrite all existing slash commands 
        await rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), { body: commands });
        console.log("Registered Aice Cube slash commands...");
    }
    catch (err) {
        console.error(err);
    }
}