'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.route('/')
  .get((req, res) => {
    User
      .find({})
      .populate('books friends')
      .exec((err, users) => {
        res.status(err ? 400 : 200).send(err || users);
      });
  })
  .post((req, res) => {
    User.create(req.body, (err, user) => {
      res.status(err ? 400 : 200).send(err || user);
    });
  });




router.put('/:user1/addFriend/:user2', (req, res) => {
  User.findById(req.params.user1, (err1, user1) => {
    User.findById(req.params.user2, (err2, user2) => {
      if(err1 || err2) return res.status(400).send(err1 || err2);

      user1.friends.push(user2._id);
      user2.friends.push(user1._id);

      user1.save((err1) => {
        user2.save((err2) => {
          res.status(err1 || err2 ? 400 : 200).send(err1 || err2)
        });
      });
    });
  });
});









//  /api/users

router.put('/:userId/read/:bookId', (req, res) => {
  var userId = req.params.userId;
  var bookId = req.params.bookId;

  User.findById(userId, (err, user) => {
    if(err) return res.status(400).send(err);

    var book = user.books.filter(book => book._id.toString() === bookId)[0];

    if(!book) {
      return res.status(400).send({error: 'Book not found'});
    }

    book.readCount++;
    book.save(err => {
      res.status(err ? 400 : 200).send(err);
    });

  }).populate('books');
});


router.put('/:userId/books/:bookId', (req, res) => {

  var userId = req.params.userId;
  var bookId = req.params.bookId;

  User.findById(userId, (err, user) => {
    if(err) return res.status(400).send(err);

    user.books.push(bookId);

    user.save((err, savedUser) => {
      res.status(err ? 400 : 200).send(err || savedUser);
    });
  });
});

module.exports = router;
