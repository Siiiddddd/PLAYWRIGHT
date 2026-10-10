import {
  test,
  expect,
  Browser,
  chromium,
  BrowserContext,
  Page,
  request,
} from "@playwright/test";

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.describe("ui", async () => {
  test.beforeAll("ini", async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
  });
});

test.describe("API", () => {
  test("apitry", async ({ request }) => {
    // let a = await request.get("https://meowfacts.herokuapp.com/?count=5");
    // console.log(a)

    // console.log(a.status() ,await a.json() , await a.text() , await a.statusText())

    // let b = await request .get("https://dog.ceo/api/breeds/list/all");

    // console.log(await b.json())

    //      let c = await request.get("https://dog.ceo/api/breeds/image/random ");

    //      console.log(await c.json())
    // let d = await c.json()
    //     console.log( JSON.stringify(d) , d["message"] )

    let page : Page =await(await(await chromium.launch()).newContext()).newPage()
    //     let e = await request.get( d["message"])

    //     await page.goto(d["message"])

    let allbreedlistreq = await request.get(
      "https://dog.ceo/api/breeds/list/all",
    );

    //console.log(await allbreedlistreq.json())

    let breedlist = await allbreedlistreq.json();
    let a = breedlist["message"];
    let b = Object.keys(a);

    let alllinkslist = [];
    for (let i = 0; i < b.length; i++) {
      let breedlinks = await request.get(
        `https://dog.ceo/api/breed/${b[i]}/images`,
      );

      let breedresp = (await breedlinks.json())["message"];

      alllinkslist.push(breedresp);
    }

    console.log(alllinkslist);

    for(let i = 0 ; i<alllinkslist.length ; i++){
        for(let j = 0 ; j<alllinkslist[i].length ; j++){

        await page.goto(alllinkslist[i][j])

        await page.waitForTimeout(3000)



    }}



  });
});
