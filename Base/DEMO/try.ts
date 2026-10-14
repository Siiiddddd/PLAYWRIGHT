import { test , expect } from "@playwright/test";



class Base {

    hello() {
        console.log("hello")
    }
    arrow = () => {
        console.log("hello arrow function")
    }
}


export const base = new Base();