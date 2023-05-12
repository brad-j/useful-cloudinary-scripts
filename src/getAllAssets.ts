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

        ws.cell(1, 1).string('asset_id');
        ws.cell(1, 2).string('public_id');
        ws.cell(1, 3).string('folder');
        ws.cell(1, 4).string('format');
        ws.cell(1, 5).string('resource_type');
        ws.cell(1, 6).string('created_at');
        ws.cell(1, 7).string('bytes');
        ws.cell(1, 8).string('width');
        ws.cell(1, 9).string('height');
        ws.cell(1, 10).string('secure_url');

        results.forEach(async (result, i) => {
          console.log(result);

          ws.cell(i + 2, 1).string(result.asset_id);
          ws.cell(i + 2, 2).string(result.public_id);
          ws.cell(i + 2, 3).string(result.folder);
          ws.cell(i + 2, 4).string(result.format);
          ws.cell(i + 2, 5).string(result.resource_type);
          ws.cell(i + 2, 6).date(result.created_at);
          ws.cell(i + 2, 7).number(result.bytes);
          ws.cell(i + 2, 8).number(result.width);
          ws.cell(i + 2, 9).number(result.height);
          ws.cell(i + 2, 10).string(result.secure_url);
        });

        console.log(response.rate_limit_remaining);
        wb.write('images.xlsx');
      } catch (e) {
        console.log(e);
      }
      next_cursor = response ? response.next_cursor : null;
    } while (next_cursor);
  })();
  rl.close();
});
