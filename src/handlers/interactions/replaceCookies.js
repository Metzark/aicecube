//#region Imports

import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

//#endregion Imports

const streamPipeline = promisify(pipeline);

// For handling 'replaceCookies' slash command
export default async function ReplaceCookies(interaction) {
    try {
        // Defer reply in case this takes a bit
        await interaction.deferReply();

        if(interaction.user.username !== process.env.DISCORD_BOT_ADMIN_USERNAME) throw new Error(`You are not ${process.env.DISCORD_BOT_ADMIN_USERNAME}`)

        // Get the file from the interaction
        const file = interaction.options.getAttachment('file');

        // Must have a file to save cookies
        if (!file) throw new Error("No file was provided")

        // Make requst to file url
        const response = await fetch(file.url);

        if (!response) throw new Error("No response from file url")

        // Create a writer to write to cookies.txt
        const writer = fs.createWriteStream(`${process.cwd()}/cookies.txt`);

        // Write
        await streamPipeline(response.body, writer);

        // Reply to the user
        await interaction.editReply("Cookies have been manually replaced");
    }
    catch (err) {
        console.error(err);
        await interaction.editReply(err.message || "Yo dawg, an unknown error occured");
    }
}