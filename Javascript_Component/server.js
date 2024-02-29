const express = require('express');
const server = express();
const { tokenList } = require('./token.js');
const path = require('path');

server.use(express.urlencoded({ extended: true }));

const myArgs = process.argv.slice(2);

server.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end(
        `<form method="POST">
            <label for="name">User Name:</label>
            <input type="text" id="name" name="name"></input>
            <label for="email">Email Address:</label>
            <input type="text" id="email" name="email"></input>
            <label for="phone">Phone Number:</label>
            <input type="text" id="phone" name="phone"></input>
            <button type ="submit"> Submit </button>
        </form>`
    );
});

server.post('/', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;

    const { newToken } = require('./token.js'); // Importing the newToken function
    const response = await newToken(name, email, phone);

    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>' + response + '</h1>');
});

// Route to display the list of tokens
server.get('/tokens', async (req, res) => {
    const tokens = await tokenList(); // Retrieve the list of tokens
    console.log("I was ran");
    console.log(tokens);
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Token List:</h1>' + tokens+('<br>'));
});

function serverApp() {
    if (DEBUG) console.log('serverApp()');
    console.log(myArgs[1]);
    if (myArgs.length < 2 || myArgs[1] != '--run') {
        console.log('invalid syntax. node myapp server --run');
    } else {
        server.listen(5000);
    }
}

module.exports = {
    serverApp,
};