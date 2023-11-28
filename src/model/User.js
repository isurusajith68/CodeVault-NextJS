var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  author: {
    type: String
  }
});

//Cannot overwrite `User` model once compiled.
const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User;
