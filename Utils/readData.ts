
import * as fs from 'fs';
import * as path from 'path';
import xlsx from 'xlsx';

export function readExcelFile(filePath: string , sheetName : string , rowval :any) :any {

// read excel file from path readFiles
// read sheet Sheets
// convert sheet to JSON
// find the row value 
// get the json of that row

    const workbook = xlsx.readFile(filePath);
    let sheet = workbook.Sheets[sheetName];
    if (!sheet) throw new Error(`Sheet "${sheetName}" not found in ${filePath}`);
    let xltojson = xlsx.utils.sheet_to_json<Record<string, any>>(sheet);
    console.log(xltojson[0]?.TEST_ID);
    let rowID: number | undefined;
    for (let i = 0; i < xltojson.length; i++){
    if (xltojson[i]?.TEST_ID === rowval)
        rowID = i;
}
    let row  = rowID !== undefined ? xltojson[rowID] : undefined;
    return row;
    
}

export function readJsonFile(filePath: string): any {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
}       

