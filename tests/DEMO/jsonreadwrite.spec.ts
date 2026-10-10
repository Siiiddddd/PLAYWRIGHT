import { test, expect } from '@playwright/test';
import fs from 'fs';

test("json write ", async () => {

    const data = {
        "a": 1,
        "b": 2,
        3: "c",
        array: [1, 2, 3, 4, 5, [1, 4, 5,], { "z": 1, "y": 2 }],
        obj: {
            oobj: {
                "x": 1
            }
        }
    }

    const data2 = {
        "a": 1,
        "b": 2,
        3: "c",
        array: [1, 2, 3, 4, 5, [1, 4, 5,], { "z": 1, "y": 2 }],
        obj: {
            oobj: {
                "x": 1
            }
        }
    }
    const data3 = { data, data2 };

    fs.writeFileSync("Test_Data/readwright.json", JSON.stringify(data3), "utf-8");

    if (!fs.existsSync("Test_Data/created.json")) {
        fs.writeFileSync("Test_Data/created.json", data, "utf-8");
    }

})

test("json read", async () => {

    let data = fs.readFileSync("Test_Data/readwright.json", "utf-8");
    console.log(JSON.parse(data));

    let a = JSON.parse(data)

    console.log(a.data.array[6].z)
})


