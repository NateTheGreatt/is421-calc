var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , passportLocalMongoose = require('passport-local-mongoose');
/**
 * User Schema
 */

var User = new Schema({
  username: String,
  password: String,
  email: String,
  provider: String,
  user_type: String,
})
User.plugin(passportLocalMongoose);
mongoose.model('User', User)
