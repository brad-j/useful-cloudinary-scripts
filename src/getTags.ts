import cloudinary from './client';

(async () => {
  let response, next_cursor;
  let results = [];

  do {
    try {
      response = next_cursor
        ? await cloudinary.api.tags({ max_results: 500, next_cursor })
        : await cloudinary.api.tags({ max_results: 500 });
      results.push(...response.tags);
    } catch (error) {
      console.error(error);
    }
    next_cursor = response ? response.next_cursor : null;
  } while (next_cursor);
  console.log(results);
  console.log(results.length);
})();
