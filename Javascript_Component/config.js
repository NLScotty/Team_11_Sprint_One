const fs = require('fs');
const path = require('path');
const myArgs = process.argv.slice(2);

const { configjson } = require('./models/templates');

const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('cli', (command) => {
    const d = new Date();
    if(DEBUG) console.log(`Command line interface event at: '${command}' at ${d}`);
    if(!fs.existsSync(path.join(__dirname, 'logs'))) {
      fs.mkdirSync(path.join(__dirname, 'logs'));
    }
    fs.appendFile(path.join(__dirname, 'logs', d.getDay()+'-'+d.getMonth()+'-'+d.getFullYear()+'-cli.log'), `Route Event on: ${command} at ${d}\n`, (error) => {
      if(error) throw error;
    });
});


function displayConfig() {
    if(DEBUG) console.log('config.displayConfig()');
    fs.readFile(__dirname + "/json/config.json", (error, data) => {
        if(error) throw error; // should write a log event for the error, github issue #7    
        console.log(JSON.parse(data));
    });
}

function resetConfig() {
    if(DEBUG) console.log('config.resetConfig()');
    let configdata = JSON.stringify(configjson, null, 2);
    // if(DEBUG) console.log(__dirname + './json/config.json');
    // if(DEBUG) console.log(configdata);
    fs.writeFile(__dirname + '/json/config.json', configdata, (error) => {
        if(error) throw error;   // issue #7 also applies here
        if(DEBUG) console.log('Config file reset to original state');
     });
}

function setConfig() {
    if(DEBUG) console.log('config.setConfig()');
    if(DEBUG) console.log(myArgs);

    let match = false;
    fs.readFile(__dirname + "/json/config.json", (error, data) => {
        if(error) throw error;         
        if(DEBUG) console.log(JSON.parse(data));
        let cfg = JSON.parse(data);
        for(let key of Object.keys(cfg)){
            if(DEBUG) console.log(`K E Y: ${key}`);
            if(key === myArgs[2]) {
                cfg[key] = myArgs[3];
                match = true;
            }
        }
        if(!match) {
            console.log(`invalid key: ${myArgs[2]}, try another.`)
       }
        if(DEBUG) console.log(cfg);
        data = JSON.stringify(cfg, null, 2);
        // looks like this code is writing the file again even if there is
        fs.writeFile(__dirname + '/json/config.json', data, (error) => {
            if (error) throw error;
            if(DEBUG) console.log('Config file successfully updated.');
        });
    });
}

function configApp() {
  if(DEBUG) console.log('configApp()');

  switch (myArgs[1]) {
  case '--show':
      if(DEBUG) console.log('--show');
      myEmitter.emit('cli', 'config --show');
      displayConfig();
      break;
  case '--reset':
      if(DEBUG) console.log('--reset');
      myEmitter.emit('cli', 'config --reset');
      resetConfig();
      break;
  case '--set':
      if(DEBUG) console.log('--set');
      myEmitter.emit('cli', 'config --set');
      setConfig();
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
  configApp,
}