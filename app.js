var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI', {
    useMongoClient: true,
    /* other options */
});

var Book = require('./models/bookModel');
var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var bookRouter = require('./Routes/temp')(Book);


app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
    res.send('Welcome to REST APIs');
});

app.listen(port, function() {
    console.log('Running on port ' + port);
});