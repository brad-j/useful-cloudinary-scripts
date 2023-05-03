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

### `run:get-all-assets`

<span style="font-size:12px; color: light-gray>(Path: `./src/get-all-assets.ts`)</span>

#### What it does:

This script exports all assets from a cloudinary sub-account. Today, the CSV will include the Public Id and Secure URL. This script includes a prompt where you will need to enter the [resource type](https://cloudinary.com/documentation/admin_api#get_resources) you want to fetch. The resource types are: `image`, `video`, or `raw`

### TODO

- [ ] Error handling/reporting
- [ ] Allow users to choose which fields to include in the CSV
- [ ] Allow the naming of the data file
- [ ] Allow users to choose CSV or Excel
