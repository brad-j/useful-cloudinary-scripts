import * as dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  account_id: process.env.CLOUDINARY_ACCOUNT_ID,
  provisioning_api_key: process.env.CLOUDINARY_PROVISIONING_API_KEY,
  provisioning_api_secret: process.env.CLOUDINARY_PROVISIONING_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
