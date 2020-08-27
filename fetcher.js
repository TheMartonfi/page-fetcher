// node fetcher.js http://www.example.edu/ ./data/index.html

const request = require('request');
const fs = require('fs');
const readline = require('readline');

const url = process.argv[2];
const path = process.argv[3];

const requesting = (done) => {
  request(url, (err, response, body) => {

    if (err) {
      return console.log(`The url '${url}' is not valid please try again.\n`);
    } else {
      done(body);
    }
    
  });
};

const overWrite = (done) => {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(`The file already exists do you want to overwrite? Press Y + Enter to proceed.\n`, (answer) => {
    if (answer === 'Y') {
      rl.close();
      done();
    } else {
      rl.close();
      return console.log('Invalid input the application will now close.\n');
    }
  });
};

if (fs.existsSync(path)) {
  overWrite(() => {
    requesting((data) => {
      fs.writeFile(path, data, (err) => {

        if (err) {
          return console.log(err);
        } else {
          console.log(`Downloaded and saved ${fs.statSync(path).size} amount of bytes to ${path}\n`);
        }

      });
    });
  });

} else {
  return console.log(`The path '${path}' is not valid please try again.\n`);
}