const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add username"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    match: [
      /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Please enter a valid email",
    ],
  },
  role: {
    type: String,
    enum: ["user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [6, "Password must be longer than 6 characters"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt Passwords
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", UserSchema);
