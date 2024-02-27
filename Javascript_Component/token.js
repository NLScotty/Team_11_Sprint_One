// Node.js common core global modules
const fs = require('fs');
const path = require('path');

const crc32 = require('crc/crc32');
const { format } = require('date-fns');
const { debug } = require('console');

const myArgs = process.argv.slice(2);

const express = require('express');
const app = express();


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

function newToken(username,email,phone) {
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

  if(email !== undefined) newToken.email = email;
  if(email !== undefined) newToken.phone = phone;

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
  if(token == undefined){
    console.log('No user found');
  }
  else{
    console.log(token);
  }
});
}
//TO DO
/*
Find user by email from json/tokens.json, and return the corresponding record

*/
function queryByEmail(email){
if(DEBUG) console.log('queryByEmail()', email);
fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
  if(error) throw error; 
  let tokens = JSON.parse(data);
  let tokenList = tokens.filter(obj => obj.email === email);
  if(tokenList.length == 0){
    console.log('No user/users found');
  }
  else{
    console.log(tokenList);
  }
});
}
//TO DO
/*
Find user by email from json/tokens.json, and return the corresponding record. 
May not be unique, so return a list of tokens
*/
function queryByPhone(phone){
  if(DEBUG) console.log('queryByPhone()', phone);
  fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
      if(error) throw error; 
      let tokens = JSON.parse(data);
      let userTokens = tokens.filter(obj => obj.phone === phone);
      if(tokenList.length == 0){
        console.log('No user/users found');
      }
      else{
        console.log(userTokens);
      }
   });
}

function updateEmail(username, newEmail){
  fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
    if(error) throw error; 
    let tokens = JSON.parse(data);
    let token = tokens.find(token => token.username === username);
    if(token == undefined){
      console.log(`User ${username} cannot be found. Check your spelling and try again!`);
    }
    else{
      let oldemail= token.email;
      token.email = newEmail;
      console.log(token);
      fs.writeFile(__dirname + '/json/tokens.json', JSON.stringify(tokens), (err) => {
        if (err) console.log(err);
        else { 
            console.log(`Email from ${username} updated from ${oldemail} to ${token.email}`);
        }
      })
    }
  });
}

function updatePhone(username,newPhone){
  fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
    if(error) throw error; 
    let tokens = JSON.parse(data);
    let token = tokens.find(token => token.username === username);
    if(token == undefined){
      console.log(`User ${username} cannot be found. Check your spelling and try again!`);
    }
    else{
      let oldphone = token.phone;
      token.phone = newPhone;
      console.log(token);
      fs.writeFile(__dirname + '/json/tokens.json', JSON.stringify(tokens), (err) => {
        if (err) console.log(err);
        else { 
            console.log(`Phone number from ${username} updated from ${oldphone} to ${token.phone}`);
        }
      })
    }
  });
}

app.get('/getTokensByEmail', (req, res) => {
  fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
      if (error) {
          console.error('Error reading tokens:', error);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      let tokens = JSON.parse(data);
      const tokenList = tokens.filter(obj => obj.email !== undefined);
      res.json(tokenList);
  });
});

function tokenApp() {
  if(DEBUG) console.log('tokenApp()');

  switch (myArgs[1]){
    case '--query':
      if(DEBUG) console.log('--query');
      if (myArgs.length < 4) {
        console.log('invalid syntax. node myapp token --query [u/e/p] [username/email/phone]')
      } 
      else {
          if(myArgs[2] == 'u' || myArgs[2] == 'U'){
            queryByUsername(myArgs[3]);
          }
          else if(myArgs[2] == 'e' || myArgs[2] == 'E'){
            queryByEmail(myArgs[3]);
          }
          else if(myArgs[2] == 'p' || myArgs[2] == 'P'){
            queryByPhone(myArgs[3]);
          }
          else{
            console.log('invalid syntax. node myapp token --query [u/e/p] [username/email/phone]')
          }
      }
    break;
  case '--count':
    if(DEBUG) console.log('--count');
      tokenCount();
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
        newToken(myArgs[2], myArgs[3], myArgs[4]);
      }
      break;
  case '--update':
      if(myArgs.length < 5){
          console.log('invalid syntax. node myapp token --update [e/p] [username] [email/phone]')
      }else{
        if(myArgs[2] == 'e' || myArgs[2] == 'E' ){
          updateEmail(myArgs[3], myArgs[4]);
        }
        else if(myArgs[2] == 'p' || myArgs[2] == 'P'){
          updatePhone(myArgs[3], myArgs[4]);
        }
        else{
          console.log('invalid syntax. node myapp token --update [e/p] [username] [email/phone]')
        }
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
  newToken,
}