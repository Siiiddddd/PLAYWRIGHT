import { test , expect , Page , BrowserContext , chromium , Browser } from '@playwright/test'

let browser : Browser; 
let context : BrowserContext ; 
let page  : Page;

test.beforeAll( " invoke ", async() =>{

    browser = await chromium.launch()
    context =  await browser.newContext()
    page = await context.newPage();
})

test("playwright" , async() => {
     
    await page.goto("https://www.w3schools.com/");
    await page.waitForLoadState('networkidle',{timeout:5000})
   let a = await page.getByRole('heading' , {name : 'Learn to Code'}).allInnerTexts()
    console.log(a)
  let b =  page.locator('.ga-nav')
  let c=b.filter({ hasText:('PHP Tutorial')})
    await expect(c).toBeVisible()


})