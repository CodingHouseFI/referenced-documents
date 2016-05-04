'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});


userSchema.statics.readBook = function(userId, bookId, cb) {

  // find the user by id
  // get the book out of the user by the bookId
  // call book.read()
  // callback

  User.findById(userId, (err, user) => {
    if(err) return cb(err);
    
    var book = user.books.filter(book => book._id.toString() === bookId)[0];
    
    if(!book) {
      return cb({error: 'Book not found'});
    }

    book.read(cb);

  }).populate('books');

};

var User = mongoose.model('User', userSchema);

module.exports = User;
