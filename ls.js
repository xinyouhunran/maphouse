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
//加载所有房源,价格从高到低
app.get("/priceHigh",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house order by price desc`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//加载所有房源,价格从低到高
app.get("/priceLow",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house order by price asc`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//加载所有房源,大小从大到小
app.get("/sizeHigh",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house order by size desc`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//加载所有房源,大小从小到大
app.get("/sizeLow",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house order by price asc`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//三室一厅
app.get("/threeone",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house where guige="三室一厅"`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//四室一厅
app.get("/fourone",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house where guige="四室一厅"`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//其他规格
app.get("/others",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house where guige!="三室一厅" and guige!="四室一厅"`;
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
        res.send(JSON.stringify(result));
    })
    
})
app.post("/register",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `insert into users(tel,password) values ('${req.body.phone}','${req.body.password}')`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log("执行");
        res.send("1");
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
//管理员登录验证
app.post("/blogin",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from managers where mnumber='${req.body.number}' and mpassword='${req.body.password}'`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//预约
app.post("/premeet",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str1 = `select * from appoint where hid=${req.body.hid} and userid=${req.body.userid}`;
    connection.query(str1,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
app.post("/mypremeet",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `insert into appoint(hid,userid) values (${req.body.hid},${req.body.userid})`;
            connection.query(str,function(error,result1){
                if(error) throw error;
                console.log("执行");
                res.send("1");
            }) 
})
//查看预约消息
app.post("/premessage",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from appoint where userid = ${req.body.userid}`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
       res.send(JSON.stringify(result)); 
    })
    
})
app.post("/mypremessage",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from appoint,house where appoint.userid = ${req.body.userid} and appoint.hid=house.hid`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
       res.send(JSON.stringify(result)); 
    })
    
})
app.listen(1701);
console.log("开启服务器");