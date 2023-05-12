import cloudinary from './client';

async function deleteSubFolders(path: string) {
  try {
    // Fetch sub-folders of the current path
    const res = await cloudinary.api.sub_folders(path);

    // Loop over each sub-folder
    for (const folder of res.folders) {
      const fullPath = `${path}/${folder.name}`;

      // Recursively delete sub-folders
      await deleteSubFolders(fullPath);

      // Delete the current folder
      await cloudinary.api.delete_folder(fullPath);
      console.log(`Deleted folder: ${fullPath}`);
    }
  } catch (error) {
    console.error('Error deleting folders:', error);
  }
}

deleteSubFolders('Vendors');
