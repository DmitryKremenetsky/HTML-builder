const fs = require('fs/promises');
const path = require('path');
 
const createCopyDir = path.join(__dirname, 'copy-files');
const addFolderCopy = path.join(__dirname, 'files');

async function main() {
  try {
    await fs.mkdir(createCopyDir, {recursive: true});

    const copiedFiles = await fs.readdir(createCopyDir);
    for (const copiedFile of copiedFiles) {
      await fs.unlink(`${createCopyDir}/${copiedFile}`);
    }

    const files = await fs.readdir(addFolderCopy);
    for (const file of files) {
      await fs.copyFile(`${addFolderCopy}/${file}`, `${createCopyDir}/${file}`);
    }
  } catch (err) {
    console.log(err);
  }
} 

main();