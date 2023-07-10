import cloudinary from './client';
import { writeFile } from 'fs/promises';
import { utils, write } from 'xlsx';

interface DataSourceEntry {
  external_id: string;
  value: string;
}

async function getSmdOptions(smd_name: string) {
  try {
    const field = await cloudinary.api
      .metadata_field_by_field_id(smd_name)
      .then((res: any) => {
        const datasource = res.datasource.values;
        return datasource;
      });

    // Prepare data for Excel
    const data: DataSourceEntry[] = field.map((item: any) => ({
      external_id: item.external_id,
      value: item.value,
    }));

    // Convert JSON data to Excel worksheet
    const worksheet = utils.json_to_sheet(data);

    // Create a new workbook and append the worksheet to it
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write workbook to a file
    const fileName = smd_name + '.xlsx';
    const fileBuffer = write(workbook, { bookType: 'xlsx', type: 'buffer' });
    await writeFile(`data/output/${fileName}`, fileBuffer);

    console.log(`Data written to: ${fileName}`);
  } catch (error) {
    console.error('Error fetching metadata fields:', error);
  }
}

getSmdOptions('asset_type');
