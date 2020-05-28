var app = require('../app'),
chai = require('chai'),
request = require('supertest')
should = require('should')
var expect = chai.expect;

describe('POST /user/register', function() {
    it('responds with json', function(done) {
    request(app)
      .post('/user/register')
      .send({firstName: "Aishwarya", lastName: null, email: 'user@email.com', password: 'yourpassword'})
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(500)
      .end(function(err, res) {
        console.log(res.text)
        if(res.text.should.equal('{"error":"Column \'lastName\' cannot be null"}')) {
            expect(res.statusCode).to.equal(500);
            done();
        }
      })
    });
  });   