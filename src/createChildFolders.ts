import cloudinary from './client';

async function getFolders() {
  const folders = await cloudinary.api
    .sub_folders('Vendors')
    .then((res) => {
      const folders = res.folders;
      folders.forEach(async (folder: any) => {
        await cloudinary.api.create_folder('Metadataparser');
      });
    })
    .catch((err) => console.log(err));
  console.log(folders);
}

getFolders();
