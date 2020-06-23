const User = require('../models/User');
const moment = require('moment');

// @desc      Login
// @route     POST /login
// @access    Public
exports.login = (req, res, next) => {
  User.findById(req.authId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the User."
      });
    else res.send(data);
  });
  //res.status(200).json({ success: true, message: 'Login' });
}

// @desc      Register
// @route     POST /register
// @access    Public
exports.register = (req, res, next) => {

   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    uid: req.auth_id,
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    surname: req.body.surname,
    premium: 0,
    created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });

  //res.status(200).json({ success: true, message: 'Register' });
}
