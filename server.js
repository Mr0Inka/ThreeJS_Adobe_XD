var baseAddress = "localhost:8080/"

var express = require('express');
var app = express();
var path = require('path');

var fs = require("fs");

var list;

app.use(express.static('assets'));
app.use(express.static('pageimg'));



app.get("/list", (req, res, next) => {
	var files = [];
    fs.readdirSync("./assets/model/").forEach(file => {
      	 files.push(file);
    })
    res.json(files);
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index_2.html'));
});

app.listen(8080);
