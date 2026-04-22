import { test, expect, Page, BrowserContext, chromium, Locator } from "@playwright/test";

let page: Page;
let context: BrowserContext;
let browser: any; // or import Browser type

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
});

test.describe("testing" , async()=>{
test.beforeAll("url" , async()=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
});
test("fill all ",async()=>{
    await page.locator("#name").fill("sid")
    await page.locator("#email").fill("sidipatil@gmail.com")
    await page.locator("#phone").fill("1234567890")
    await page.locator("#textarea").fill("ADD1")
    
});
test("radio",async()=>{

    await page.locator("#male").check();
    await page.locator("#female").click();
    let genderRadio = await page.locator('//input[@type="radio"]/following-sibling::label')
   console.log(await genderRadio.allTextContents());
   console.log(await genderRadio.all());
   console.log(genderRadio);

   let genderRadioArray = await page.locator('//input[@type="radio"]/following-sibling::label').all()
   for ( let a of genderRadioArray){
    console.log(a)
    console.log(await a.textContent());
    console.log(await a.innerHTML());
    console.log(await a.innerText());
   } 
});
test("checkbox" , async()=>{
console.log(await page.locator(`#sunday~label`).allTextContents());

let weakdays  = ['sunday' , 'monday' , 'tuesday' , 'wednesday' , 'thursday' , 'friday' , 'saturday']
for ( let i of weakdays){
   let wd : string = await page.locator(`#${i}~label`).innerText();
    console.log(i + " : " + wd)
}
let weakele = await page.locator('//input[@type="checkbox"]/following-sibling::label').all()   
console.log(weakele)
for(let i of weakele){
    await i.click();
console.log(await i.innerText())}

let oddweekdays = ['monday' , 'wednesday' , 'friday']

for (let i of oddweekdays){
    await page.locator(`#${i}`).click()
}

for (let i of weakdays){
let ele =  page.locator(`#${i}~label`)
    if(await page.locator(`#${i}`).isChecked()){
        console.log(await ele.innerText() + " is checked ")
    }
    else{
        console.log(await ele.innerText() + " is not checked ")
    }

}



await page.waitForTimeout(5000);
});
test.describe.skip("alerts" , async()=>{
test.beforeEach("url",async()=>{
      await page.goto("https://testautomationpractice.blogspot.com/");
});
test("simplealerts" , async()=>{
    page.on("dialog", async (dialog) => {
        console.log(dialog.type());
        console.log(dialog.message());
        await dialog.accept() ;
    });
    await page.locator("#alertBtn").click();

    page.waitForTimeout(5000);

});
test("confirmation alerts" , async()=>{
    page.on("dialog" , async(dialog)=>{
        console.log(dialog.type());
        console.log(dialog.message());
        await dialog.accept();
    })
    await page.locator("#confirmBtn").click();

   await   page.waitForTimeout(5000);


});
test("prompt alerts" , async()=>{
    page.on("dialog" , async(dialog)=>{
        console.log(dialog.type());
        console.log(dialog.message());
        console.log(dialog.defaultValue());
        await dialog.accept("SID");
    })
    await page.locator("#promptBtn").click();
   await   page.waitForTimeout(5000);
});
});
test("frames" , async() =>{
    await page.close();
   let  context2  = await browser.newContext() ;
   let c2page=await context2.newPage();

   await c2page.goto("https://demo.automationtesting.in/Frames.html");

let f1 =await c2page.frameLocator("#singleframe");
console.log(await f1.locator('div[class="container"] h5').innerText());


let multiframe = await c2page.locator('a[href="#Multiple"]').click();
let f2 = await c2page.frameLocator('[src="MultipleFrames.html"]');
console.log(await f2.locator('.iframe-container>h5').innerText());

let f2f1 = f2.frameLocator('h5+iframe[src="SingleFrame.html"]');
console.log(await f2f1.locator('div[class="container"] h5').innerText());
await c2page.close();
});
test("tab windows" , async()=>{
  await Promise.all([ context.waitForEvent("page"),
     await page.locator('[class="widget-content"]>button:nth-child(1)').click()
  ])
  let pages = context.pages() ;
  await pages[1].bringToFront();
  console.log(pages.length)
  await pages[1].locator('[title="search"][size="10"]').fill("playwright");
  await pages[1].locator('[type="submit"]').click();
 console.log(await pages[1].locator('.status-msg-body').innerText());
 expect (await pages[1].locator('.status-msg-body').innerText()).toContain("playwright");
  await pages[1].waitForTimeout(5000);
});
test("tab popups windows" , async()=>{
  await Promise.all([ page.waitForEvent("popup"),
     await page.locator('#PopUp').click()
  ])

  await page.waitForLoadState("networkidle");
  let pages = context.pages() ;
  console.log(pages.length)

  for(let i of pages){
    console.log(await i.url());
  }

  await pages[1].
  
});






});

test.afterAll(async () => {
  await browser.close();
});