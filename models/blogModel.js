const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    url: String,
    likes: Number
  },

  {
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.__v;
        delete ret._id;
      }
    },
    toObject: {
      virtuals: true
    }
  }
);

module.exports = mongoose.model('Blog', blogSchema);
