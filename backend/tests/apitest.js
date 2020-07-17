var app = require('../app'),
chai = require('chai'),
request = require('supertest')
should = require('should')
var expect = chai.expect;

describe('POST /user/register', function () {
  it('responds with json error', function (done) {
    request(app)
      .post('/api/user/register')
      .send({ firstName: "Aishwarya", lastName: null, email: null, password: 'yourpassword' })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .end(function (err, res) {
        console.log(res.text)
        if (res.text.should.equal('{"status":400,"message":"Email can not be empty!"}')) {
          expect(res.statusCode).to.equal(400);
          done();
        }
      })
  });
});