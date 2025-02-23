//#region Imports


//#endregion Imports

// For handling 'queue' slash command
export default async function Image(interaction, state) {
    try {
        // Defer the reply, so that it can be update and not timeout
        await interaction.deferReply();

        // Check if a new image can be generated
        if (Date.now() < state.lastImageGenerationTime + state.imageGenerationTimeout) {
            const waitTime = Math.round((state.lastImageGenerationTime + state.imageGenerationTimeout - Date.now()) / 1000);
            throw new Error(`You must wait ${waitTime} seconds before generating a new image`);
        }

        // Get the prompt from options
        const prompt = interaction.options.getString("prompt");

        // Get the size from options
        const size = interaction.options.getString("size");

        // Hit openai's api
        const response = await state.openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size
        });

        // Get image url from response
        const url = response.data.length > 0 ? response.data[0].url : "";

        // Reply with image
        await interaction.followUp({ embeds: [{ image: { url} }]})

        // Update the last image generation time to now
        state.lastImageGenerationTime = Date.now();
    }
    catch (err) {
        // Reply to the user with error message
        await interaction.editReply(err.error?.message || err.message || "Yo dawg, an unknown error occured");
    }
}