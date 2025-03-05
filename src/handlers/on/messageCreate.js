export default async function MessageCreate(message) {
    try {
        const author = message.author.username;
        if(author === "melovutto") {
            await message.channel.send("^ This guy's a pdf file btw...");
        }
    }
    catch (err) {
        console.error(err);
    }
}