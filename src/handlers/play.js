//#region Imports

import {  joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection, AudioPlayerStatus, VoiceConnectionStatus } from "@discordjs/voice";

//#endregion Imports

export default async function Play(state) {
    let connection;

    try {
        const { interaction, path, error } = state.playing;

        // Get the voice channel that the user is in
        const channel = interaction.member.voice.channel;

        // Get the existing voice connection if the bot is in a voice channel
        connection = getVoiceConnection(interaction.guild.id);

        // Creata a new connection if bot isn't already in voice channel
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

        player.on(AudioPlayerStatus.Playing, () => {});

        // After the audio is finished set playing to undefined and destroy the connection if there's nothing in the queue
        player.on(AudioPlayerStatus.Idle, () => {
            state.playing = undefined;
            if (state.queue.length < 1) connection.destroy();
        });

        // If the bot is disconnected from the voice channel, destroy connection and remove everything from queue
        connection.on(VoiceConnectionStatus.Disconnected, () => {
            state.queue = [];
            connection.destroy()
        });
    }
    catch (err) {
        console.error(err);
    }
}