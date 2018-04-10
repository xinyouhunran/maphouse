var express = require("express");
var app = express();
var mysql = require("mysql");
var url = require("url");
var multer = require ("multer");
var querystring  = require("querystring");
app.use(express.static('../images'));
//连接数据库
var connection = mysql.createConnection({
		host:"localhost",
		user:"liusong",
		password:"123456",
		database:"maphouse"
	});
connection.connect();
//查预约
app.get("/test",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    connection.query(`select * from appoint`,function(error,result){
        if(error) throw error;
        console.log(1);
        console.log(result);
        res.send(JSON.stringify(result));
    })
})

//加载所有房源
app.get("/getHouse",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
app.listen(1701);
console.log("开启服务器");