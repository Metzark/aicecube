
const content = `AICE CUBE:
Commands:
- /info - Show list of commands
- /hey - Basically a ping command
- /queue - Add a song to the queue using a youtube link
- /showQueue - Show all songs that are currently in the queue
- /skip - Skip the current song that is playing
- /replaceCookie - Forcefully replace cookies for yt-dlp (Only available for ${process.env.DISCORD_BOT_ADMIN_USERNAME})
- /image - Generate an image using Dall-E-3
`;

// For handling 'info' slash command
export default async function Info(interaction) {
    try {
        // Reply to the user
        await interaction.reply({
            content,
            withResponse: true
        });
    }
    catch (err) {
        console.error(err);
    }
}