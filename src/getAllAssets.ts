import { stdin } from 'process';
import cloudinary from './client';

import readline from 'readline';

let rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('Please enter the asset type (image, video, raw): ');
rl.prompt();
rl.on('line', (assetType) => {
  let response, next_cursor;
  let results = [];

  (async () => {
    do {
      try {
        response = next_cursor
          ? await cloudinary.api.resources({
              resource_type: assetType,
              max_results: 500,
              next_cursor,
            })
          : await cloudinary.api.resources({
              resource_type: assetType,
              max_results: 500,
            });

        const assets = response.resources;

        results.push(...assets);

        results.forEach(async (result, i) => {
          console.log(result);
        });

        console.log(response.rate_limit_remaining);
      } catch (e) {}
      next_cursor = response ? response.next_cursor : null;
    } while (next_cursor);
  })();
  rl.close();
});
