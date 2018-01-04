var express         = require('express'),
    app             = express(),
    port            = process.env.PORT || 4001.
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    passportLM      = require('passport-local-mongoose'),
    passportlocal   = require('passport-local'),
    methodOverride  = require('method-override'),
    request         = require('request'),
    morgan          = require('morgan'),
    User            = require("./models/user"),
    weatherModel    = require("./models/weather"),
    weatherAPI      = require("./apiK/keys.js")
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
//
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
//below defines currentUser on all routes
// app.use(function(req, res, next){
//     res.locals.currentUser = req.user;
//     next();
// })


app.get('/', function(req, res){
  res.render('landing')
});
app.get('/setup', function(req, res){
  res.render('setup')
})
app.get('/menu', function(req, res){


})
  app.post('/setup', function(req, res){
console.log(req.body.username);
      User.create({username: req.body.username, password:req.body.password}, function(err, User){
        if(err){
          console.log(err);
          res.redirect('/setup')
        } console.log(User);
          res.redirect('/menu')

      })
})
//weather capture run every 15 minutes
function weatherGetter(){
  //current date-time
  var currentdate = new Date();
  var datetime =
                   (currentdate.getMonth()+1)  + "/"
                  + currentdate.getDate() + "/"
                  + currentdate.getFullYear() + " @ "
                  + currentdate.getHours() + ":"
                  + currentdate.getMinutes() + ":"
                  + currentdate.getSeconds();
  const url = 'http://api.openweathermap.org/data/2.5/weather?zip=59936,us&appid='+weatherAPI+'&units=imperial';
  request(url, function (err, response, body){
    if(err){
      console.log('error:', error);
    } else {
      console.log('starting get weather data at '+ datetime )
      let weather = JSON.parse(body);
        weatherModel.create(weather);
        console.log('weather task finished.')
    }
  })
};
var minutes = 10, getterTime = minutes * 60 * 1000;
weatherGetter();
setInterval(weatherGetter, getterTime);





app.listen(port);
console.log("up and running on port " + port);
