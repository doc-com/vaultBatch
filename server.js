require('dotenv').config()
var restify = require('restify')

var service = require('./service')
 
const server = restify.createServer({
  name: 'VaultBatch',
  version: '1.0.0'
})
 
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
 
server.post('/:type', service.encryptRequest);

 
server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});