const fs = require('fs'); 
const path = require('path');

const createDirBundelPath = path.join(__dirname, 'project-dist');
const createStylesBundel = path.join(__dirname, 'project-dist', 'style.css');
const copyDirAssets = path.join(__dirname, 'assets');
const createDistPathAssets = path.join(__dirname, 'project-dist', 'assets');
const copyStylesPath = path.join(__dirname, 'styles');
const componentsHTMLPage = path.join(__dirname, 'components');
const copyHTMLPath = fs.createReadStream('./06-build-page/template.html');

let writeStyleStream = fs.createWriteStream(createStylesBundel);

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

async function creteHtmlPage() {
  const createHTMLBundel = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
  copyHTMLPath.on('data', (chunk) => {
    let templateString = chunk.toString();
    
    fs.readdir(componentsHTMLPage, {
      withFileTypes: true
    }, (err, files) => {
      if (err) throw err;
      files.forEach((file, i) => {
        if (file.isFile() && path.parse(file.name).ext === '.html') {
          const readComponents = fs.createReadStream(path.join(__dirname, 'components', file.name));
          const nameComponents = path.parse(file.name).name;
          const componentsObjecName = `{{${nameComponents}}}`;
          readComponents.on('data', (chunk) => {
            templateString = templateString.replace(componentsObjecName, chunk.toString());
            if (i === files.length - 1) {
              createHTMLBundel.write(templateString);
            }
          });
        }
      });
    });
  });
}

creteHtmlPage(console.log('Folder Project dist is Created'));
