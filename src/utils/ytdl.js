//#region Imports

import process from 'process';
import fs from "fs";
import youtubedl from "youtube-dl-exec";
import ffmpeg from "fluent-ffmpeg";

//#endregion Imports

export async function Download(url) {
    try {
        // Get video details using youtubedl
        const video = await getVideoDetails(url);

        if (video.duration > 600) throw new Error("Video is over 10 minutes");

        // Get video id for file pathing
        const id = video.id;

        // Get the url for the lowest quality mp4 format
        const dlUrl = getVideoUrl(video.formats);

        if (!dlUrl) throw new Error("No required formats were available");

        // Format the download path
        const mp3Path = `${process.cwd()}/audio/${id}.mp3`;
        const m4aPath = `${process.cwd()}/audio/${id}.m4a`;

        // Return the download path if already downloaded
        if(alreadyDownloaded(mp3Path)) {
            return { error: null, path: mp3Path, details: { title: video.title, duration: video.duration } };
        }

        // Download the m4a
        const downloadedM4A = await downloadM4A(dlUrl, m4aPath);

        if(downloadedM4A.error) {}

        // Convert to mp3
        const convertedMP3 = await convertM4AToMP3(m4aPath, mp3Path);


        if(convertedMP3.error) {}

        // Delete m4a file
        deleteNonconverted(m4aPath);

        return {...convertedMP3, details: { title: video.title, duration: video.duration } };
    }
    catch (err) {
        console.error(err);
        return { error: err.message, path: null, details: { title: null, duration: null } };
    }
}

export async function RefreshCookies() {
    // Refresh cookies by just using youtubedl (Me at the Zoo video lol)
    try {
        const video = await getVideoDetails("https://www.youtube.com/watch?v=jNQXAC9IVRw");
        if (!video) throw new Error("Video retrieval failed, cookies might or might not have been refreshed");      
    }
    catch (err) {
        console.log(err);
    }
    finally {
        // Return the time the cookies were refreshed
        return Date.now();
    }
}

// Get a youtube video's details using youtubedl
async function getVideoDetails(url) {
    return await youtubedl(url, {
        dumpSingleJson: true,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        audioFormat: "m4a",
        addHeader: ["referer:youtube.com", "user-agent:googlebot"],
        cookies: `${process.cwd()}/cookies.txt`,
        // cookiesFromBrowser: "chrome"
    });
}

// Get url for the best format (m4a)
function getVideoUrl(formats) {
    let url;

    formats.forEach(format => {
        if(format.ext === "m4a") {
            url = format.url;
        }
    });

    return url;
}

// Check if the file as already been downloaded, return path if so
function alreadyDownloaded(path) {
    return fs.existsSync(path.replace(".m4a", ".mp3"));
}

// Download m4a using ffmpeg
function downloadM4A(url, path) {
    return new Promise((res, rej) => {
        const ffm = ffmpeg().input(url).videoCodec("copy");  

        ffm.on("start", () => {});

        ffm.on("progress", () => {});

        ffm.on("end", () => {
            res({ error: null });
        });

        ffm.on("error", (err) => {
            rej({ error: err });
        });

        ffm.save(path);

        ffm.run();
    });
}

// Convert m4a to an mp3
function convertM4AToMP3(m4aPath, mp3Path) {
    return new Promise((res, rej) => {
        const ffm = ffmpeg(m4aPath);

        ffm.toFormat("mp3");

        ffm.on("end", () => res({ error: null, path: mp3Path }));

        ffm.on("error", (err) => rej({ error: err, path: null }));

        ffm.save(mp3Path);
    });
}

// Delete a file
async function deleteNonconverted(path) {
    fs.unlink(path, (err) => {});
}