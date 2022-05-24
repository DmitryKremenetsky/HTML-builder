const fs = require('fs');
const path = require('path');

const CreateTxtfile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(CreateTxtfile, 'utf-8');

stream.on('data', (readdeble) => {
  console.log(readdeble);
});
