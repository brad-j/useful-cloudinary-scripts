import cloudinary from './client';
// import { writeFile } from 'fs/promises';
// import { utils, write } from 'xlsx';

async function listFolders(path: string = '') {
  const res = await cloudinary.api.sub_folders('Vendors');
  const folders = res.folders;

  try {
    folders.forEach((folder: any) => {
      const folderList = folder.path.split('/').slice(1);
      folderList.forEach(async () => {
        await cloudinary.api
          .create_folder(`Vendors/${folderList.join('/')}/OtherMediaTypes`)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      });
    });
  } catch (error) {
    console.error('Error fetching folders:', error);
  }
}

listFolders();
