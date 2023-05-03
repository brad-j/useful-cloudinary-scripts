# Useful Cloudinary Scripts

This is a colleciton of useful scripts for working with Cloudinary.

First, install [pnpm](https://pnpm.js.org/en/installation) and then run `pnpm install` to install the dependencies. It should be possible to use `npm` or `yarn` instead, but I haven't tested it.

## Usage

Each script can be run with `pnpm run:<script-name>`

## Scripts

### `run:get-all-assets`

_(Path: `./src/get-all-assets.ts`)_

This script will fetch all assets from your Cloudinary account and save them to a CSV file. It will also save a CSV file with the Public ID and Secure URL. This script has a prompt where you will need to enter the [resource type](https://cloudinary.com/documentation/admin_api#get_resources) you want to fetch. The resource types are: `image`, `video`, or `raw`

### TODO

- [ ] Allow users to choose which fields to include in the CSV
- [ ] Allow the naming of the data file
- [ ] Allow users to choose CSV or Excel
