import { readFile } from 'fs/promises';
import { utils, read } from 'xlsx';
import cloudinary from './client';

interface DataSourceEntry {
  external_id: string;
  value: string;
}

async function updateSmdOptions(smd_name: string, fileName: string) {
  try {
    // Read file
    const fileBuffer = await readFile(`data/input/${fileName}`);
    const workbook = read(fileBuffer, { type: 'buffer' });

    // Parse Excel data
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data: DataSourceEntry[] = utils.sheet_to_json(worksheet, {
      header: ['external_id', 'value'],
    });

    // Prepare data for Cloudinary
    const datasourceValues = data.map((item: DataSourceEntry) => ({
      external_id: item.external_id,
      value: item.value,
    }));

    // Update metadata field datasource
    const response = await cloudinary.api.update_metadata_field_datasource(
      smd_name,
      { values: datasourceValues }
    );
    console.log(`Metadata field ${smd_name} datasource updated:`, response);
  } catch (error) {
    console.error('Error updating metadata field datasource:', error);
  }
}

updateSmdOptions('asset_type', 'asset_type.xlsx');
