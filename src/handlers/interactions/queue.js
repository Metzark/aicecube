//#region Imports

import { Download } from "../../utils/ytdl.js";

//#endregion Imports

// For handling 'queue' slash command
export default async function Queue(interaction, queue) {
    try {
        // Defer the reply, so that it can be update and not timeout
        await interaction.deferReply();

        // Get the voice channel that the user is in
        const channel = interaction.member.voice.channel;

        // Must be in a voice channel to use this command
        if (channel === null) throw new Error("Yo dawg, you must be in a voice channel to use music commands");

        // Get the youtube url from options
        const url = interaction.options.getString("url");

        // Download and the get to the audio
        const { error, path, details } = await Download(url); 

        // If there was an error downloading, reply and to queue with the error
        if (error) throw new Error(error);

        // Reply that the audio is ready
        interaction.editReply("Audio is ready to go");

        // Push the new audio/interaction to the queue
        queue.push({ interaction, path, error: null, details });
    }
    catch (err) {
        // Reply to the user with error message
        await interaction.editReply(err.message || "Yo dawg, an unknown error occured");
        queue.push({ interaction, path: null, err });
    }
}