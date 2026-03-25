import { Page , Locator ,Browser , BrowserContext , test, expect, chromium } from '@playwright/test';

let browser : Browser
let context : BrowserContext
let page : Page

test.beforeAll("initiate",async()=>{
    browser = await chromium.launch();
    context = await browser.newContext();
    page= await context.newPage();
});

// alerts has to be handled using the dialog event of the page object. we can use the dialog object to get the message and type of the alert and then we can accept or dismiss the alert.
// they have to be defined before the action which triggers the alert because once the alert is triggered the control will be on the alert and we won't be able to handle it.
// playwright will automatically handle the alert if we don't handle it explicitly but it will not give us the message and type of the alert.

test("simple alert",async()=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    page.on("dialog" , async(dialog)=>{
        console.log(dialog.message());
        console.log(dialog.type());
         dialog.accept()
    });
    await page.locator('//button[@id="alertBtn"]').click();
});

test("confirmation alert",async()=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    page.on("dialog" , async(dialog)=>{
        console.log(dialog.message());
        console.log(dialog.type());
         dialog.dismiss()
       await expect(page.locator('//p[@id="demo"]')).toHaveText("You pressed Cancel!") 
    });
    await page.locator('//button[@id="confirmBtn"]').click();
});

test("Prompt alert" , async()=>{
  await page.goto("https://testautomationpractice.blogspot.com/")
    page.on("dialog" , async(dialog)=>{      
        console.log(dialog.type() , dialog.message());
        await dialog.accept("SID")
        await expect(page.locator('//p[@id="demo"]')).toHaveText("Hello SID! How are you today?")
    });
    await page.getByText("Prompt Alert").click();
});









