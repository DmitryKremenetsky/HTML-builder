const fs = require('fs'); 
const path = require('path');

const createDirBundelPath = path.join(__dirname, 'project-dist');
const createStylesBundel = path.join(__dirname, 'project-dist', 'styles.css');
const createHTMLBundel = path.join(__dirname, 'project-dist', 'index.html');
const copyDirAssets = path.join(__dirname, 'assets');
const createDistPathAssets = path.join(__dirname, 'project-dist', 'assets');
const copyStylesPath = path.join(__dirname, 'styles');
let writeStyleStream = fs.createWriteStream(createStylesBundel);

const copyHTMLPath = fs.readFileSync('./06-build-page/template.html', 'utf-8');

fs.promises.mkdir(createDirBundelPath, {recursive: true});

fs.readdir(copyStylesPath, (err, files) => {
  files.forEach(file => {
    if (path.extname(file, err) == '.css') {
      if (err) {
        console.log(err); 
      } else {
        const newStylesPath = path.join(__dirname, 'styles', file);
        const stream = fs.createReadStream(newStylesPath);
        stream.on('data', (chunk , err) => {
          if (err) {
            console.log(err);
          }
          writeStyleStream.write(chunk);
        });
      }
    }
  });

  console.log('Path Styles is create');
});

fs.writeFile(createHTMLBundel, copyHTMLPath, (err) => {
  if (err) {
    throw err;
  }
});

async function copyDir(copyDirAssets, createDistPathAssets) {
  await fs.promises.mkdir(createDistPathAssets, {
    recursive: true
  });

  const files = await fs.promises.readdir(copyDirAssets, {
    withFileTypes: true
  });

  files.forEach(async (file) => {
    if (file.isFile()) {
      const oldFile = path.join(copyDirAssets, file.name);
      const newFile = path.join(createDistPathAssets, file.name);
      await fs.promises.copyFile(oldFile, newFile);
    } else {
      copyDir(path.join(copyDirAssets, file.name), path.join(createDistPathAssets, file.name));
    }
  });
}

copyDir(copyDirAssets, createDistPathAssets);