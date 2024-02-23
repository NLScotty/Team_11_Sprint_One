// Node.js common core global modules
const fs = require('fs');
const path = require('path');

const crc32 = require('crc/crc32');
const { format } = require('date-fns');
const { debug } = require('console');

const myArgs = process.argv.slice(2);

function tokenList() {
  if(DEBUG) console.log('token.tokenCount()');
  fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
      if(error) throw error; 
      let tokens = JSON.parse(data);
      console.log('** User List **')
      tokens.forEach(obj => {
          console.log(' * ' + obj.username + ': ' + obj.token);
      });
   });
};

function newToken(username) {
  if(DEBUG) console.log('token.newToken()');
  let newToken = JSON.parse(`{
      "created": "1969-01-31 12:30:00",
      "username": "username",
      "email": "user@example.com",
      "phone": "5556597890",
      "token": "token",
      "expires": "1969-02-03 12:30:00",
      "confirmed": "tbd"
  }`);

  let now = new Date();
  let expires = addDays(now, 3);

  newToken.created = `${format(now, 'yyyy-MM-dd HH:mm:ss')}`;
  newToken.username = username;
  newToken.token = crc32(username).toString(16);
  newToken.expires = `${format(expires, 'yyyy-MM-dd HH:mm:ss')}`;

  fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
      if(error) throw error; 
      let tokens = JSON.parse(data);
      tokens.push(newToken);
      userTokens = JSON.stringify(tokens);
  
      fs.writeFile(__dirname + '/json/tokens.json', userTokens, (err) => {
          if (err) console.log(err);
          else { 
              console.log(`New token ${newToken.token} was created for ${username}.`);
          }
      })
      
  });
  return newToken.token;
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
//TO DO
/*
Token count should be able to count the tokens in json/tokens.json, and return a number
*/
function tokenCount(){
  if(DEBUG) console.log('tokenCount()');
  fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
      if(error) throw error; 
      let tokens = JSON.parse(data);
      console.log('Total number of tokens:', tokens.length);
   });
}
//TO DO
/*
Find user by username from json/tokens.json, and return the corresponding record
*/
function queryByUsername(username){
if(DEBUG) console.log('queryByUsername()',username);
fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
  if(error) throw error; 
  let tokens = JSON.parse(data);
  let token = tokens.find(obj => obj.username === username);
  console.log(token);
});
}
//TO DO
/*
Find user by email from json/tokens.json, and return the corresponding record
May not be unique, so return a list of tokens
*/
function queryByEmail(email){
if(DEBUG) console.log('queryByEmail()', email);
fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
  if(error) throw error; 
  let tokens = JSON.parse(data);
  let token = tokens.find(obj => obj.email === email);
  console.log(token);
});
}
//TO DO
/*
Find user by phone from json/tokens.json, and return the corresponding record. 
May not be unique, so return a list of tokens
*/
function queryByPhone(){
  if(DEBUG) console.log('queryByPhone()', phone);
  fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
      if(error) throw error; 
      let tokens = JSON.parse(data);
      let userTokens = tokens.filter(obj => obj.phone === phone);
      console.log(token);
   });
}

function updateEmail(){

}

function updatePhone(){

}

function tokenApp() {
  if(DEBUG) console.log('tokenApp()');

  switch (myArgs[1]){
    case '--query':
      if (myArgs.length < 3) {
     //   console.log('invalid syntax. node myapp token --new [username]')
    } else {
      if(DEBUG) console.log('--query');
      queryByEmail(myArgs[2]);
    }
    break;
  case '--count':
    if(DEBUG) console.log('--count');
 //     tokenCount();
      break;
  case '--list':
    if(DEBUG) console.log('--list');
      tokenList();
      break; 
  case '--new':
      if (myArgs.length < 3) {
          console.log('invalid syntax. node myapp token --new [username]')
      } else {
        if(DEBUG) console.log('--new');
        newToken(myArgs[2]);
      }
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
  tokenApp,
}