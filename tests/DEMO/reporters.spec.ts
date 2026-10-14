import {test, expect, Browser,Page, BrowserContext , chromium , webkit , firefox} from "@playwright/test";

let browser:Browser;
let context:BrowserContext;
let p:Page;

test.beforeAll("invoke",async({})=>{
    browser = await chromium.launch();
    context= await browser.newContext();
    p=await context.newPage();
});

// in playwright.config.json we can give reporters as "html" or "allure-playwright" or "list" or "json" etc. and we can also give the path where we want to store the report like "reporter": [["html", { "outputFolder": "my-html-report" }]] in playwright.config.json file   
// "reporter": [ ["html",{ "outputFolder": "my-html-report" ,open:"always" }] ] will open the report after execution of test cases
// there is also list reporter which will give the details of test cases in the console and json reporter will give the details in json format and we can use that json file to generate allure report using allure command line tool
// line reporter will give the details of test cases in a single line in the console and it is useful when we have a large number of test cases and we want to see the summary of test cases in the console
// dot reporter will give the details of test cases in a dot format in the console and it is also useful when we have a large number of test cases and we want to see the summary of test cases in the console
// json reporter will give the details of test cases in json format and we can use that json file to generate allure report using allure command line tool
// junit reporter will give the details of test cases in junit format and we can use that junit file to generate allure report using allure command line tool

// Allure report is a third party report and we need to install allure command line tool to generate allure report and we need to give the reporter as "allure-playwright" in playwright.config.json file and we also need to give the path where we want to store the allure report like "reporter": [["allure-playwright", { outputFolder: 'allure-results' }]] in playwright.config.json file and after execution of test cases we can use the command "allure generate allure-results --clean -o allure-report" to generate allure report and "allure open allure-report" to open the allure report 


test("open Url", async ({}) => {
    await p.goto("https://automationtesting.co.uk");
    await expect(p.locator("//h1[text()='Testing Arena']")).toHaveText("Testing Arena1");
});

test("open dropdown page",async ({}) =>{
    await p.locator("//a[text()='DropDown Checkbox Radio']").click();
    await expect(p.locator("//h2[text()='Dropdown Menus, Radio Buttons & Checkboxes']")).toHaveText("Dropdown Menus, Radio Buttons & Checkboxes");
});
test("select value from dropdown",async ({}) =>{

    await p.locator("#cars").selectOption("Ford"); 
    await p.waitForTimeout(2000);
    await p.locator("#cars").selectOption({ value: "mercedes" } ); // via attribute value
    await p.waitForTimeout(2000);
    await p.locator("#cars").selectOption({ index: 4 }); // via index
    await p.waitForTimeout(2000);
    await p.locator("#cars").selectOption({ label: "BMW" });// via visible text
    await p.waitForTimeout(2000);
});

test("store values frm DD",async ({}) =>{

  let a=   await p.locator("#cars").textContent();
  console.log("values from dropdown are: "+a);
  
});