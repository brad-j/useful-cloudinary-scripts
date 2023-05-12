import cloudinary from './client';
import * as xlsx from 'xlsx';

interface Result {
  char: string;
  index: number;
}

interface Folder {
  folderName: string;
  char: string;
  index: number;
}

(async () => {
  let folders: Folder[] = [];

  const workbook = xlsx.readFile('data/cswg-vendors.xlsx'); // replace with your xlsx file path
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(worksheet);

  data.map((folder: any) => {
    const folderName = folder.folder_name;
    const hyphenIndex = folderName.indexOf('-');
    if (hyphenIndex !== -1) {
      const charAfterHyphen = folderName.charAt(hyphenIndex + 1);
      folders.push({
        folderName: folderName,
        char: charAfterHyphen,
        index: hyphenIndex,
      });
    } else {
      folders.push({
        folderName: folderName,
        char: 'No hyphen found',
        index: hyphenIndex,
      });
    }
  });

  folders.sort((a: Folder, b: Folder) => {
    const aSubstring = a.folderName.substring(a.index + 1);
    const bSubstring = b.folderName.substring(b.index + 1);
    if (aSubstring < bSubstring) {
      return -1;
    }
    if (aSubstring > bSubstring) {
      return 1;
    }
    return 0;
  });

  console.log(folders);

  for (let folder of folders) {
    try {
      await cloudinary.api
        .create_folder(`Vendors/${folder.folderName}/Product Images`)
        .then((result: any) => console.log(result))
        .catch((error: any) => console.error(error));
    } catch (error) {
      console.error(`Failed to create folder ${folder.folderName}:`, error);
    }
  }
})();
