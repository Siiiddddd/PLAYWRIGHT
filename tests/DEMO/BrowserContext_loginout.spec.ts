
import {test, expect, Browser, BrowserContext , chromium , webkit , firefox, Page} from "@playwright/test";
let browser : Browser;
let context: BrowserContext;
let p : Page;

test.beforeAll("setup",async () => {
 browser  = await chromium.launch();
 context = await browser.newContext();
 p = await context.newPage();});

// test("openURL", async ({page}) => {
//     await p.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
//     await expect(p).toHaveTitle("OrangeHRM");
// });

// test("login", async ({page}) => { var username: string = "";
//     var password: string = "";
//     var username: string = "";
//    username = await p.locator(".oxd-text").nth(1).innerHTML();
//    password = await p.locator(".oxd-text").nth(2).innerHTML();
//     let UNarray= username.split(" ");
//     let PWDarray= password.split(" ");
//     await p.locator('input[name="username"]').fill(UNarray[UNarray.length-1]);
//     //.type() can also be used instead of .fill()
//     await p.locator('input[name="password"]').fill(PWDarray[PWDarray.length-1]);
//     await p.locator('button[type="submit"]').click();
//     await expect(p).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
//     await expect(p.locator("h6.oxd-text")).toHaveText("Dashboard");  
//     await p.screenshot({path:"tests/DEMO/screenshot/orangelogin.png", fullPage:true});});

// test("logout", async ({page}) => {
//     await p.locator("li.oxd-userdropdown").click();
//     await p.getByText("Logout").click();   
//       }); 


 // browser and context will be closed after all the tests are executed
 // browser will be called once and it can have multiple contexts and each context can have multiple pages
 // e:g: browser -> context1 -> page1, page2, page3
 // e:g: browser -> context2 -> page1, page2, page3
// in pages : windows, tabs and pop ups are all same
 // think of browser as a car and context as a driver and page as a route, so one car can have multiple drivers and each driver can have multiple routes
 // pages are tab opened by clicking on something in page 
 // we need to use context.waitForEvent("page") to wait for the new page to open and then we can switch to that page and perform actions on it  
 // we can switch back to the original page by using context.pages() and then selecting the page we want to switch to
 // or can directly use p to perform actions on the current page and it will automatically switch to the new page when it is opened

test("tab switch" ,async()=>{

    await p.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html");

// has to be used before the action that opens the new page because it needs to start listening for the new page before it is opened  
// line 55 and 56 has to executed simultaneously because if we click on the link first then the new page will be opened and then we will start listening for the new page and it will not be able to find the new page because it was opened before we started listening for it
// so we need to use Promise.all() to execute both the actions simultaneously and then we can switch to the new page and perform actions on it  
// promise.all() is used to execute multiple promises simultaneously and wait for all of them to be resolved before moving to the next line of code
// so we can use it as follows : await Promise.all([
//     context.waitForEvent("page"), // this will wait for the new page to be opened
//     p.getByText("New Tab").click() // this will click on the link that opens the new page
// ]); both will return a promises and that has to be fed to Promise.all() in the form of an array and then we can use destructuring to get the new page as follows : const [newpage] = await Promise.all([  
   
// Approch 1: 
const [newpage]= await Promise.all([context.waitForEvent("page"), // this will wait for the new page to be opened
                    p.getByText("New Tab").click()] // this will click on the link that opens the new page
    );

 // const newpage = context.waitForEvent("page"); 
//     await p.getByText("New Tab").click();
    await p.waitForTimeout(5000);

// Approach 1 : we can use context.pages() to get all the pages opened in the context and then we can switch to the new page by using the index of the page in the array returned by context.pages() as follows :
    const pages = context.pages();   // use context.pages() to get all the pages opened in the context and then we can switch to the new page by using the index of the page in the array returned by context.pages() as follows :
    await pages[1].locator('(//input[@title="search"])[1]').fill("HII");
    console.log(p.url());
    await pages[1].locator('(//input[@title="search"])[2]').click();
    console.log(p.url());
    console.log(pages[1].url());

// Approch 2: we can directly use the newpage variable to perform actions on the new page as follows :

   await newpage.locator('(//input[@title="search"])[1]').fill("Hello");
    console.log(p.url());
   await newpage.locator('(//input[@title="search"])[2]').click();
    console.log( p.url());
    console.log(newpage.url());
});

test.only("popup switch" , async ()=>{
    await p.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html");

    const [popup] = await Promise.all([p.waitForEvent("popup"), // this will wait for the new page to be opened
                    p.getByText("Popup Windows").click()] // this will click on the link that opens the new page
    );
await p.waitForTimeout(5000);
    const pages = context.pages();
    console.log(pages.length)
    console.log(pages[0].url())
    console.log(pages[1].url())
    console.log(pages[2].url())

      console.log(popup.url())
      
// cant index popup page because it is a new page and it will be added to the end of the array returned by context.pages() and we dont know the index of the popup page in the array because it can be opened at any time and it can be closed at any time so we need to use the url of the page to identify the popup page and then we can perform actions on it as follows :          
// we can use a loop to iterate through the array of pages and then we can check the url of each page and if it matches the url of the popup page then we can perform actions on it as follows :
// but in tabs we can directly use the index of the page in the array returned by context.pages() to switch to the new page because we know that the new page will be added to the end of the array and it will be at index 1 if there are only 2 pages in the context but in popups we cannot use the index of the page in the array because we dont know the index of the popup page in the array because it can be opened at any time and it can be closed at any time so we need to use the url of the page to identify the popup page and then we can perform actions on it as follows :         
for (const a of pages){
        console.log(a.url());
      }
    // console.log(pages[1].url())
    // console.log(pages[2].url())




});


test("test play" , async({browser})=>{

    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    const page1 = await context1.newPage();
    await page1.goto("https://www.youtube.com/");
    const page3 = await context1.newPage();
    await page3.goto("https://www.netflix.com/browse")

    const page2 = await context2.newPage();
    await page2.goto("https://www.w3schools.com/java/")



});







    