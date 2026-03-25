import { test , expect, Browser, Page, BrowserContext, chromium } from "@playwright/test";

let browser: Browser;
let context: BrowserContext;
let p: Page;    

test.beforeAll("invoke browser", async ({ }) => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    p = await context.newPage();}); 

test("upload file demo", async ({ }) => {
    await p.goto("https://demo.automationtesting.in/FileUpload.html");
    const filePath = "../PLAYWRIGHT/Notes/install_run.txt";
    await p.locator('#input-4').setInputFiles(filePath);
    await p.waitForTimeout(3000);
}
);

test("multiple file upload demo", async ({ }) => {
    await p.goto("https://demo.automationtesting.in/FileUpload.html");
    const filePath1 = "../PLAYWRIGHT/Notes/install_run.txt"; 
    const filePath2 = "../PLAYWRIGHT/Notes/config_changes.txt";
    await p.locator('#input-4').setInputFiles([filePath1, filePath2]);
    await p.waitForTimeout(3000);
}   );               