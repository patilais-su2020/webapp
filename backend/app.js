const express = require('express');
const app = express();
//For logging purposes
const morgan = require('morgan');
const bodyParser = require('body-parser');

const userRoutes = require('./api/routes/user');
const booksRoutes = require('./api/routes/books');
const cartRoutes = require('./api/routes/cart');
const imageRoutes = require('./api/routes/images');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

var StatsD = require('statsd-client'),
booklisting_counter = new StatsD({port: 8125, prefix: 'booklisting_counter'});
api_execution_time = new StatsD({port: 8125, prefix: 'api_execution_time'})
query_execution_time = new StatsD({port: 8125, prefix: 'query_execution_time'})
s3_execution_time = new StatsD({port: 8125, prefix: 's3_execution_time'})

app.use(function (req, res, next) {
   
    if(req.url.includes("/allbooks")){
        booklisting_counter.counter('fetch_all_book_listing_counter',1)
    }
    if(req.url.includes("/booksposted")){
        booklisting_counter.counter('books_posted_listing_counter',1)
    }

    var start = process.hrtime();
    res.once('finish', function() {

        console.log("Request for::",req.url )

        var diff = process.hrtime(start);
        var ms = diff[0] * 1e3 + diff[1] * 1e-6;
        
        console.log('The request processing time is %d ms.', ms);

        var diff1 = process.hrtime(start);
        var ms1 = diff1[0] * 1e3 + diff1[1] * 1e-6;

        if(req.url.includes("/uploads3image") || req.url.includes("/deletefroms3") || req.url.includes("/deleteallimagesfroms3") ){
            s3_execution_time.timing(req.url,ms)
        }else{
            query_execution_time.timing(req.url,ms)
            api_execution_time.timing(req.url,ms1)
        }
    });
    next();
});

app.use('/api/user', userRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/bookimages', imageRoutes);

app.use((req,res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;