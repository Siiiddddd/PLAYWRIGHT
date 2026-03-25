import { test , expect, Browser, Page, BrowserContext, chromium } from "@playwright/test";

let browser: Browser;
let context: BrowserContext;
let p: Page;    

test.beforeAll("invoke browser", async ({ }) => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    p = await context.newPage();}); 

test("Mouseover demo", async ({ }) => {
    await p.goto("https://testautomationpractice.blogspot.com/");
    await p.locator('//button[@class="dropbtn"]').hover();
    await p.waitForTimeout(3000);
    await p.locator('//div[@class="dropdown-content"]/child::a[2]').click();
    await p.waitForTimeout(3000);
});






    
    