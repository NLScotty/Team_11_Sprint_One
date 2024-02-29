const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
const { folders, configjson, tokenjson } = require('./models/templates');

const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('cli', (command) => {
    const d = new Date();
    if(DEBUG) console.log(`Command line interface event: '${command}' at ${d}`);
    if(!fs.existsSync(path.join(__dirname, 'logs'))) {
      fs.mkdirSync(path.join(__dirname, 'logs'));
    }
    fs.appendFile(path.join(__dirname, 'logs', d.getDay()+'-'+d.getMonth()+'-'+d.getFullYear()+'-cli.log'), `Route Event on: ${command} at ${d}\n`, (error) => {
      if(error) throw error;
    });
});

function createFolders() {
  if(DEBUG) console.log('init.createFolders()');
  let mkcount = 0;
  folders.forEach(element => {
      if(DEBUG) console.log(element);
      try {
          if(!fs.existsSync(path.join(__dirname, element))) {
              fsPromises.mkdir(path.join(__dirname, element));
              mkcount++;
          }
      } catch (err) {
          console.log(err);
      }
  });
  if(mkcount === 0) {
      console.log('All folders already exist.');
  } else if (mkcount <= folders.length) {
      console.log(mkcount + ' of ' + folders.length + ' folders were created.');
 } else {
      console.log('All folders successfully created.');
  }
};

function createFiles() {
  if(DEBUG) console.log('init.createFiles()');
  try {
      let configdata = JSON.stringify(configjson, null, 2);
      if(!fs.existsSync(path.join(__dirname, './json/config.json'))) {
          fs.writeFile('./json/config.json', configdata, (err) => {
              if(err) {
                  console.log(err)
              }
              else {
                  console.log('Data written to config file.');
              }
          })
      } else {
        console.log('config file already exists.');
      }
      let tokendata = JSON.stringify(tokenjson, null, 2);
      if(!fs.existsSync(path.join(__dirname, './json/tokens.json'))) {
        fs.writeFile('./json/tokens.json', tokendata, (err) => {
          if(err) {
            console.log(err)
          } else {
            console.log('Data written to tokens file.');
          }
        }
        );
    } else {
      console.log('token file already exists.');
    }
     
  } catch(err) {
      console.log(err);
  }
};

const myArgs = process.argv.slice(2);

function initializeApp() {
    if(DEBUG) console.log('initializeApp()');

    switch (myArgs[1]) {
    case '--all':
        if(DEBUG) console.log('--all createFolders() & createFiles()');
        myEmitter.emit('cli', 'init --all');
        createFolders();
        createFiles();
        break;
    case '--cat':
        if(DEBUG) console.log('--cat createFiles()');
        myEmitter.emit('cli', 'init --cat');
        createFiles();
        break;
    case '--mk':
        if(DEBUG) console.log('--mk createFolders()');
        myEmitter.emit('cli', 'init --mk');
        createFolders();
        break;
    case '--help':
    case '--h':
    default:
        fs.readFile(__dirname + "/usage.txt", (error, data) => {
            if(error) throw error;              
            console.log(data.toString());
        });
    }
}

module.exports = {
    initializeApp,
  }