import cloudinary from './client';

async function getOneFolder() {
    const folder = 'Vendors';

    try {
        const res = await cloudinary.api.sub_folders(folder);
        const subFolders = res.folders;

        for(const subFolder of subFolders) {
            try {
                const folderName = subFolder.name;
                const creationRes = await cloudinary.api.create_folder(`Vendors/${folderName}/Images`);
                console.log(creationRes);
            } catch (err) {
                console.error('Error creating folder:', err);
            }
        }
    } catch (error) {
        console.error('Error fetching folders:', error);
    }
}

getOneFolder();
