import youtubedl from "youtube-dl-exec";
import ffmpeg from "fluent-ffmpeg";

export async function Download(url, output) {

    const video = await youtubedl(url, {
        dumpSingleJson: true,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    });

    console.log(video);

    // return new Promise((res, rej) => {
    //     const ffm = ffmpeg().input(url).videoCodec("copy");  

    //     ffm.on("start", () => {});

    //     ffm.on("progress", () => {});

    //     ffm.on("end", () => {});

    //     ffm.on("error", () => {});

    //     ffm.save(output);

    //     ffm.run();
    // });
}