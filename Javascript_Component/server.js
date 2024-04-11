const fs = require('fs');
const path = require('path');
const express = require('express');
const server = express();
const { newToken, fetchTokenList, updateEmail} = require('./token.js');

const EventEmitter = require('events');
const myEmitter = new EventEmitter();

server.use(express.urlencoded({extended:true}));
//
// The server.js file mostly consists of routes that run the server. 
// It also has a function that checks for command line arguments to run the server.
//

// logs used to keep track of what routes get used
myEmitter.on('route', (url) => {
    const d = new Date();
    if(DEBUG) console.log(`Route Event at: '${url}' at ${d}`);
    if(!fs.existsSync(path.join(__dirname, 'logs'))) {
      fs.mkdirSync(path.join(__dirname, 'logs'));
    }
    fs.appendFile(path.join(__dirname, 'logs', d.getDay()+'-'+d.getMonth()+'-'+d.getFullYear()+'-webroute.log'), `Route Event on: ${url} at ${d}\n`, (error) => {
      if(error) throw error;
    });
});

// logs used to keep track of what cli commands get used
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

//used for reading the command line
const myArgs = process.argv.slice(2);

// index page route
server.get('/',(req,res) => {
    myEmitter.emit('route', 'get /index');
    res.setHeader('Content-Type','text/html');
    res.end(
        `<ul>
            <li><a href="/addUser"> Add new user </a></li>
            <li><a href="/findByName"> Find user by username </a></li>
            <li><a href="/updateEmail"> Update user email </a></li>
            <li><a href="/userList"> Show User List </a></li>
        </ul>`);
})

// the get portion of the addUser endpoint. It returns a form
server.get('/addUser',(req,res) => {
    myEmitter.emit('route', 'get /addUser');
    res.setHeader('Content-Type','text/html');
    res.end(
        `<form method="POST">
            <label for="name">User Name:</label>
            <input type="text" id="name" name="name"></input>
            <label for="email">Email Address:</label>
            <input type="text" id="email" name="email"></input>
            <label for="phone">Phone Number:</label>
            <input type="text" id="phone" name="phone"></input>
            <button type ="submit"> Submit </button>
        </form>`);
})
// the post portion of the addUser endpoint. It displays a token
server.post('/addUser',(req,res) => {
    myEmitter.emit('route', 'post /addUser');
    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
    const token=newToken(name,email,phone)

    res.setHeader('Content-Type','text/html'); 
    res.end('<h1>'+token+'</h1>');
})

// the get portion of the findByName endpoint. It displays a form
server.get('/findByName',(req,res) => {
    myEmitter.emit('route', 'get /findByName');
    res.setHeader('Content-Type','text/html');
    res.end(
        `<form method="POST">
            <label for="name">User Name:</label>
            <input type="text" id="name" name="name"></input>
            <button type ="submit"> Search </button>
        </form>`);
})
// the post portion of the findByName endpoint. It displays a user token or User not found
server.post('/findByName',async (req,res) => {
    myEmitter.emit('route', 'post /findByName');
    let name = req.body.name;
    let data = await fetchTokenList();
    let userList = JSON.parse(data);
    let user = userList.find(obj => obj.username === name)
    res.setHeader('Content-Type','text/html'); 
    if(user != undefined){
        let responseString = '<h1>User Found!</h1>'
        responseString +='<table>'
        responseString +=`<tr> <th>Username: </th> <td> ${user.username} </td> </tr>`
        responseString +=`<tr> <th>Phone Number: </th> <td> ${user.phone} </td> </tr>`
        responseString +=`<tr> <th>Email: </th> <td> ${user.email} </td> </tr>`
        responseString +=`<tr> <th>Token: </th> <td> ${user.token} </td> </tr>`
        responseString +='</table>'
        res.end(responseString);
    }
    else{
        res.end('<h1>User not Found!</h1>');
    }
})
// the get portion of the updateEmail endpoint. It displays a form
server.get('/updateEmail',(req,res) => {
    myEmitter.emit('route', 'get /updateEmail');
    res.setHeader('Content-Type','text/html');
    res.end(
        `<form method="POST">
            <label for="name">User Name:</label>
            <input type="text" id="name" name="name"></input>
            <label for="email">New Email Address:</label>
            <input type="text" id="email" name="email"></input>
            <button type ="submit"> Update </button>
        </form>`);
})
// the post portion of the addUser endpoint. It displays either a success message or a failure message
server.post('/updateEmail',async (req,res) => {
    myEmitter.emit('route', 'post /updateEmail');
    let name = req.body.name;
    let email = req.body.email;
    let data = await fetchTokenList();
    let userList = JSON.parse(data);
    let user = userList.find(obj => obj.username === name)
    res.setHeader('Content-Type','text/html'); 
    if(user != undefined){
        let oldemail = user.email;
        updateEmail(name,email);
        let responseString = '<h1>User Found! Email Updated</h1>'
        responseString = `<p> ${name}'s email changed from ${oldemail} to ${email}</p>`
        res.end(responseString);
    }
    else{
        res.end('<h1>User not Found! No Changes Made!</h1>');
    }
})
// the get portion of the userlist endpoint. It displays a list of users/tokens
server.get('/userList',async (req,res) => {
    myEmitter.emit('route', 'get /userList');
    let data = await fetchTokenList();
    let userList = JSON.parse(data);
    res.setHeader('Content-Type','text/html');
    let responseString = '<h1> User Token Page</h1>';
    responseString+='<table>'
    responseString+='<tr> <th>User Token</th> <th>Username</th> <th>Email</th> <th> </th> <th> Phone </th> </tr>'
    userList.forEach(user => {
        responseString += `<tr> <td>${user.token}</td> <td>${user.username}</td> <td>${user.email}</td> <td>${user.phone}</td> </tr>`;
    });
    responseString+='</table>'
    res.end(responseString);
})

// The commandline bit used by myapp.js (driver file). It checks to see if --run is entered. If so, runs the server
function serverApp(){
    if(DEBUG) console.log('serverApp()');
    console.log(myArgs[1]);
    if (myArgs.length < 2 || myArgs[1] != '--run') {
        console.log('invalid syntax. node myapp server --run');
    } 
    else{
        myEmitter.emit('cli', 'server --run');
        server.listen(5000)
    }
}

module.exports = {
    serverApp,
}