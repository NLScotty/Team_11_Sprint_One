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