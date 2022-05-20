const fs = require('fs');
const path = require('path');
 
const createCopyDir = path.join(__dirname, 'copy-files');
const addFolderCopy = path.join(__dirname, 'files');

fs.promises.mkdir(createCopyDir, {recursive: true});

fs.readdir(addFolderCopy, (err, files) => {
  if (err) {
    console.log(err);
  } 

  for (let i = 0; i < files.length; i++) {
    fs.copyFile(addFolderCopy + '/' + files[i], createCopyDir + '/' + files[i], err => {
      if (err) {
        console.log(err);
      }
    });
  }
});