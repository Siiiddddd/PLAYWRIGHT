import {Page , Locator, expect, test , chromium , ChromiumBrowser , Browser , BrowserContext} from '@playwright/test';

let browser : Browser ;
let context : BrowserContext ;
let page : Page ;

test.beforeAll("page context",async ()=>{

    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

});

   // keyboard functions
   // keyboard.press = it will do both down and up action
   //keyboard.down = it will do only down action (holding the key)
   // keyboard.up = it will do only up action (releasing the key)
   // for multiple keys use + between the keys

test.skip("single key",async ()=>{
    await page.goto("https://www.google.com/");
    await page.locator('//*[@aria-label="Search"]').fill("ANIME");
    await page.keyboard.press("Enter");
      await page.waitForTimeout(5000)
});

test("multiple keys",async ()=>{
    await page.goto("https://www.google.com/");
    await page.locator('//*[@aria-label="Search"]').fill("ANIME");
    await page.keyboard.press("Control+A")
       await page.waitForTimeout(5000)
    await page.keyboard.press("Backspace")
       await page.waitForTimeout(5000)
    await page.locator('//*[@aria-label="Search"]').fill("MOVIES");
       await page.waitForTimeout(5000)
    await page.keyboard.press("Enter");
      await page.waitForTimeout(5000)
    await page.keyboard.press("Alt+Control+Delete")
});


