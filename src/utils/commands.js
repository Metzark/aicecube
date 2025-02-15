//#region Imports 

import { REST, Routes } from 'discord.js';

//#endregion Imports

const commands = [
    {
        name: "hey",
        description: "Say hey to Aice Cube",
        type: 1,
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