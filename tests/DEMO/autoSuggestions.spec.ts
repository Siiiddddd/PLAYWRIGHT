import  { Page , Locator , Browser , BrowserContext, expect, test,chromium } from '@playwright/test';

let browser : Browser
let context : BrowserContext
let page : Page

test.beforeAll("initiate",async()=>{
    browser = await chromium.launch();
    context = await browser.newContext();
    page= await context.newPage();
});

test("open" , async()=>{
    await page.goto("https://www.google.com");
    await page.keyboard.type("Spiderman");
    await page.waitForTimeout(4000);
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(4000)
    await page.keyboard.press("Enter")
});

test("openfg" , async()=>{
    await page.goto("https://www.google.com");
    await page.keyboard.type("Spiderman");
    await page.waitForTimeout(4000);

  //  const element = await page.$$('Locator of the suggestions which might be multiple and dynamic')
  // get a for loop to iterate through each suggestion
  // for (let i = 0; i < element.length; i++) {
  //     let text = await element[i].innerText();
  //     if (text === "Spiderman movie") {
  //         await element[i].click();
  //         break;
  //     }
  // }

});



