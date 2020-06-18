const express = require("express");
const router = express.Router();
const BookImages = require("../models/images")
const Books = require("../models/books")
const upload = require('../services/imageupload');
const aws = require('aws-sdk');

const singleUpload = upload.array('image', 10);

// Upload to S3
router.post('/uploads3image', (req, res, next) => {
    singleUpload(req, res, function (err, data) {
        if (err) {
            return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
        }
        return res.send({
            status: 200,
            data: req.files
        }); 
    });
})

// Delete from s3
router.delete('/deletefroms3', (req, res, next) => {
    console.log(req.body)
    let {
        key = ""
    } = req.body.key;
    aws.config.update({
        secretAccessKey: process.env.prod_secret_key || "2B+2dh3LM5+RqtlwPHnbzm/iH8NYcD3MV9CwMiMW",
        accessKeyId: process.env.prod_secret_key || "AKIAJ2FSUYCE344W4CIQ",
        region: process.env.prod_region || 'us-east-1'
    });
    const s3 = new aws.S3();
    var params = {
        Bucket: 'webapp.aishwarya.patil',
        Key: key
    };
    s3.deleteObject(params, function (err) {
        if (err) res.send({
            status: 400,
            message: err
        })
        else res.send({
            status: 200,
            message: "Success"
        })
        return;
    });
})

// Delete from image from table
router.delete('/deletebookimage', (req, res, next) => {
    console.log(req.body)
    let {
        id
    } = req.body.id;

    if (!id) {
        res.send({
            status: 400,
            message: "Please enter valid book image id"
        });
        return;
    }
    BookImages.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    status: 200,
                    message: "Book image was deleted successfully!"
                });
                return;
            } else {
                res.send({
                    status: 400,
                    message: `Cannot delete Book image with id=${id}. Maybe book image was not found!`
                });
                return;
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: "Could not delete Book image with id=" + id
            });
            return;
        });
})

// Create image table entry
router.post('/addimage', (req, res, next) => {
    let {
        book_id = "",
        location = "",
        originalname = "",
        key = ""
    } = req.body;

    if (!book_id) {
        res.send({
            status: 400,
            message: "Please enter valid book image book_id"
        });
    }
    if (!location) {
        res.send({
            status: 400,
            message: "Please enter valid book image location"
        });
    }

    if (!originalname) {
        res.send({
            status: 400,
            message: "Please enter valid book image originalname"
        });
    }
    if (!key) {
        res.send({
            status: 400,
            message: "Please enter valid book image key"
        });
    }

    BookImages.create({
        book_id,
        location,
        originalname,
        key
    })
        .then(data => {
            res.send({
                status: 200,
                message: "BookImages added successfully",
                data: data
            });
        })
        .catch(err => {
            res.send({
                status: 500,
                message:
                    err.message || "Some error occurred while adding the images."
            });
        });
})

// Add bulk images to image table
router.post('/addbulkimages', (req, res, next) => {
    let {
        imageSet = []
    } = req.body;

    console.log(JSON.stringify(imageSet))
    // var resArr = [];
    
    // var myObject = eval('(' + imageSet + ')');
    // for (i in myObject)
    // {
    //     let obj = {
    //         location : myObject[i]["location"],
    //         key : myObject[i]["key"],
    //         book_id : myObject[i]["book_id"],
    //         originalname: myObject[i]["originalname"],
    //     }
    //     resArr.push(obj);
    // }

    // console.log(resArr);
    BookImages.bulkCreate(imageSet, {returning: true})
        .then(data => {
            res.send({
                status: 200,
                message: "BookImages added successfully",
                data: data
            });
        })
        .catch(err => {
            res.send({
                status: 400,
                message:
                    err.message || "Some error occurred while adding the images."
            });
        });
});


//Get all images
router.get('/allimages', (req, res, next) => {
    BookImages.belongsTo(Books, { targetKey: 'id', foreignKey: 'book_id'})

    BookImages.findAll({
        where: { 
            book_id : req.headers['book_id']
        },
        raw: true,
        include: [{
            model: Books
        }]
    }).then(images => {
        console.log(images);
        res.status(200).json({
            status: 200,
            message: "Got all books",
            allimages: images
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Error fetching data..",
            error: err
        })
    })  
});


module.exports = router;