const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require('../../config/keys');

const validateRegisterUser = require('../../validation/register');
const validateLoginUser = require('../../validation/login');

const User = require('../../models/User');

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterUser(req.body);
    //validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email is already in use" });
    } else {
      const newUser = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        })
      })
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginUser(req.body);
  console.log(req.body);
  // validate login
  if (!isValid){
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);

  // Find user by email
  User.findOne({ email }).then(user => {
    if (!user)
      return res.status(400).json({ email: 'Email address not found' });
    // check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          fullName: user.fullName
        }
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926 }, (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`
          })
        })
      } else {
        return res.status(400).json({ password: 'Password is incorrect' });
      }

    })
  });

});
module.exports = router;
