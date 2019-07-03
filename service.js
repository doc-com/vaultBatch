var request = require('request');

exports.encryptRequest = (req, res, next) => {
    let type = req.params.type;
    mapItems(req.body, type, function(data){
        hashData(data, type, function(err,data){
            mapResponse(req.body, data, type, function(response){
                res.send(response);
                next();
            });
        });
    });
}

mapItems = (items, type, cb) => {
    var data = [];
    itemsA = Object.keys(items);
    itemsA.map( item => {
        if ( type === 'encrypt' ) {
            data.push({
                "plaintext": Buffer.from(items[item]).toString('base64')
            });
        } else {
            data.push({
                "ciphertext": items[item]
            });
        }
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

mapResponse = (body, data, type, cb) => {
    var response = {};
    Object.keys(body).map( (item, i) => {
        response[item] = type === 'encrypt' ? data.batch_results[i].ciphertext : Buffer.from(data.batch_results[i].plaintext, 'base64').toString('ascii');
        if (Object.keys(response).length === Object.keys(body).length){
            cb(response);
        }
    });
}