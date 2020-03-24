const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  googleId: { type: String },
  facebookId: { type: String },
  provider: { type: String }
});

userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
