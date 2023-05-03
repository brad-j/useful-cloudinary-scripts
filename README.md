# Useful Cloudinary Scripts

This is a colleciton of useful scripts for working with Cloudinary.

First, install [pnpm](https://pnpm.js.org/en/installation) and then run `pnpm install` to install the dependencies. It should be possible to use `npm` or `yarn` instead, but I haven't tested it.

All of the scripts utilize the `src/client.ts` file to create the cloudinary client. You will need to create a `.env` file in the root of the project and add the following:

```ts
CLOUDINARY_CLOUD_NAME=<your cloud name>
CLOUDINARY_API_KEY=<your api key>
CLOUDINARY_API_SECRET=<your api secret>
```

## Usage

Each script can be run with `pnpm run:<script-name>`

## Scripts

### `run:get-all-assets` [Admin API](https://cloudinary.com/documentation/admin_api)

(Path: `./src/get-all-assets.ts`)

#### What it does:

This script exports all assets from a cloudinary sub-account. Today, the xlsx will include public*id, format, folder, and secure url. This script includes a prompt where you will need to enter the [resource type](https://cloudinary.com/documentation/admin_api#get_resources) you want to fetch. The resource types are: `image`, `video`, or `raw`
\_Note that the raw resource type will not return a format*

`assets.xlsx` will be saved in the root of the project.

### TODO

- [ ] Error handling/reporting
- [ ] Allow users to choose which fields to include in the file
- [ ] Allow the naming of the data file
- [ ] Allow users to choose CSV or Excel

---

### `run:upload-assets` [Upload API](https://cloudinary.com/documentation/image_upload_api_reference)

(Path: `./src/upload-assets.ts`)

#### What it does:

This script uploads assets to a cloudinary sub-account. Currently, there needs to be a `./assets` directory that contains the assets to be uploaded.
