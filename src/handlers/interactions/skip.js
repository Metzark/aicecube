// For handling 'skip' slash command
export default async function Skip(interaction, state) {
    try {

        // If no song is playing, nothing to skip
        if (!state.playing) throw new Error("There must be a song currently playing to skip")
        
        // Set the skip flag to true
        state.flags.skip = true;

        // Reply to the user
        await interaction.reply({
            content: `'${state.playing.details.title}' has been skipped`,
            withResponse: true
        });
    }
    catch (err) {
        await interaction.reply(err.message || "Yo dawg, an unknown error occured");
    }
}