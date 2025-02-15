import { Download } from "../../utils/ytdl.js";

// For handling 'play' slash command
export default async function Play(interaction) {
    try {
        // Get the voice channel that the user is in
        // const channel = interaction.member.voice.channel;

        // Must be in a voice channel to use this command
        // if (channel === null) throw new Error("Yo dawg, you must be in a voice channel to use music commands");

        // Get the youtube url from options
        const url = interaction.options.getString('url');

        await Download("https://www.youtube.com/watch?v=jNQXAC9IVRw", "/audio/test.mp4");

        // Reply to the user
        await interaction.reply({
            content: "Ok",
            withResponse: true
        });
    }
    catch (err) {
        // Reply to the user with error message
        await interaction.reply({
            content: err.message || "Yo dawg, an unkown error occured",
            withResponse: true
        });
    }
}