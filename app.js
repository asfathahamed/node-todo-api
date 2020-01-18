var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017", function(err, db) {
    if (err) throw err;
    dbObj = db.db('TodoData');
    dbObj.createCollection('TodoList', function(err, collection) {
        if (err) throw err;
        console.log('Collection Created');
        
        collection.insertOne({
            id: 1,
            task: 'My First Task'
        }, function(err, res) {
            if (err) throw err;
            console.log('Inserted')
        });
        collection.find({}).toArray(function(err, res) {
            if (err) throw err;
            console.log('result', res);
        })
    });
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
