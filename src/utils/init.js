//#region Imports

import fs from "fs";

//#endregion Imports

export function Init() {
    // Make sure the /audio directory has been created
    if(!fs.existsSync(`${process.cwd()}/audio`)){
        fs.mkdirSync(`${process.cwd()}/audio`);
    }
}