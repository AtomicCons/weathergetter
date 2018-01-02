var express         = require('express'),
    app             = express(),
    port            = process.env.PORT || 4001.
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    passportLM      = require('passport-local-mongoose'),
    passportlocal   = require('passport-local'),
    methodOverride  = require('method-override'),
    morgan          = require('morgan'),
    User            = require("./models/user")
    ;


app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/weatherget");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//session
app.use(require("express-session")({
  secret:"90adf7adsf8adf9jnc98dfasjasdf",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res){
  res.render('landing')
});
app.get('/setup', function(req, res){
  res.render('setup')
})
app.get('/menu', function(req, res){
  res.render('/menu')
})
app.post('/setup', function(req, res){
    var newUser = new User({username: req.body.username});

  })

app.listen(port);
console.log("up and running on port " + port);
