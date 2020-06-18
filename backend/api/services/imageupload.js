const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


aws.config.update({
    secretAccessKey: process.env.prod_secret_key,
    accessKeyId: process.env.prod_secret_key ,
    region: process.env.prod_region
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    }
}

const upload = multer({
    fileFilter,
    storage: multerS3({
        s3,
        dirname: "uploads",
        bucket: 'webapp.aishwarya.patil',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fileName: "images/books/profile/" + Date.now() + "."+file.originalname.split(".")[1] });
        },
        key: function (req, file, cb) {
            cb(null, "images/books/profile/" + Date.now() + "."+file.originalname.split(".")[1]);
        }
    })
})

module.exports = upload;