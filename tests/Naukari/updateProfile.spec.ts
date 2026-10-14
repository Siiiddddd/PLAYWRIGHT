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
test ("update profile" , async() =>{
    await page.locator('a[href="/mnjuser/profile"]:nth-child(1)').click();
    await page.locator('//span[text()="Resume headline"]/following-sibling::span').click();

    let headline : Locator = page.locator('#resumeHeadlineTxt')
    expect(headline).toBeVisible();
    expect(headline).toBeEditable();
    let text : string = await headline.inputValue();
   

    console.log(text.charAt(text.length-1));
let newText = ""
    if (text.charAt(text.length-1)=="."){
      newText=text.slice(0,text.length-1);
      console.log(newText);
    }
    else {
        newText=text+".";
        console.log(newText)
    }

    await headline.fill(newText);
    await page.locator('button[type="submit"]:nth-child(2)').click();
    expect(await page.locator('span[class="success-text"]').innerText()).toContain("Profile updated successfully");
    await page.locator('//span[text()="Profile updated successfully"]/parent::div/parent::div/preceding-sibling::div/span').click();



});