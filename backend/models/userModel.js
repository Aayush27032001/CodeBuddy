const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter your first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your first name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Password do not match',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified(this.password)) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.checkPassword(async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
