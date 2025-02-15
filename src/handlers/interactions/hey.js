// For handling 'hey' slash command
export default async function Hey(interaction) {
    try {
        // Get the user who used the commands username
        const username = interaction.user.globalName;
        
        // Reply to the user
        await interaction.reply({
            content: `What's up, ${username}`,
            withResponse: true
        });
    }
    catch (err) {
        console.error(err);
    }
}