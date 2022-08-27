const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router.get(
  '/',
  catchAsync(async (req, res, next) => {
    const users = await User.find({}).populate('blogs', { title: 1 });
    res.status(200).json(users);
  })
);

router.post(
  '/',
  catchAsync(async (req, res, next) => {
    const { name, username, password } = req.body;
    if (!(username && password?.length > 2)) {
      return res.status(400).json({
        error:
          'Both username and password are required and must be at least 3 chars long'
      });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        error: 'username must be unique'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, name, passwordHash });
    res.status(201).json(newUser);
  })
);

module.exports = router;
