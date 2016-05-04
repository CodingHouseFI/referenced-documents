'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
