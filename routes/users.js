'use strict';

const express = require('express');
const request = require('request');

const User = require('../models/user');


let router = express.Router();

//    users.js
//    /api/users
router.get('/', User.authMiddleware, (req,res) => {
  User.find({}, (err, users) => {
    res.status(err ? 400 : 200).send(err || users)
  })
})

router.get('/profile', User.authMiddleware, (req, res) => {
  console.log('req.user:', req.user);
  res.send(req.user);
});

router.post('/login', (req, res) => {
  User.authenticate(req.body, (err, token) => {
    res.status(err ? 400 : 200).send(err || {token: token});
  })
})

router.post('/signup', (req, res) => {
  User.register(req.body, (err, token) => {
    res.status(err ? 400 : 200).send(err || {token: token});
  })
})

router.get('/:id', User.authMiddleware, (req,res) => {
  User.findById(req.params.id, (err, user) => {
    res.status(err ? 400: 200).send(err || user);
  })
})
router.put('/:id', User.authMiddleware, (req,res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
    res.status(err ? 400: 200).send(err || user);
  })
})


module.exports = router;
