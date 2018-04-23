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
//要用req.body,需要引入此模块
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
//登录验证
app.post("/mylogin",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from users where tel='${req.body.phone}' and password='${req.body.password}'`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//注册验证
app.post("/myRegister",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str1 = `select * from users where tel='${req.body.phone}'`;
    connection.query(str1,function(error,result){
        if(error) throw error;
        console.log(result);
        if(result==[]){
           var str = `insert into users(tel,password) values ('${req.body.phone}','${req.body.password}')`;
            connection.query(str,function(error,result){
                if(error) throw error;
                console.log("执行");
                res.send("1");
            }) 
        }else{
            res.send("0");
        }
    })
    
})
//详情页加载
app.post("/detial",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house where hid=${req.body.hid}`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
app.listen(1701);
console.log("开启服务器");