import {
  test,
  expect,
  BrowserContext,
  chromium,
  Page,
  Browser,
  request,
} from "@playwright/test";
import XLSX from "xlsx";
import fs from "fs";
import mysql from "mysql2/promise";
let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll("ini", async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
});

test("fill", async () => {
  await page.goto("https://testautomationpractice.blogspot.com/"); 
  await page.locator("#name").fill("SID");
  await page.getByPlaceholder("Enter EMail").fill("KRSNA@gmail.com");
  await page.locator('//*[@id="phone"]').fill("1234567890");
  await page.locator('//*[@id="phone"]').screenshot({ path: "G:/VS CODE/Playwright/Screenshots/sid.png"  }) ;
});

test("pop window", async () => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  await Promise.all([
    page.waitForEvent("popup"),
    page.getByText("New Tab").click(),
  ]);
  //  await Promise.all([ context.waitForEvent("page"),
  //   page.getByText("New Tab").click()])

  let pages = context.pages();
  console.log(pages.length);
  let links = await pages[1]
    .locator('//div[@class="widget-content"]/ul/li/a')
    .all();
  for (let i = 0; i < links.length; i++) {
    console.log(await links[i].textContent());
  }
  await pages[0].bringToFront();
  await pages[0].locator('//*[@id="phone"]').fill("444555666");
});

test("iframes", async () => {
  await page.goto("https://demo.automationtesting.in/Frames.html");
  let f1 = await page.frameLocator('//iframe[@id="singleframe"]');
  await f1
    .locator('(//h5[text()="iFrame Demo"]/following-sibling::div/div/input)[1]')
    .fill("JSON");

  await page.locator('//a[text()="Iframe with in an Iframe"]').click();
  let mf1 = page.frameLocator('//iframe[@src="MultipleFrames.html"]');
  let mf2 = mf1.frameLocator('//iframe[@src="SingleFrame.html"]');

  await mf2.locator('//input[@type="text"]').fill("KRSNA");
});

test("shadowroot", async () => {
  await page.goto("https://practice.expandtesting.com/shadowdom");
  let shtxt = await page.locator('//button[@id="my-btn"]').innerText();
  console.log(shtxt);
  page.evaluate(() => {
    document.getElementById("my-btn")?.style.setProperty("color", "red");
    document
      .getElementById("my-btn")
      ?.style.setProperty("background-color", "yellow");
  });
  await page.waitForTimeout(5000);
});

test("download", async () => {
  await page.goto("https://demo.automationtesting.in/FileDownload.html");

  let [down] = await Promise.all([
    page.waitForEvent("download"),
    page.locator('(//a[text()="Download"])[1]').click(),
  ]);

  await down.saveAs("abc.txt");
});

test("API" , async({request})=>{
let response =  await request.get("https://official-joke-api.appspot.com/random_joke")
console.log(await response.json());
})

test("mouse" , async()=>{
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.getByText("Point Me").hover();
  await page.locator('//div[@class="dropdown-content"]/a[text()="Mobiles"]').click();
  await page.waitForTimeout(5000);

  await page.locator('//button[text()="Copy Text"]').dblclick();
  expect (await page.locator('#field2').inputValue()).toBe(`${await page.locator('#field1').inputValue()}`);

  await page.locator('#draggable').dragTo(await page.locator('#droppable'));

  expect(await page.locator('//div[@id="droppable"]/p').textContent()).toBe ("Dropped!"); 

  await page.locator('#comboBox').click();
  await page.getByText("Item 18").scrollIntoViewIfNeeded();
  await page.getByText("Item 18").click();
await page.waitForTimeout(5000)
  expect(await page.locator('#comboBox').inputValue()).toBe("Item 18");
})

test("brokenlinks" ,async({request})=>{

  await page.goto("https://testautomationpractice.blogspot.com/#")
 let alllinks =  await page.locator('//h4[text()="Broken Links"]/following-sibling::a').all();
 let links  = new Array() ;
 for(let i = 0 ; i<alllinks.length ; i++){

  links[i] = await alllinks[i].getAttribute("href"); 
 }
 
 await page.waitForTimeout(5000)
let resp = new Array() ;
for ( let i = 0 ; i < links.length ; i++){

   resp[i] = await request.get(links[i])

  if(resp[i].status() !== 200){
    console.log(`Link ${links[i]} is broken with status code ${resp[i].status()}`);
  } 


}


})

test("data" , async() =>{
const wb = XLSX.readFile("G:/VS CODE/Playwright/Test_Data/test_data.xlsx")
const sh = wb.Sheets["Sheet1"]
const data = XLSX.utils.sheet_to_json(sh)

console.log(data[0])

let jsn = fs.readFileSync("G:/VS CODE/Playwright/Test_Data/readwright.json");
let wdt = JSON.parse(jsn)
console.log(JSON.parse(jsn))

fs.writeFileSync("G:/VS CODE/Playwright/Test_Data/created.json", JSON.stringify(wdt))



}
)

test("api" , async({request})=>{

   let resp = await request.get(" https://api.thecatapi.com/v1/breeds" , {headers : { "x-api-key" : "live_baI3AEuZOi0VroPKQ9t5JmmimaGWr9n6GoAaGzHdrF7FG94nJBVU8g9KKj3sGRIg"}})
 // console.log( await resp.json())

  let rep1 = await resp.json();
  // console.log(rep1)
  // console.log(rep1.length)

  console.log("image" in rep1[4])

//   let ll = new Array() ;

//   for ( let i = 0 ; i <rep1.length ; i++){
    

//    console.log(ll)
//     let img = await rep1[i]?.image?.url
// ll.push(img)
//   }
// let lll = new Array();
//   for ( let i = 0 ; i <ll.length ; i++){

//     if(ll[i] !== undefined){
//       lll.push(ll[i])
//     }

//   }

//   for ( let i = 0 ; i <lll.length ; i++){
// await page.goto(lll[i])
//   }





//   fs.writeFileSync("G:/VS CODE/Playwright/Test_Data/catapi.json" , JSON.stringify(await resp.json()))
 })

test("db", async () => {
 // const mysql = await import("mysql2/promise");

 const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'RadhaKrsna@123',
    database: 'company_db',
  });

  const [rows] = await connection.execute(
    'SELECT * FROM employee WHERE emp_id = "3"',
    
  );

  console.log(rows);

  expect(Array.isArray(rows)).toBeTruthy();
  expect((rows as any[]).length).toBeGreaterThan(0);

  await connection.end();
});

