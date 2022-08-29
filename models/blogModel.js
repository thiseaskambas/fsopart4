const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    author: String,
    likes: { type: Number, default: 0 },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
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
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.__v;
        delete ret._id;
      }
    }
  }
);

module.exports = mongoose.model('Blog', blogSchema);
