import {test , expect} from "@playwright/test";

import{readExcelFile} from "../../Utils/readData";

test("verify url", async ({page}) => {
    await page.goto("https://www.youtube.com/");
    await expect(page).toHaveTitle("YouTube");
    await expect(page).toHaveURL("https://www.youtube.com/");   
    await page.locator("[placeholder='Search']").fill("playwright tutorial");
    await page.keyboard.press("Tab");
   // await page.locator("search button[aria-label='Search']").click();
    await page.waitForTimeout(5000);
    await console.log(expect(page.url()));
    await page.screenshot({path:"tests/DEMO/screenshot/verifyurl.png", fullPage:true});

   
    

    
})