var mongoose    = require("mongoose"),
    Schema      = mongoose.Schema;

var userSchema  = new mongoose.Schema({
  username: String,
  password: String
});

var User = mongoose.model('User', userSchema)
module.exports =  User;
