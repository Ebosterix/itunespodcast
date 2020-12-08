const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
/* GET home page */
//router.get('/signup', (req, res) => res.render('auth/signup'));
router.get('/login', (req, res) => res.render('auth/login'));
router.post('/signup', (req, res) => {

  const salt = bcrypt.genSaltSync(10);
  const pwHash = bcrypt.hashSync(req.body.password, salt);

  User.create({ email: req.body.email, username: req.body.username, passwordHash: pwHash }).then(() => {
    res.redirect('/login')
  })

});


router.post('/login', (req, res) => {
  console.log('SESSION =====> ', req.session); // req.session === {}

  // find the user by their username
  User.findOne({ username: req.body.username }).then((user) => {

    if (!user) {
      // this user does not exist
      res.render('auth/Login', { errorMessage: 'username does not exist' })
    } else {

      // check if the password is correct
      if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
        req.session.user = user
        res.redirect('/')
      } else {
        res.render('auth/Login', { errorMessage: 'password wrong' })
      }

    }

  })

})

module.exports = router;
