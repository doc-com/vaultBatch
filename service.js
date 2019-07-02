var request = require('request');
var data = {};

exports.encryptRequest = (req, res, next) => {
    mapItems(req.body, function(data){
        res.send(data);
        next(); 
    });
}

mapItems = (items, cb) => {
    itemsA = Object.keys(items);
    itemsA.map( (item, i) => {
        hashItem(items[item], function(error, result){
            if(error){
                console.log(error);
            }
            console.log(result+ ' '+ item);
            data[item] = result;
            if (itemsA.length === (i + 1)){
                cb(data);
            }
        });
    });
};

hashItem = (value, cb) => {
    var options = {
        headers: {
            'X-Vault-Token': process.env.VAULT_TOKEN,
            'Content-Type': 'application/json'
        },
        uri: process.env.VAULT_HOST,
        method: 'POST',
        json: {
          "plaintext": Buffer.from(value).toString('base64')
        }
    };
    request(options, function (error, res, body) {
        cb(error, body.data.ciphertext);
    });
}