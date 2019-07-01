require('dotenv').config();
var request = require('request');

const url= require('url');

var data = {};

exports.encryptRequest = function (req, res) {
    items = '';

    req.on('data', function(chunk) {
        items = JSON.parse(chunk);
        mapItems(items);
    });

    req.on('end', function() {
        setTimeout(function(){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        },3000);
    });
}

mapItems = (items) => {
    Object.keys(items).map(item => {
        hashItem(items[item], function(result){
            console.log(result);
            data[item] = result;
        });
    });
};

hashItem = (value, cb) => {
    var hashed = '';
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
                console.log(body.data.errors);
                hashed = body.data.ciphertext
            }
        }
    });
    setTimeout(function(){
      cb(hashed);
    }, 2000);
}