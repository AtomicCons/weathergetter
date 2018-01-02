var mongoose    = require("mongoose"),
    passportLM  = require("passport-local-mongoose")
    ;
var userSchema  = new mongoose.Schema({
    username: String,
    password: String,
    registerd: {type: Date, default: Date.now}
});
userSchema.plugin(passportLM);
module.exports = mongoose.model("User", userSchema)
