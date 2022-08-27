const jwt = require('jsonwebtoken');
const express = require('express');
const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const middleware = require('../utils/middleware');
const router = express.Router();

router.get(
  '/',
  catchAsync(async (request, response, next) => {
    const blogs = await Blog.find({}).populate('author', { name: 1 });
    response.json(blogs);
  })
);

router.post(
  '/',
  catchAsync(async (req, res, next) => {
    const { user } = req;
    if (!req.body.title || !req.body.url) {
      return response
        .status(400)
        .json({ error: 'blogs must contain a title and a url' });
    }
    const blog = new Blog({
      author: user.id,
      title: req.body.title,
      url: req.body.url
    });
    const newBlog = await blog.save();
    user.blogs = [...user.blogs, newBlog._id];
    await user.save();
    res.status(201).json(newBlog);
  })
);

router.delete(
  '/:id',
  catchAsync(async (req, res, next) => {
    const { user } = req;
    const blogTodelete = await Blog.findById(req.params.id);
    if (blogTodelete.author.toString() === user.id) {
      await Blog.findByIdAndDelete(req.params.id);
    }
    res.status(204).end();
  })
);

router.put(
  '/:id',
  catchAsync(async (request, response, next) => {
    const updated = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes: request.body.likes },
      { new: true, runValidators: true }
    );
    response.status(200).json(updated);
  })
);

module.exports = router;
