var should = require('should'),
    request = require('supertest'),
    app = ('../app.js'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    agent = request.agent(app);

var bookModel = new Schema({
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false }
});

var Book = mongoose.model('Book', bookModel);

describe('Book Crud Test', function() {
    it('Should allow a book to be posted and return a read and _id', function(done) {
        var bookPost = { title: "Khuli Kitaab", author: "Jaspreet Singh", genre: "Drama" };
        agent.post('/sapi/books')
            .send(bookPost)
            .expect(200)
            .end(function(err, results) {
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done()
            })
    })
    afterEach(function(done) {
        Book.remove().exec();
        done();
    })
});