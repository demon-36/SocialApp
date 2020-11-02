var express = require('express'); 
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'password',
     database: 'social'
});
connection.connect(function (err){
    if(err)throw err;
    console.log("connected !");
    var sql = "CREATE TABLE if not exists users (firstName VARCHAR(255), lastName VARCHAR(255), username VARCHAR(255), password VARCHAR(255))";
    connection.query(sql, function (err, result){
        if(err)throw err;
        console.log(" Users table created");
    });
    var sq = "CREATE TABLE if not exists posts (username VARCHAR(255), postdata VARCHAR(255))";
    connection.query(sq, function (err, result){
        if(err)throw err;
        console.log(" Posts table created");
    });
});

app.post('/user/new', function(req, res, next){
  var query = connection.query('insert into users set ?', req.body, function(err, result) {
    if (err) {
      console.error(err);
      return res.send(err);
    }
    else {
      return res.send('Ok');
    }
  });
});

app.get('/user/login', async function(req, res, next){
  var uname = req.query.uname;
  var query = 'select * from users where username = ?';
  connection.query(query, [uname], function(err, result) {
    if (err) {
      console.error(err);
      return res.send(err);
    }
    else {
      if(result.length==0)return '';
      return res.send(result[0]);
    }
  });
});

app.post('/new/post', function(req, res, next){
  var query = connection.query('insert into posts set ?', req.body, function(err, result) {
    if (err) {
      console.error(err);
      return res.send(err);
    }
    else {
      return res.send('Ok');
    }
  });
});

app.get('/allposts', async function(req, res, next){
  var query = 'select * from posts';
  connection.query(query, function(err, result) {
    if (err) {
      console.error(err);
      return res.send(err);
    }
    else {
      return res.send(result);
    }
  });
});

//app.post('/like/post', function(req, res, next){
//  var query = connection.query('insert into posts (likes) where username = ? && postdata = ?', req.body.curruser, function(err, result) {
//    if (err) {
//      console.error(err);
//      return res.send(err);
//    }
//    else {
//      return res.send('Ok');
//    }
//  });
//});

console.log("Listening on localhost port 3000...")

app.listen(3000);
