import {test, expect, Browser, BrowserContext , chromium , webkit , firefox} from "@playwright/test";

test("Orange HRM login and logout flow" ,async ({page, browser}) => {
    // Open URL
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await expect(page).toHaveTitle("OrangeHRM");

    // Get creds and login
    var username: string = "";
    var password: string = "";
   username = await page.locator(".oxd-text").nth(1).innerHTML();
   password = await page.locator(".oxd-text").nth(2).innerHTML();
    let UNarray= username.split(" ");
    let PWDarray= password.split(" ");
    await page.locator('input[name="username"]').fill(UNarray[UNarray.length-1]);
    //.type() can also be used instead of .fill()
    await page.locator('input[name="password"]').fill(PWDarray[PWDarray.length-1]);
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    await expect(page.locator("h6.oxd-text")).toHaveText("Dashboard");  
    await page.screenshot({path:"tests/DEMO/screenshot/orangelogin.png", fullPage:true});

    // Logout
    await page.locator("li.oxd-userdropdown").click();
    await page.getByText("Logout").click();
    await expect(page.locator('h5.oxd-text')).toHaveText("Login");
    await page.screenshot({path:"tests/DEMO/screenshot/orangelogout.png", fullPage:true});

});


    






