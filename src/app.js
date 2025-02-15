//#region Imports
import 'dotenv/config';
import Client from "./utils/client.js";
import { Ready } from "./handlers/index.js"

//#endregion Imports

Client.on("ready", Ready);

Client.login(process.env.DISCORD_TOKEN);