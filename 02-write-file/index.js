const fs = require('fs');
const path = require('path');

fs.writeFile('./02-write-file/text.txt', ' ', (err) => {
  if(err) {
    throw err;
  }
});