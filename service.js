var request = require('request');
var data = [];
var response = {};

exports.encryptRequest = (req, res, next) => {
    let type = req.params.type;
    mapItems(req.body, function(data){
        hashData(data, type, function(err,data){
            mapResponse(req.body, data, function(response){
                res.send(response);
                next();
            });
        });
    });
}

mapItems = (items, cb) => {
    itemsA = Object.keys(items);
    itemsA.map( item => {
        data.push({
            "plaintext": Buffer.from(items[item]).toString('base64')
        })
        if (data.length === itemsA.length){
            cb(data);
        }
    });
};

hashData = (data, type, cb) => {
    var options = {
        headers: {
            'X-Vault-Token': process.env.VAULT_TOKEN,
            'Content-Type': 'application/json'
        },
        uri: process.env.VAULT_HOST + '/' + type + '/' + process.env.VAULT_SPACE,
        method: 'POST',
        json: {
            "batch_input" : data
        }
    };
    request(options, function (error, res, body) {
        cb(error, body.data);
    });
}

mapResponse = (body, data, cb) => {
    Object.keys(body).map( (item, i) => {
        response[item] = data.batch_results[i].ciphertext;
        if (Object.keys(response).length === Object.keys(body).length){
            cb(response);
        }
    });
}