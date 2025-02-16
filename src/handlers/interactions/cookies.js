//#region Imports

import { GetCookies } from "../../utils/getCookies.js";

//#endregion Imports

// For handling 'cookies' slash command
export default async function Cookies(interaction) {
    try {

        await GetCookies();

        // Reply to the user
        await interaction.reply({
            content: "Ok",
            withResponse: true
        });
    }
    catch (err) {
        // Reply to the user with error message
        await interaction.reply({
            content: err.message || "Yo dawg, an unknown error occured",
            withResponse: true
        });
    }
}