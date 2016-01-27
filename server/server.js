var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = require('./routes');
var app = express();
var port = process.env.PORT || 3000;
var session = require('express-session');
var morgan = require('morgan');
var cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  mongoose.connect('mongodb://localhost/speakEasy');
  // mongoose.connect('mongodb://c:c1d2@apollo.modulusmongo.net:27017/zIg4upod');
} else {
  mongoose.connect('mongodb://c:c1d2@apollo.modulusmongo.net:27017/zIg4upod');
}

app.use(cors());
app.use(morgan('dev'));
// app.use(bodyParser.json({type: 'application/*+json'}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'topsecret',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname + '../../client/public'));
app.listen(port, function () {
  console.log('Listening on port: ', port);
});

app.use('/', router);

