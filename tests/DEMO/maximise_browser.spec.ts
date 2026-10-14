import {test, expect} from '@playwright/test';

test("maximize browser window", async ({page})=>{
    //maximize browser
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.setViewportSize({width:1536, height:730})});

    // we can also set the viewport size in the playwright.config.ts file
    // use the below code in the config file inside the 'use' block
    /*
    projects: [
    {
      name: 'chromium', 
      use : {
        viewport: { width: 1536, height: 730 },
      },
    }
    ]
    */

  