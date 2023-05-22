import cloudinary from './client';
import { readFile } from 'fs/promises';
import { utils, read } from 'xlsx';

async function readXlsxFile(fileName: string) {
  const buffer = await readFile(fileName);
  const workbook = read(buffer, { type: 'buffer' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  return utils.sheet_to_json(worksheet);
}

async function updateMetadataFieldDatasource(assetExternalId: string, fileName: string) {
  try {
    const data = await readXlsxFile(fileName);

   data.forEach((item: any) => {
    // console.log(item);
      cloudinary.api.update_metadata_field_datasource(assetExternalId, {
        values: [{
            external_id: item.external_id,
            value: item.value,
        }]
      }).then((res: any) => {
        console.log(res);
      }).catch((err: any) => {
        console.log(err);
      });
    });
  } catch (error) {
    console.error('Error updating metadata field datasource:', error);
  }
}

// Use function
updateMetadataFieldDatasource('product_category', 'data/legrand-options.xlsx');
