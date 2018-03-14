var express = require("express");
var app = express();
var mysql = require("mysql");
var url = require("url");
var multer = require ("multer");
var querystring  = require("querystring");
app.use(express.static('../images'));
app.listen(1701);
console.log("开启服务器");