# Useful Cloudinary Scripts

This is a colleciton of useful scripts for working with Cloudinary.

First, install [pnpm](https://pnpm.js.org/en/installation) and then run `pnpm install` to install the dependencies. It should be possible to use `npm` or `yarn` instead, but I haven't tested it.

Next, create a `.env` file in the root of the project and add the following:

```
CLOUDINARY_CLOUD_NAME=process.env.CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=process.env.CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=process.env.CLOUDINARY_API_SECRET
```

## Usage

Each script can be run with `pnpm run:<script-name>`

## Scripts

### `run:get-all-assets` [Admin API](https://cloudinary.com/documentation/admin_api)

(Path: `./src/get-all-assets.ts`)

#### What it does:

This script exports all assets from a cloudinary sub-account. Today, the xlsx will include public*id, format, folder, and secure_url. This script includes a prompt where you will need to enter the [resource type](https://cloudinary.com/documentation/admin_api#get_resources) you want to fetch. The resource types are: `image`, `video`, or `raw`
\_Note that the raw resource type will not return a format*

`assets.xlsx` will be saved in the root of the project.

### TODO

- [ ] Error handling/reporting
- [ ] Allow users to choose which fields to include in the file
- [ ] Allow the naming of the data file
- [ ] Allow users to choose CSV or Excel
