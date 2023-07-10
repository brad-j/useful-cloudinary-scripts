import cloudinary from './client';

async function deleteSubFolders(path: string) {
  try {
    // Fetch sub-folders of the current path
    const res = await cloudinary.api.sub_folders(path);

    res.folders.forEach(async (folder: any) => {
      const thing = await cloudinary.api.sub_folders(folder.path);
      thing.folders.forEach(async (subFolder: any) => {
        cloudinary.api
          .delete_folder(subFolder.path)
          .then((res) => {
            console.log(`Deleted ${subFolder.path}`);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  } catch (error) {
    console.error('Error deleting folders:', error);
  }
}

deleteSubFolders('test');
