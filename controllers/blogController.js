const express = require('express');
const Blog = require('../models/blogModel');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.get(
  '/',
  catchAsync(async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
  })
);

router.post(
  '/',
  catchAsync(async (request, response) => {
    if (!request.body.title || !request.body.url) {
      return response.status(400).end();
    }
    const blog = new Blog(request.body);
    const newBlog = await blog.save();
    response.status(201).json(newBlog);
  })
);

module.exports = router;
