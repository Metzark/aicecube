//#region Imports

import { getVoiceConnection } from "@discordjs/voice";

//#endregion Imports


// For handling 'disconnect' slash command
export default async function Disconnect(interaction, state) {
    try {
        // Get the connection to the voice channel
        const connection = getVoiceConnection(interaction.guild.id);

        if (!connection) throw new Error("Unable to get connection");

        // Destroy the connection
        connection.destroy();

        // Remove everything from queue
        state.queue = [];

        // Reply to the user
        await interaction.reply({
            content: "Disconnected",
            withResponse: true
        });
    }
    catch (err) {
        await interaction.reply(err.message || "Yo dawg, an unknown error occured");
    }
}