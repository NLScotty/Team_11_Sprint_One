global.DEBUG = false;
const path = require('path');
const fs = require("fs");

const { initializeApp } = require('./init.js');
const { configApp } = require('./config.js');
const { tokenApp } = require('./token.js');
const { serverApp } = require('./server.js');

//retreives command line arguments
const myArgs = process.argv.slice(2);

//stuff to display if debug mode is on
if(DEBUG) if(myArgs.length >= 1) console.log('the myapp.args: ', myArgs);
//
// The magjor sperator of commands. myArgs[0] represents one of the 4 major categories of commands;
// init, congig, token, and server.
// 
// init is used to create the application's Folders and Files.
//
// config is  used to modify the config.json file. In a real application, this file would contatin necessary information
// to connect to a database, or key values which will change how an application will run.
//
// token is used to create, manage. query, and delete tokens
//
// server is used to run the web application that can preform some of the administrative tasks the commandline can do.
//
switch (myArgs[0]) {
  case 'init':
  case 'i':
      if(DEBUG) console.log(myArgs[0], ' - initialize the app.');
      initializeApp();
      break;
  case 'config':
  case 'c':
      if(DEBUG) console.log(myArgs[0], ' - display the configuration file');
      configApp();
      break;
  case 'token':
  case 't':
      if(DEBUG) console.log(myArgs[0], ' - generate a user token');
      tokenApp();
      break;
  case 'server':
    if(DEBUG) console.log(myArgs[0], ' - run web server');
      serverApp();
      break;
  case '--help':
  case '--h':
  default:
      fs.readFile(__dirname + "/usage.txt", (error, data) => {
          if(error) throw error;
          console.log(data.toString());
      });
}