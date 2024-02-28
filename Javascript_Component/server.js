const express = require('express');
const server = express();
const { newToken, fetchTokenList, updateEmail} = require('./token.js');

server.use(express.urlencoded({extended:true}));

const myArgs = process.argv.slice(2);

server.get('/',(req,res) => {
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

server.post('/',(req,res) => {
    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
    const token=newToken(name,email,phone)

    res.setHeader('Content-Type','text/html'); 
    res.end('<h1>'+token+'</h1>');
})

server.get('/findByName',(req,res) => {
    res.setHeader('Content-Type','text/html');
    res.end(
        `<form method="POST">
            <label for="name">User Name:</label>
            <input type="text" id="name" name="name"></input>
            <button type ="submit"> Search </button>
        </form>`);
})

server.post('/findByName',async (req,res) => {
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

server.get('/updateEmail',(req,res) => {
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

server.post('/updateEmail',async (req,res) => {
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

server.get('/userList',async (req,res) => {
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



function serverApp(){
    if(DEBUG) console.log('serverApp()');
    console.log(myArgs[1]);
    if (myArgs.length < 2 || myArgs[1] != '--run') {
        console.log('invalid syntax. node myapp server --run');
    } 
    else{
        server.listen(5000)
    }
}

module.exports = {
    serverApp,
}