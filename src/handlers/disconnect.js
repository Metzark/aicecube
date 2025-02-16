//#region Imports

import { getVoiceConnection } from "@discordjs/voice";

//#endregion Imports

// Disconnects a bot from state.playing
export default function Disconnect(state) {
    try {
        // Must be currently playing a song
        if(!state.playing) throw new Error("There must be a song playing to disconnect");

        // Get the interction from the song that is playing
        const interaction = state.playing.interaction;

        // Get the connection to the voice channel
        const connection = getVoiceConnection(interaction.guild.id);

        if (!connection) throw new Error("Unable to get the connection from the voice channel");

        connection.destroy();
    }
    catch (err) {
        console.error(err);
    }
}