import {expect ,test, Page , request, BrowserContext , Browser , chromium} from "@playwright/test"
import {TeleChat} from "../Pages/teleBot"

let browser : Browser ;
let context : BrowserContext ;
let page : Page ;

test.beforeAll("ini",async()=>{

    browser = await chromium.launch();
    context = await browser.newContext();
    page  = await context.newPage();
})

test("send joke" , async({request}) =>{

     let response = await request.get("https://official-joke-api.appspot.com/random_joke")
  console.log(await response.json());
let a=new TeleChat()
  if(await response.status() == 200){
    let b = await response.body()
   a.sendMessage(String(b))
  }

})