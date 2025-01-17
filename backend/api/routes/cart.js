const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Books = require("../models/books");
const Cart = require("../models/cart")


router.post('/addtocart', (req, res, next) => {
    
    const cartItem = {
        seller_id: req.body.seller_id,
        buyer_id: req.body.buyer_id,
        quantity: req.body.quantity,
        book_id: req.body.book_id
    }
    console.log(cartItem)

    Cart.findOne({
        where: {
            seller_id: cartItem.seller_id,
            book_id: cartItem.book_id,
            buyer_id: cartItem.buyer_id
        }
    }).then(book => {
        console.log("Checking for book object")
        if(!book) {
            Cart.create(cartItem).then( item => {
                res.status(200).json({
                    status: 200,
                    message: item.book_id + 'added to cart!'
                })
                console.log("Uploaded book")
            }).catch(error => {
                console.log(error)
                if (JSON.stringify(error).includes("Validation error")) {
                    res.status(400).json({
                        status: 400,
                        message: "Validation error"
                    })
                } else {
                    res.status(500).json({
                        status: 500,
                        message: "Error while adding to cart"
                    })
                }
            })
        }  else {
            res.status(409).json({
                status: 409,
                message: "Already present in cart"
            })
        }
        
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Error while fetching from cart"
        })
    })
})


router.get('/getcart', (req, res, next) => {

    Cart.belongsTo(Books, { targetKey: 'id', foreignKey: 'book_id'})

    console.log("BuyerID:" + req.headers['buyerid'])
    // Books.hasMany(Cart, {foreignKey: "id"})

    Cart.findAll({
        where: {
            buyer_id: req.headers['buyerid']
        },
        raw: true,
        include: [{
          model: Books
          
         }]
      }).then(posts => {
        console.log(posts);
        res.status(200).json({
            status: 200,
            message: "Got all books",
            cart: posts
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Error fetching data..",
            error: err
        })
    })    
})

module.exports = router;