// For handling 'login' slash command
export default async function Login(interaction) {
    try {
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