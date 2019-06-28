const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {
    var service = require('./service.js');
    const reqUrl = url.parse(req.url, true);

    // GET EndPoint
    if (reqUrl.pathname == '/encrypt' && req.method === 'POST' ) {
        console.log('Request Type:' +
            req.method + 'Endpoint: ' +
            reqUrl.pathname
        );
        service.encryptRequest(req, res, function(result){
            return result;
        });
    }
});