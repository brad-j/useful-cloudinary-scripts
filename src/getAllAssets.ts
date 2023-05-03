import { stdin } from 'process';
import cloudinary from './client';
import readline from 'readline';
const path = require('path');
var xl = require('excel4node');

var wb = new xl.Workbook();
var ws = wb.addWorksheet('Assets');

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
          ws.cell(i + 1, 1).string(result.public_id);
          ws.cell(i + 1, 2).string(result.format);
          ws.cell(i + 1, 3).string(result.folder);
          ws.cell(i + 1, 4).string(result.secure_url);
        });

        console.log(response.rate_limit_remaining);
        wb.write('assets.xlsx');
      } catch (e) {
        console.log(e);
      }
      next_cursor = response ? response.next_cursor : null;
    } while (next_cursor);
  })();
  rl.close();
});
