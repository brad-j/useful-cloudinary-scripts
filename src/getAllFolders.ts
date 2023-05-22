import cloudinary from './client';

async function listFolders(path: string = '') {
  try {
    const res = path
      ? await cloudinary.api.sub_folders(path)
      : await cloudinary.api.root_folders();

    res.folders.forEach((folder: any) => {
      const fullPath = path ? `${path}/${folder.name}` : folder.name;
      
      console.log(fullPath);

      listFolders(fullPath);
    });
  } catch (error) {
    console.error('Error fetching folders:', error);
  }
}

listFolders();
