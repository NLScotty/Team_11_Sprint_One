const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const crc32 = require('crc').crc32;
const { format } = require('date-fns');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url);

    if (req.method === 'GET' && pathname === '/') {
        // Serve the HTML form
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.method === 'POST' && pathname === '/generateToken') {
        // Handle form submission and generate token
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username } = querystring.parse(body);
            const token = generateToken(username);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ token }));
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

function generateToken(username) {
    const now = new Date();
    const expires = addDays(now, 3);
    return {
        created: format(now, 'yyyy-MM-dd HH:mm:ss'),
        username: username,
        token: crc32(username).toString(16),
        expires: format(expires, 'yyyy-MM-dd HH:mm:ss')
    };
}

document.addEventListener("DOMContentLoaded", function () {
    fetchTokenList();
});

function fetchTokenList() {
    fetch('/getTokensByEmail') // Assuming your server route is '/getTokensByEmail'
        .then(response => response.json())
        .then(data => {
            displayTokenList(data);
        })
        .catch(error => console.error('Error fetching token list:', error));
}

function displayTokenList(tokenList) {
    const tokenListContainer = document.getElementById('tokenList');

    if (tokenList.length === 0) {
        tokenListContainer.innerHTML = '<p>No tokens found for email addresses.</p>';
        return;
    }

    const listItems = tokenList.map(token => `<div><strong>Email:</strong> ${token.email}, <strong>Token:</strong> ${token.token}</div>`);

    tokenListContainer.innerHTML = listItems.join('');
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}