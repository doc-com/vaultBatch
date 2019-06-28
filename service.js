require('dotenv').config();
var request = require('request');

const url= require('url');

exports.encryptRequest = function (req, res, cb) {
    body = '';
    req.on('data', function(chunk) {
        body = JSON.parse(chunk);
    });

    req.on('end', function() {

        var data = {};

        Object.keys(body).map(key => {
            data[key] = body[key];
        });

        /* var response = {
            "text": "Post Request Value is " + data
        }; */

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    });
}

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};

hashValue = (value) => {
    var options = {
        headers: {
            'X-Vault-Token': process.env.token,
            'Content-Type': 'application/json'
        },
        uri: process.env.uriEncrypt,
        method: 'POST',
        json: {
          "plaintext": Buffer.from(value).toString('base64')
        }
    };

    request(options, function (error, res, body) {
        if (error) {
        console.log(error) // Print the shortened url.
        }else{
            if( body.errors ) {
                console.log(body.errors);
            } else {
                console.log(body.data.ciphertext);
                return body.data.ciphertext;
            }
        }
    });
}