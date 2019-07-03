require('dotenv').config()
var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);
var expect = chai.expect;

var app = 'http://127.0.0.1:3000'
var request = require('request')
var util = require('util')

var service = require('./service')

chai.request(app)
    .post('/encrypt')
    .send({
        "name": "siddharta",
        "last_name": "naranjo",
    })
    .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
    });