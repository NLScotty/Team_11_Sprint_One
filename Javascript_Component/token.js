// Node.js common core global modules
const fs = require('fs');
const path = require('path');

const crc32 = require('crc/crc32');
const { format } = require('date-fns');
const { debug } = require('console');

const myArgs = process.argv.slice(2);


const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Used to generate logs from use on the command line
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

// Retreives a list of tokens from json/tokens.json
function tokenList() {
  if(DEBUG) console.log('token.tokenList()');
  fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
      if(error) throw error; 
      let tokens = JSON.parse(data);
      console.log('** User List **')
      tokens.forEach(obj => {
          console.log(' * ' + obj.username + ': ' + obj.token);
      });
   });
};

// Used to fetch tokens in an asynchronous environment
async function fetchTokenList() {
  if(DEBUG) console.log('token.fetchTokenList()');
  let userTokens = await fs.promises.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
      if(error) throw error; 
   });
   return userTokens;
};

// Used to add at token to json/tokens.json. It can take up to 3 parameters
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
// Returns the number of tokens in tokens file
function tokenCount(){
  if(DEBUG) console.log('tokenCount()');
  fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
      if(error) throw error; 
      let tokens = JSON.parse(data);
      console.log('Total number of tokens:', tokens.length);
   });
}
// Returns a token by username
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

// Returns a list of tokens by email
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
// Returns a list of tokens by phone
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
// Updates a user's email
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
// Updates a user's phone number
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
// Removes all expired tokens from database
function removeExpired(){
  fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
    if(error) throw error; 
    let tokens = JSON.parse(data);
    let filteredTokens = tokens.filter(obj => new Date(obj.expires) > new Date());
    console.log(filteredTokens);
    fs.writeFile(__dirname + '/json/tokens.json', JSON.stringify(filteredTokens), (err) => {
        if (err) console.log(err);
        else { 
            console.log(`Expired Tokens removed!.`);
        }
    })
});
}
// Used by myapp.js to run the token commands on the commandline
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
            myEmitter.emit('cli', 'token --query username');
            queryByUsername(myArgs[3]);
          }
          else if(myArgs[2] == 'e' || myArgs[2] == 'E'){
            myEmitter.emit('cli', 'token --query email');
            queryByEmail(myArgs[3]);
          }
          else if(myArgs[2] == 'p' || myArgs[2] == 'P'){
            myEmitter.emit('cli', 'token --query phone');
            queryByPhone(myArgs[3]);
          }
          else{
            console.log('invalid syntax. node myapp token --query [u/e/p] [username/email/phone]')
          }
      }
    break;
  case '--count':
    if(DEBUG) console.log('--count');
    myEmitter.emit('cli', 'token --count');
      tokenCount();
      break;
  case '--list':
    if(DEBUG) console.log('--list');
    myEmitter.emit('cli', 'token --list');
      tokenList();
      break; 
  case '--new':
      if (myArgs.length < 3) {
          console.log('invalid syntax. node myapp token --new [username]')
      } else {
        if(DEBUG) console.log('--new');
        myEmitter.emit('cli', 'token --new');
        newToken(myArgs[2], myArgs[3], myArgs[4]);
      }
      break;
  case '--update':
      if(myArgs.length < 5){
          console.log('invalid syntax. node myapp token --update [e/p] [username] [email/phone]')
      }else{
        if(myArgs[2] == 'e' || myArgs[2] == 'E' ){
          myEmitter.emit('cli', 'token --update email');
          updateEmail(myArgs[3], myArgs[4]);
        }
        else if(myArgs[2] == 'p' || myArgs[2] == 'P'){
          myEmitter.emit('cli', 'token --update phone');
          updatePhone(myArgs[3], myArgs[4]);
        }
        else{
          console.log('invalid syntax. node myapp token --update [e/p] [username] [email/phone]')
        }
      }
      break;
  case '--expire':
      if(DEBUG) console.log('--expire');
      myEmitter.emit('cli', 'token --expire');
      removeExpired();
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
// We export token app for myapp.js. The other ones are exported for server.
module.exports = {
  tokenApp,
  newToken,
  fetchTokenList,
  updateEmail,
}