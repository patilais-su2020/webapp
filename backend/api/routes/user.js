const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const User = require("../models/user");

//Register
router.post("/register", (req, res, next) => {
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
                  message: user.email + ' account created!'
                })
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
        error: err.original.sqlMessage
      })
    });
});


//Get Profile
router.get('/profile', (req, res, next) => {
  // verify a token symmetric - synchronous
  var decoded = jwt.verify(req.headers['authorization'], 'secret');
  console.log(decoded.email)

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
  console.log(decoded.email)
  console.log(decoded.password)

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
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(data.password, salt, (err, hash) => {
            data.password = hash
            User.update(data, {where: { email: decoded.email } })
              .then(user => {
                res.json({
                  message: decoded.email + ' details updated!',
                  status: 200
                })
              })
              .catch(err => {
                res.status(500).json({
                  error: err.original.sqlMessage
                })
              })
          });
        });
      
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        message: "Bad Request",
        error: err
      })
    })
})


module.exports = router;