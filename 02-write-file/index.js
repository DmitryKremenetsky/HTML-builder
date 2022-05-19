const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

function closeConsole() {
  stdout.write('Close write place');
  exit();
}

process.on('SIGINT', closeConsole);

const CreateFile = fs.createWriteStream(path.join('./02-write-file/text.txt'));

stdout.write('Hello, u can write your text here!\r\n');
stdin.on('data', (message) => {
  if(message.toString() === 'exit\r\n') {
    closeConsole();
  } else {
    CreateFile.write(message);
  }
});

CreateFile.close();