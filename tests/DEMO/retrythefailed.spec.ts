import {test, expect, Browser, BrowserContext , chromium , webkit , firefox} from "@playwright/test";

// we can retry the failed test cases specified number of times
// need to set retries in playwright.config.ts also
// e.g. retries: process.env.CI ? 2 : 0,
// here it is set to 2 on CI and 0 locally
// so when we run tests on CI it will retry 2 times before marking test as failed
// locally it will not retry
// to test this functionality we can set retries to 2 locally also
// e.g. retries: process.env.CI ? 2 : 2, or retries: 2,
// if in the 1st attempt test fails it will retry 2 more times before marking it as failed
// if it passed in retry it will be a flaky test case



       