// For handling 'showQueue' slash command
export default async function ShowQueue(interaction, queue) {
    try {
        // Content for message to send
        let content = ``;

        // Item in the queue
        let item;

        // If no songs are in the queue
        if (queue.length < 1) {
            content = "There are no songs in the queue";
        }
        // Else loop through queue and add to content
        else {
            content += "Quere:\n";
            for (let i = 0; i < queue.length; i++) {
                item = queue[i];
                content += `${item.details.title} - ${formatDuration(item.details.duration)}\n`;
            }
        }
        
        // Reply to the user
        await interaction.reply({
            content,
            withResponse: true
        });
    }
    catch (err) {
        // Reply to the user with err
        await interaction.reply({
            content: `Error displaying the queue: ${err.message}`,
            withResponse: true
        });
    }
}

// Format duration from seconds to minutes:seconds
function formatDuration(duration) {
    return duration ? `${Math.floor(duration / 60)}:${duration % 60}` : "0:00";
}