import cloudinary from './client';
import fs from 'fs';
import path from 'path';

(async () => {
  const assetsDir = fs.readdirSync(path.join(__dirname, '../assets'));
  const assets = assetsDir.map((asset) =>
    path.join(__dirname, '../assets', asset),
  );
  console.log(assets);
  try {
    assets.map((asset) => {
      cloudinary.uploader
        .upload(asset)
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
    });
  } catch (e) {
    console.log(e);
  }
})();
