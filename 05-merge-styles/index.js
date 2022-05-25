const fs = require('fs');
const path = require('path');

const createBundle = path.join(__dirname, 'project-dist', 'bundle.css');
const styleComponent = path.join(__dirname, 'styles');
let writeStream = fs.createWriteStream(createBundle);

fs.readdir(styleComponent, (err, files) => {
  files.forEach(file => {
    if (path.extname(file, err) == '.css') {
      if (err) {
        console.log(err); 
      } else {
        const newBundle = path.join(__dirname, 'styles', file);
        const stream = fs.createReadStream(newBundle);
        stream.on('data', (chunk , err) => {
          if (err) {
            console.log(err);
          }
          writeStream.write(chunk);
          writeStream.write('\r\n');
        });
      }
    }
  });

  console.log('Bundle is create');
});
