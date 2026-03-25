
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';   
export function readExcelFile(filePath: string): any[] {

        const workbook = XLSX.readFile(filePath);

        function readSheet(sheetName: string): any[] {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            return jsonData;
        }

        const sheetNames = workbook.SheetNames;
        let allData: any[] = [];    
        for (const sheetName of sheetNames) {
            const sheetData = readSheet(sheetName);
            allData = allData.concat(sheetData);
        }   

        return allData;     

}
export function readJsonFile(filePath: string): any {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
}       

