import cloudinary from './client';

async function getUsers() {
  try {
    const res = await cloudinary.provisioning.account.users(true);
    console.log(res);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

getUsers();