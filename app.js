var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var passport = require('passport');

var bodyParser = require('body-parser')

var auth = require('./routes/auth');
// var category =  require('./routes/category');
// var post =  require('./routes/post');

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

// var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect("mongodb://localhost:27017", function(err, db) {
//     if (err) throw err;
//     dbObj = db.db('TodoData');
//     dbObj.createCollection('TodoList', function(err, collection) {
//         if (err) throw err;
//         console.log('Collection Created');
        
//         collection.insertOne({
//             id: 1,
//             task: 'My First Task'
//         }, function(err, res) {
//             if (err) throw err;
//             console.log('Inserted')
//         });
//         collection.find({}).toArray(function(err, res) {
//             if (err) throw err;
//             console.log('result', res);
//         })
//     });
// });

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(passport.initialize());

app.use('/api/auth', auth);
// app.use('/api/category', category);
// app.use('/api/post', post);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
