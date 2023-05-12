import cloudinary from './client';

// List of folders to exclude from deletion
const excludeFolders = ['ugc', 'cld_system_files', 'samples', 'Vendors']; // Replace these with your actual folder names

async function deleteRootFolders() {
  try {
    // Fetch root folders
    const res = await cloudinary.api.root_folders();

    // Loop over each folder
    for (const folder of res.folders) {
      // Check if the folder is in the exclude list
      if (!excludeFolders.includes(folder.name)) {
        // Recursively delete sub-folders
        await deleteSubFolders(folder.name);

        // Delete the current folder
        await cloudinary.api.delete_folder(folder.name);
        console.log(`Deleted folder: ${folder.name}`);
      } else {
        console.log(`Skipped folder: ${folder.name}`);
      }
    }
  } catch (error) {
    console.error('Error deleting folders:', error);
  }
}

async function deleteSubFolders(path: string) {
  try {
    // Fetch sub-folders of the current path
    const res = await cloudinary.api.sub_folders(path);

    // Loop over each sub-folder
    for (const folder of res.folders) {
      const fullPath = `${path}/${folder.name}`;

      // Check if the folder is in the exclude list
      if (!excludeFolders.includes(fullPath)) {
        // Recursively delete sub-folders
        await deleteSubFolders(fullPath);

        // Delete the current folder
        await cloudinary.api.delete_folder(fullPath);
        console.log(`Deleted folder: ${fullPath}`);
      } else {
        console.log(`Skipped folder: ${fullPath}`);
      }
    }
  } catch (error) {
    console.error('Error deleting folders:', error);
  }
}

deleteRootFolders();
