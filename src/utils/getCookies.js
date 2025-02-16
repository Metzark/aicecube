//#region Imports

import { chromium } from "playwright";

//#endregion Imports

// Signs into youtube to save cookies
export async function GetCookies() {

    const browser = await chromium.launch({ headless: true });

    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });


    try {

        const page = await context.newPage();

        await page.goto('https://youtube.com');

        await page.getByLabel('Sign in').click();

        await page.getByLabel('Email or phone').fill(process.env.YOUTUBE_EMAIL);

        await page.getByRole('button', { name: 'Next' }).click();

        console.log(page.url());

        // Get all cookies
        const cookies = await context.cookies();
        // console.log(cookies);

        // Close browser

        // Return true for success
        return true;
    }
    catch (err) {
        // Return false for failed
        console.error(err);
        return false;
    }
    finally {
        await browser.close();
    }
}