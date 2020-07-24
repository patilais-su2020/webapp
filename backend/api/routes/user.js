const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const aws = require('aws-sdk')

const User = require("../models/user");

//Register
router.post("/register", (req, res, next) => {
  console.log(req)
  if (!req.body.email) {
    res.status(400).json({
        status: 400,
        message: "Email can not be empty!"
    });
    return;
  }
  User.findAll({
    where: { email: req.body.email }
  })
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User exists"
        });
      } else {
        const data = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
        }
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            data.password = hash
            User.create(data)
              .then(user => {
                res.status(200).json({
                  status: 200,
                  email: user.email,
                  message: user.email + ' account created!'
                })
                console.log("Registered")
              })
              .catch(err => {
                res.status(500).json({
                  error: err.original.sqlMessage
                })
                
              })
          });
        });
      }
    });
});


//Login
router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let jwttoken = jwt.sign(user.dataValues, 'secret', {
          expiresIn: "10h"
        })
        res.status(200).json({ status: 200, token: jwttoken })
      }
      else {
        res.status(401).json({
          message: "Incorrect Password"
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        message: "User not found",
        error: err
      })
    });
});


//Get Profile
router.get('/profile', (req, res, next) => {
  // verify a token symmetric - synchronous
  var decoded = jwt.verify(req.headers['authorization'], 'secret');

  User.findOne({
    where: {
      email: decoded.email
    }
  })
    .then(user => {
      if (user) {
        res.status(200).json(user, {status: 200})
      } else {
        res.status(500).json({
          message: "User not found"
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        message: "Bad Request",
        error: err
      })
    })
})

//Update Profile
router.put('/profile/update', (req, res, next) => {
  // verify a token symmetric - synchronous
  var decoded = jwt.verify(req.headers['authorization'], 'secret');

  User.findOne({
    where: {
      email: decoded.email,
    }
  })
    .then(user => {
        const data = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: req.body.password
        }
        User.update(data, {where: { email: decoded.email } })
        .then(user => {
          res.json({
            message: decoded.email + ' details updated!',
            status: 200
          })
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
        })
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        message: "Bad Request",
        error: err
      })
    })
})

//Update Profile
router.post('/logout', (req, res, next) => {
    res.status(200).json({
      message: "Logged Out",
      status : 200
  
    }) 
})


//Forgot Password
router.post('/resetpassword', (req, res, next) => {
  if (!req.body.email) {
      res.send({
          status: 400,
          message: "Email can not be empty!"
      });
      return;
  }
  console.log("User email"+req.body.email)
  User.findOne({ where: { email: req.body.email } })
      .then(data => {
        console.log("Request object"+ data.email)
          if (data && data.email) {
              var params = {
                  Message: `${req.body.email}:::${data.id}`,
                  TopicArn: `arn:aws:sns:${process.env.AWS_REGION}:918568617781:password_reset`,
              };
              var publishTextPromise = new aws.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
              publishTextPromise.then(
                  function (data) {
                      res.send({
                          status: 200,
                          message: "Success",
                          data: JSON.stringify(data)
                      })
                  }).catch(
                      function (err) {
                          res.send({
                              status: 400,
                              message: err
                          })
                          return;
                      })
          } else {
              res.send({
                  status: 400,
                  message: "Email is not registered",
              });
          }
      })
      .catch(err => {
          res.status(400).send({
              status: 400,
              message:
                  err.message || "Some error occurred while retrieving User."
          });
      });
})



module.exports = router;