import cloudinary from './client';

async function listFolders(path: string = '') {
  try {
    // Fetch root or sub-folders depending on the path
    const res = path
      ? await cloudinary.api.sub_folders(path)
      : await cloudinary.api.root_folders();

    // Log current folders
    res.folders.forEach((folder: any) => {
      const fullPath = path ? `${path}/${folder.name}` : folder.name;
      console.log(fullPath);

      // Recursively fetch sub-folders
      listFolders(fullPath);
    });
  } catch (error) {
    console.error('Error fetching folders:', error);
  }
}

listFolders();
