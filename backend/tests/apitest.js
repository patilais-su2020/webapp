var app = require('../app'),
chai = require('chai'),
request = require('supertest')
should = require('should')
var expect = chai.expect;

describe('MySQL connection check: ', () => {
  it('Should check for database connection', (done) => {
    request(app)
      .post('/user/register')
      .end((err, res) => {
        console.log("res")
        console.log(res)
        console.log("err")
        console.log(err)
        if (err) {
          console.error("ERROR:", err);
          err.should.have("errno")
        } else {
          console.log("Connected to database successfully")
          describe('/POST /user/register', () => {
            it('responds with json with error', (done) => {
              request(app)
                .post('/user/register')
                .send({ firstName: "Aishwarya", lastName: null, email: 'user@email.com', password: 'yourpassword' })
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(500)
                .end(function (err, res) {
                  console.log(res.text)
                  if (res.text.should.equal('{"error":"Column \'lastName\' cannot be null"}')) {
                    expect(res.statusCode).to.equal(500);
                    done();
                  }
                })
            });
          });
        }
        done();
      });
  });
});


// describe('POST /user/register', function () {
//   it('responds with json', function (done) {
//     request(app)
//       .post('/user/register')
//       .send({ firstName: "Aishwarya", lastName: null, email: 'user@email.com', password: 'yourpassword' })
//       .set('Accept', 'application/json')
//       .expect('Content-Type', 'application/json; charset=utf-8')
//       .expect(500)
//       .end(function (err, res) {
//         console.log(res.text)
//         if (res.text.should.equal('{"error":"Column \'lastName\' cannot be null"}')) {
//           expect(res.statusCode).to.equal(500);
//           done();
//         }
//       })
//   });
// });