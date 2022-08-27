const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Users must have a username'],
      maxLength: 20,
      minLength: 3,
      trim: true
    },
    name: {
      type: String,
      required: [true, 'Users must have a name'],
      maxLength: 20,
      minLength: 3,
      trim: true
    },
    passwordHash: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.__v;
        delete ret._id;
        delete ret.passwordHash;
      }
    }
  }
);

module.exports = mongoose.model('User', userSchema);
