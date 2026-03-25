import {Page , expect , test , Browser , BrowserContext , chromium} from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;   

test.beforeAll("ini" , async()=>{
 browser = await chromium.launch();
 context = await browser.newContext();
 page = await context.newPage();
});

test("iframes" , async()=>{
    await page.goto("https://demo.automationtesting.in/Frames.html");
   const a  =  await page.frames();
   console.log(a.length);
   const frame =  page.frameLocator('//iframe[@id="singleframe"]')
   await frame.locator("//input[@type='text']").fill("HII")
// take reference of the frame ans assign it to a variable and then perform the action on that variable same as page
});
test("nested iframes" , async()=>{
    await page.goto("https://demo.automationtesting.in/Frames.html");
    await page.getByText("Iframe with in an Iframe").click();
    const frame1 = page.frameLocator('//iframe[@src="MultipleFrames.html"]');
    const frame2 = frame1.frameLocator('//iframe[@src="SingleFrame.html"]');
    await frame2.locator("//input[@type='text']").fill("HII")
    await page.waitForTimeout(3000)
    console.log(await frame2.locator("//h5").textContent());
    // get the reference of the first frame and then get the reference of the second frame and then perform the action on the second frame
});



// child frames are also called nested frames and parent frames are also called main frames. we can have multiple child frames in a parent frame but we can not have multiple parent frames in a child frame. we can switch between frames using the frame locator and we can perform actions on the frames using the frame locator.    
// eg of child frame usage frame1.frameLocator('//iframe[@src="MultipleFrames.html"]') here frame1 is the parent frame and the second frame is the child frame and we can perform actions on the child frame using the reference of the parent frame.   
// switching between frames is also called frame navigation and we can switch between frames using the frame locator and we can perform actions on the frames using the frame locator.  
// frame.fill is not working because the frame is not intractable so we have to use locator to perform the action on the frame.
// coming out of the frame is also called switching to the main frame and we can switch to the main frame using the page object and we can perform actions on the main frame using the page object.
// no need to switch to the main frame because we can perform actions on the main frame using the page object without switching to the main frame.