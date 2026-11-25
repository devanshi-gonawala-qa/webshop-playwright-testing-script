import * as XLSX from 'xlsx';
export class ExcelReader {
//     static async readExcelFile(filepath: string, sheetName: string) :Promise<any[][]> {
//         const workbook = XLSX.readFile(filepath);
//         const worksheet = workbook.Sheets[sheetName];
//         const data : any[][] = XLSX.utils.sheet_to_json(worksheet, {header : 1})
//         console.log(data)
//         return data;
//     }
// }
static readExcelFile<T = unknown>(filePath: string, sheetName: string): T[][] {
        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[sheetName];
        const data: T[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log(data);

               return data;
    }
      

}