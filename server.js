const hostname = '127.0.0.1';
const port = 3000;

const server = require('./controller.js');

var options = {
    headers: {
        'X-Vault-Token': process.env.token,
        'Content-Type': 'application/json'
    },
    uri: process.env.uriEncrypt,
    method: 'POST',
    json: {
      "plaintext": Buffer.from("my secret data").toString('base64')
    }
};

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});