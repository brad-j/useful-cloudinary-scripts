import cloudinary from './client';

async function listFolders() {
  try {
    const folders = await cloudinary.api.sub_folders('Vendors').then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });

  } catch (error) {
    console.error('Error fetching folders:', error);
  }
}

listFolders();
