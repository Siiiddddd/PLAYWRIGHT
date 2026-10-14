import {    test, expect} from '@playwright/test';


    //screenshot
    /*
    To take a screenshot after every test, we need to set it in the playwright.config.ts file   
    use: {
      screenshot: 'on',
    }
    */

    //video
    /*
    To enable video recording, we need to set it in the playwright.config.ts file
    use: {
      video: 'on',
    }
    */
    //trace
    /*
    To enable trace, we need to set it in the playwright.config.ts file
    use: {
      trace: 'on',
    }
    */
    // After the test execution, go to the 'test-results' folder and open the trace file in the Playwright Trace Viewer.