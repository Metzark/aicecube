//#region Imports

import {  joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection, AudioPlayerStatus, StreamType } from "@discordjs/voice";
import { Download } from "../../utils/ytdl.js";

//#endregion Imports

// For handling 'play' slash command
export default async function Play(interaction) {
    let connection;
    try {
        // Get the voice channel that the user is in
        const channel = interaction.member.voice.channel;

        // Must be in a voice channel to use this command
        if (channel === null) throw new Error("Yo dawg, you must be in a voice channel to use music commands");

        // Get the youtube url from options
        const url = interaction.options.getString('url');

        // Defer the reply, so that it can be update and not timeout
        await interaction.deferReply();

        // Download and the get to the audio
        const { error, path } = await Download("https://www.youtube.com/watch?v=jNQXAC9IVRw");

        // If there was an error downloading, just reply with the error
        if(error) {
            interaction.editReply(error);
            return;
        }

        // Reply that the audio is ready
        interaction.editReply("Audio is ready to go");

         // Have the bot join a voice channel
         connection = getVoiceConnection(interaction.guild.id);
         if (!connection) {
             connection = joinVoiceChannel({
                 channelId: channel.id,
                 guildId: interaction.guild.id,
                 adapterCreator: interaction.guild.voiceAdapterCreator,
                 selfDeaf: false,
                 selfMute: false,
             });
         }

        // Create an audio
        const player = createAudioPlayer();

        // Load the audio file to play
        const resource = createAudioResource(path);

        // Play audio
        player.play(resource);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Playing, () => console.log("Bot is playing audio!"));


        // Force bot to leave after the audio is finished
        player.on(AudioPlayerStatus.Idle, () => connection.destroy());
    }
    catch (err) {
        // Reply to the user with error message
        await interaction.editReply(err.message || "Yo dawg, an unknown error occured");
        connection.destroy();
    }
}