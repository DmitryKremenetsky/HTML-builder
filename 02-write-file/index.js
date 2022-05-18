const fs = require('fs');
const path = require('path');
const process = require('process');

const fileName = fs.createWriteStream(path.join('./02-write-file/text.txt'));

process.stdout.write('Hello, u can write your text here!');
process.stdin.on('data', (message) => {
  if(message.toString() === 'exit') {
    closeConsole();
  } else {
    fileName.write(message);
  }
});

function closeConsole() {
  process.stdout.write('Close write place');
  process.exit();
}

process.on('SIGINT', closeConsole);