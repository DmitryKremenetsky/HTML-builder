const fs = require('fs');
const path = require('path');

const createBundel = path.join(__dirname, 'project-dist', 'bundel.css');
const styleComponent = path.join(__dirname, 'styles');
let writeStream = fs.createWriteStream(createBundel);

fs.readdir(styleComponent, (err, files) => {
  files.forEach(file => {
    if (path.extname(file, err) == '.css') {
      if (err) {
        console.log(err); 
      } else {
        const newBundel = path.join(__dirname, 'styles', file);
        const stream = fs.createReadStream(newBundel);
        stream.on('data', (chunk , err) => {
          if (err) {
            console.log(err);
          }
          writeStream.write(chunk);
        });
      }
    }
  });

  console.log('bundel is create');
});
