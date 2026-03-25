import {test, expect, Browser,Page, BrowserContext , chromium , webkit , firefox} from "@playwright/test";

let browser:Browser;
let context:BrowserContext;
let p:Page;

test.beforeAll("invoke",async({})=>{
    browser = await chromium.launch();
    context= await browser.newContext();
    p=await context.newPage();
});

test("open Url", async ({}) => {
    await p.goto("https://automationtesting.co.uk");
    await expect(p.locator("//h1[text()='Testing Arena']")).toHaveText("Testing Arena");
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

    // select by value, index, label
    // await p.locator("#cars").selectOption({ label: "Volvo" });
    // only if it had label attribute
   
});

test("store values frm DD",async ({}) =>{

  let a=   await p.locator("#cars").textContent();
  console.log("values from dropdown are: "+a);
    
   
});

