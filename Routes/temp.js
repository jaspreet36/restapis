var express = require('express');

var routes = function(Book) {
    var bookRouter = express.Router();

    bookRouter.route('/')
        .post(function(req, res) {
            var book = new Book(req.body);
            book.save();
            console.log(book);
            res.status(201).send(book);

        })
        .get(function(req, res) {

            var query = {};

            if (req.query.genre) {
                query.genre = req.query.genre;
            }
            Book.find(query, function(err, books) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.json(books);
                }
            });
        });
    bookRouter.use('/:bookId', function(req, res, next) {
        Book.findById(req.params.bookId, function(err, book) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else if (book) {
                req.book = book;
                next();
            } else {
                res.status(404).send('No Book Found');
            }
        });
    });
    bookRouter.route('/:bookId')
        .patch(function(req, res) {
            Book.findById(req.params.bookId, function(err, book) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    book.read = req.body.read;
                    book.save();
                    res.json(book);
                }
            });
        })
        .put(function(req, res) {
            Book.findById(req.params.bookId, function(err, book) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    book.title = req.body.title;
                    book.author = req.body.author;
                    book.genre = req.body.genre;
                    book.read = req.body.read;
                    book.save();
                    res.json(book);
                }
            });
        })
        .get(function(req, res) {
            Book.findById(req.params.bookId, function(err, book) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.json(book);
                }
            });
        });
    return bookRouter;
};

module.exports = routes;