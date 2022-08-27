const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router.post(
  '/',
  catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password'
      });
    }
    const userForToken = { username: user.username, id: user._id };

    const token = jwt.sign(userForToken, process.env.SECRET);
    res.status(200).json({ token, username: user.username, name: user.name });
  })
);

module.exports = router;
