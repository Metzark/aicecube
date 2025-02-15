//#region Imports

import { Client, GatewayIntentBits } from 'discord.js';

//#endregion Imports

// Create a Discord client with intents
export default new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
    ]
});
