import {test, expect , Browser, BrowserContext,chromium, Page} from '@playwright/test';

let browser:Browser;
let context: BrowserContext;
let p:Page;

test.beforeAll("invoke",async () => {
browser= await chromium.launch();
context = await browser.newContext();
p=await context.newPage();
});

test("open URL",async()=>{
    p.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    expect(p).toHaveTitle("OrangeHRM");
});

test("verify invalid creds" , async () =>{
    await p.getByPlaceholder("Username").type("Admin1");
    await p.getByPlaceholder("Password").type("admin1234");
    await p.locator('button[type="submit"]').click();

let errormsg= await p.locator('//p[@class="oxd-text oxd-text--p oxd-alert-content-text"]').textContent();
console.log("Error message is: "+errormsg);
expect(errormsg?.includes("Invalid")).toBeTruthy(); // partial match
expect(errormsg==="Invalid credentials").toBeTruthy(); // complete match
    await p.waitForTimeout(2000);

    
 await expect(p.locator('//p[@class="oxd-text oxd-text--p oxd-alert-content-text"]')).toHaveText("Invalid credentials");

 
});