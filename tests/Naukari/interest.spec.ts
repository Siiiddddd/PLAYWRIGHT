import {test , expect , Page , BrowserContext ,Browser , chromium , Locator} from '@playwright/test'


let browser : Browser ;
let context  : BrowserContext ;
let page : Page  ;

test.beforeAll ("ini" , async() =>{

    browser = await chromium.launch();
    context = await browser.newContext();
    page=await context.newPage();
    
})

test("openURL" , async () =>{
    await page.goto("https://www.naukri.com/");
    await expect(page).toHaveURL("https://www.naukri.com/");
})
test("login" , async()=>{
    await page.locator("#login_Layer").click();

    await page.locator('input[placeholder="Enter your active Email ID / Username"]').fill("sidipatil01@gmail.com")
    await page.locator('input[placeholder="Enter your password"]').fill("9343703758sP")
    await page.locator('button[type="submit"]').click();    

})
test ("share interest" , async() =>{

    await page.locator('[href="/mnjuser/recommended-earjobs"]').click();
await page.waitForTimeout(10000)
    let intlist : Array <Locator> = await page.locator('//button[text()="Share interest"]').all();
    console.log(intlist);
    for(let i of intlist){
        console.log(i);
        await i.click();
        await page.waitForTimeout(5000)
        await page.goBack()
    }


})