const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require("../models/user");
const { Op } = require("sequelize");

const Books = require("../models/books");

//Upload books
router.post('/upload', (req, res, next) => {
    var decoded = jwt.verify(req.headers['authorization'], 'secret');

    User.findOne({
        where: {
            email: decoded.email
        }
    })
        .then(user => {
            const today = new Date()
            const books = {
                isbn: req.body.isbn,
                title: req.body.title,
                authors: req.body.authors,
                publication_date: req.body.publication_date,
                quantity: req.body.quantity,
                price: req.body.price,
                createdOn: today,
                updatedOn: today,
                user_id: user.id
            }
            Books.findAll({
                where: {
                  user_id: user.id,
                  isbn: books.isbn
                }
              })
                .then(book => {
                    console.log(book)
                    if(Array.isArray(book) && book.length == 0) {
                        Books.create(books)
                        .then(book => {
                            res.status(200).json({
                                status: 200,
                                message: book.title + 'uploaded for sale!'
                            })
                            console.log("Uploaded book")
                        })
                        .catch(error => {
                            console.log(error)
                            if (JSON.stringify(error).includes("Validation error")) {
                                res.status(400).json({
                                    status: 400,
                                    message: "Validation error"
                                })
                            } else if (JSON.stringify(error).includes("ER_DUP_ENTRY")) {
        
                                res.status(409).json({
                                    status: 409,
                                    message: "Duplicate entry"
                                })
                            } else {
                                res.status(500).json({
                                    status: 500,
                                    message: "Error uploading book"
                                })
                            }
                        })
                    } else {
                        res.status(409).json({
                            status: 409,
                            message: "Duplicate Entry",
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
        .catch(err => {
            console.log(err)
            res.status(500).json({
                status: 500,
                message: "User not found"
            })
        })
})


//Get all uploaded books
router.get('/booksposted', (req, res, next) => {
    var decoded = jwt.verify(req.headers['authorization'], 'secret');

    User.findOne({
        where: {
            email: decoded.email
        }
    })
        .then(user => {
            Books.findAll({
                where: {
                    user_id: user.id
                }
            })
                .then(books => {
                    res.status(200).json(books)
                    console.log("Fetched all books")
                })
                .catch(error => {
                    res.status(500).json({
                        status: 500,
                        message: "Unable to fetch books"
                    })
                    console.log(error)

                })
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                message: "User not found"
            })
        })


})


//Update Book details
router.put('/update/:isbn', (req, res, next) => {
    var decoded = jwt.verify(req.headers['authorization'], 'secret');
    User.findOne({
        where: {
            email: decoded.email
        }
    })
        .then(user => {
            const today = new Date()
            console.log(today);
            const books = {
                isbn: req.body.isbn,
                title: req.body.title,
                authors: req.body.authors,
                publication_date: req.body.publication_date,
                quantity: req.body.quantity,
                price: req.body.price,
                updatedOn: today,
                user_id: user.id
            }

            Books.update(books, {where: { isbn: req.params.isbn } })
                .then(book => {
                    res.status(200).json({
                        status: 200,
                        message: 'Book Detail Updated for sale!'
                    })
                    console.log("Updated book!!")
                })
                .catch(error => {
                    console.log(error)
                    if (JSON.stringify(error).includes("Validation error")) {
                        res.status(400).json({
                            status: 400,
                            message: "Validation error"
                        })
                    } else if (JSON.stringify(error).includes("ER_DUP_ENTRY")) {

                        res.status(409).json({
                            status: 409,
                            message: "Duplicate entry"
                        })
                    } else {
                        res.status(500).json({
                            status: 500,
                            message: "Error uploading book"
                        })
                    }
                })
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                message: "User not found"
            })
        })
})


//delete uploaded books
router.delete('/deletebook', (req, res, next) => {
    console.log("Inside delete api")
    // console.log(req.headers);
    let decoded = jwt.verify(req.headers['authorization'], 'secret');
    console.log('Decoded Jwt: '+ decoded)
    console.log("Request body " + JSON.stringify(req.body))

    console.log('Inside delete backend')

    User.findOne({
        where: {
            email: decoded.email
        }
    })
    .then(user => {
        Books.findOne({
            where: {
                [Op.and]: [
                        {
                            isbn: req.body.isbn,
                            user_id: user.id
                        }
                    ] 
                }
        }).then(book =>{
            if(book != null){
            Books.destroy(
                {where: {
                    [Op.and]: [
                            {
                                isbn: req.body.isbn,
                                user_id: user.id
                            }
                        ] 
                    }
                })
            .then(book => {
                res.status(200).json({
                    status: 200,
                    message: 'Book Deleted!'
                })
                console.log("Book deleted!!")
            })
            .catch(error => {
                console.log(error)
                // if (JSON.stringify(error).includes("Validation error")) {
                    res.status(500).json({
                        status: 500,
                        message: "Error while deleting book"
                    })
                // }
            })
            }
            else{
                res.status(404).json({
                    status: 404,
                    message: "Book not found"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                status: 500,
                message: "Error finding book"
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            status: 500,
            message: "User not found"
        })
    })
})


//Get all books
router.get('/allbooks', (req, res, next) => {

    var decoded = jwt.verify(req.headers['authorization'], 'secret');
    console.log('Inside getallbooks')

    User.findOne({
        where: {
            email: decoded.email
        }
    })
        .then(user => {
            Books.findAll({
                where: {
                    user_id: {
                        [Op.not]: user.id}
                }
            }).then(books => {
                    res.status(200).json(books)
                    console.log("Fetched all books")
                })
                .catch(error => {
                    console.log(error)
                    res.status(500).json({
                        status: 500,
                        message: "Unable to fetch books"
                    })
                    console.log(error)

                })
        })
        .catch(err => {
            console.log(error)
            res.status(400).json({
                status: 400,
                message: "User not found"
            })
        })
})


module.exports = router;