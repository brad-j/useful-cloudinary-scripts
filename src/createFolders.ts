import cloudinary from './client';
import * as xlsx from 'xlsx';

// Read the xlsx file
const workbook = xlsx.readFile('data/cswg-vendors.xlsx');
const sheet_name_list = workbook.SheetNames;
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

data.forEach((row: any) => {
  cloudinary.api.create_folder(
    `Vendors/${row.folder_name}/UPCProductImages`,
    (error: any, result: any) => {
      console.log(result);
    },
  );
});
