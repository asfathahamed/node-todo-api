var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var passport = require('passport');

var bodyParser = require('body-parser')

/** DB Code - Start */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TodoData', {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('Connected to DB'))
.catch(err => console.error(err));
/** DB Code - End */


var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(passport.initialize());

// app.use('/api/auth', auth);

var Kitten = require('./models/Kitty');

// Kitten - Silence
var silence = new Kitten({name: 'Silence'});
console.log(silence.name);

// Kitten - Fluffy
var fluffy = new Kitten({name: 'fluffy'});
fluffy.save(function(err, fluffy) {
  if (err) return console.log(err);
  fluffy.speak();
});

Kitten.find(function(err, kittens) {
  if (err) return console.log(err);
  console.log(kittens.map(kitty => kitty.name));
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
