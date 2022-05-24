const fs = require('fs/promises');
const path = require('path');

const filesCopyDir = path.join(__dirname, 'copy-files');
const filesFolderPath = path.join(__dirname, 'files');

async function main() {
  try {
    await fs.mkdir(filesCopyDir, { recursive: true });

    const copiedFiles = await fs.readdir(filesCopyDir)
    for (const copiedFile of copiedFiles) {
      await fs.unlink(`${filesCopyDir}/${copiedFile}`);
    }

    const files = await fs.readdir(filesFolderPath)
    for (const file of files) {
      await fs.copyFile(`${filesFolderPath}/${file}`, `${filesCopyDir}/${file}`);
    }
  } catch (e) {
    console.log(e)
  }
}

main()