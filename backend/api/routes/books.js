const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const User = require("../models/user");

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
        })
        .catch(err => {
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
                    console.log("Uploaded book")
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
router.delete('/:isbn', (req, res, next) => {
    var decoded = jwt.verify(req.headers['authorization'], 'secret');
    User.findOne({
        where: {
            email: decoded.email
        }
    })
    .then(user => {
        Books.findOne({
            where: {isbn:req.params.isbn}
        }).then(book =>{
            if(book != null){

            console.log("Found: "+ book)
        Books.destroy({where: { isbn: req.params.isbn }})
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




module.exports = router;