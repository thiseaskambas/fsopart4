const express = require('express');
const Blog = require('../models/blogModel');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.get(
  '/',
  catchAsync(async (request, response, next) => {
    const blogs = await Blog.find({});
    response.json(blogs);
  })
);

router.post(
  '/',
  catchAsync(async (request, response, next) => {
    if (!request.body.title || !request.body.url) {
      return response.status(400).end();
    }
    const blog = new Blog(request.body);
    const newBlog = await blog.save();
    response.status(201).json(newBlog);
  })
);

router.delete(
  '/:id',
  catchAsync(async (request, response, next) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
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
