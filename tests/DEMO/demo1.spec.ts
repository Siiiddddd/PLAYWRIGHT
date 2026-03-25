import { test , expect } from "@playwright/test";

test("hello",()=> {
    console.log("hello");
})

test("Open URL" , async ({page}) => {
    await page.goto("https://www.youtube.com/")
    page.close();
})

test("trying expect", async ({page}) => {
   await expect(5).toBe(5);
   await page.goto("https://www.google.com/")
   
})

test("open google", async ({page}) => {
    await page.goto("https://www.google.com/")
})  

// .only to run a single test
// test.only("open youtube", async ({page}) => {
//     await page.goto("https://www.youtube.com/")
// })

// .skip to skip a test
test.skip("open facebook", async ({page}) => {
    await page.goto("https://www.facebook.com/")
})



