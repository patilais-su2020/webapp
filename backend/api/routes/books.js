const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const Books = require("../models/books");
const User = require("../models/user");
const Images = require("../models/images");
const { Op } = require("sequelize");

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
                user_id: user.id,
                deleted: false
            }
            Books.findOne({
                where: {
                    user_id: user.id,
                    isbn: books.isbn
                    // deleted: false
                }
            })
                .then(book => {
                    console.log("Inside create book")
                    if(book!=null && book.dataValues.deleted===true){
                        Books.update(books, {
                            where: {
                                [Op.and]: [
                                    {
                                        isbn: books.isbn,
                                        user_id: user.id,
                                        deleted: true
                                    }
                                ]
                            }
                        }).then(book => {
                            res.status(200).json({
                                status: 200,
                                book_id: book.id,
                                message: 'Book Detail created after delete!!'
                            })
                            console.log("Book created after delete! !")
                        })
                        .catch(error => {
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
                                console.log("inside book update")
                                console.log(error)
                                res.status(500).json({
                                    status: 500,
                                    message: "Error uploading book"
                                })
                            }
                        })
                    }
                    else if (book == null) {
                        Books.create(books)
                            .then(book => {
                                console.log("================" + JSON.stringify(books))
                                res.status(200).json({
                                    status: 200,
                                    book_id: book.id,
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
            Books.hasMany(Images, { targetKey: 'id', foreignKey: 'book_id'})
            Books.findAll({
                where: {
                    user_id: user.id,
                    deleted: false
                },
                include: [{
                    model: Images
                }]
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
router.put('/update', (req, res, next) => {

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

            Books.update(books, {
                where: {
                    [Op.and]: [
                        {
                            isbn: req.body.oldisbn,
                            user_id: user.id,
                            deleted: false
                        }
                    ]
                }
            })
                .then(book => {
                    res.status(200).json({
                        status: 200,
                        message: 'Book Detail Updated for sale!'
                    })
                    console.log("Updated book!!")
                })
                .catch(error => {
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
router.put('/deletebook', (req, res, next) => {
    console.log(req)
    var decoded = jwt.verify(req.headers['authorization'], 'secret');
    console.log(decoded);
    User.findOne({
        where: {
            email: decoded.email
        }
    })
        .then(user => {
            const today = new Date()
            console.log(today);
            const books = {
                deleted: req.body.deleted
            }

            Books.update(books, {
                where: {
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
                        message: 'Book Detail Updated for sale!'
                    })
                    console.log("Updated book!!")
                })
                .catch(error => {
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

            Books.hasMany(Images, { targetKey: 'id', foreignKey: 'book_id'})
            Books.findAll({
                order: [
                    // Will escape title and validate DESC against a list of valid direction parameters
                    ['price', 'ASC'],
                ],
                where: {
                    user_id: {
                        [Op.not]: user.id
                    },
                    deleted: false
                },
                include: [{
                    model: Images,
                    // where: { id: db.Sequelize.col('carts.pid') }
                }]
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