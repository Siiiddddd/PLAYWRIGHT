
//apogeoapi_live_pGV3vENp0RIz3BcOIJ9aYj5Ulbwie7pZ
// HI ITS NOT IMPORTANT 
import {
  test,
  expect,
  request,
  APIRequestContext
} from "@playwright/test";

let res: APIRequestContext;

test.beforeAll(async () => {
  res = await request.newContext({
    ignoreHTTPSErrors: true
  });;
});

test("api", async () => {

  const firstCheck = await res.get(
    "https://api.apogeoapi.com/v1/countries",
    {
      headers: {
        "X-API-Key": "apogeoapi_live_pGV3vENp0RIz3BcOIJ9aYj5Ulbwie7pZ"
      }
    }
  );

  expect(firstCheck.ok()).toBeTruthy();

  const body = await firstCheck.json();

  console.log(body);
});


