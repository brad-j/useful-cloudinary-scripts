import cloudinary from './client';
import { writeFile } from 'fs/promises';
import { utils, write } from 'xlsx';

interface StructuredMetadataField {
  label: string;
  type: string;
  values?: string[];
}

interface StructuredMetadataField {
  label: string;
  type: string;
  values?: string[];
}

interface EnumSetValue {
  parentLabel: string;
  value: string;
}

async function fetchMetadataFields(): Promise<void> {
  try {
    const response = await cloudinary.api.list_metadata_fields();

    const metadata: StructuredMetadataField[] = [];
    const enumSetValues: EnumSetValue[] = [];

    response.metadata_fields.forEach((field: any) => {
      metadata.push({
        label: field.label,
        type: field.type,
      });

      if (field.type === 'enum' || field.type === 'set') {
        field.datasource.values.forEach((value: any) => {
          enumSetValues.push({
            parentLabel: field.label,
            value: value.value,
          });
        });
      }
    });

    console.log('Fetched metadata fields:', metadata);

    const metadataWorksheet = utils.json_to_sheet(metadata);
    const enumSetValuesWorksheet = utils.json_to_sheet(enumSetValues);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, metadataWorksheet, 'MetadataFields');
    utils.book_append_sheet(workbook, enumSetValuesWorksheet, 'EnumSetValues');

    const fileName = 'smd.xlsx';
    const fileBuffer = write(workbook, { bookType: 'xlsx', type: 'buffer' });
    await writeFile(fileName, fileBuffer);
    console.log(`Metadata fields written to: ${fileName}`);
  } catch (error) {
    console.error('Error fetching metadata fields:', error);
  }
}

fetchMetadataFields();
