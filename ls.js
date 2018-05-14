var express = require("express");
var app = express();
var mysql = require("mysql");
var url = require("url");
var multer = require ("multer");
var querystring  = require("querystring");
var test=require("./test/test.js");
app.use(express.static('../images'));
app.use("/api",test);
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

var storage = multer.diskStorage({
    //存储文件地方
    destination:function(req,res,cb){
        cb(null,"./public/images");
    },
    //存储文件名字
    filename: function (req, file, cb) {
        var fileFormat = file.originalname.split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1])
    }
})
//配置上传参数
var upload = multer({
    storage:storage
})
app.post("/upload",upload.any(),function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    /*var str="";
    req.on("data",function(data){
        str+=data;
    });
    req.on("end",function(){
        console.log(str);
    });*/
    if(req.files.length==0){
        res.send('');
    }else{
        res.send(req.files[0].filename);
    }
})
app.post("/uploadsecond",upload.any(),function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    if(req.files.length==0){
        res.send('');
    }else{
        res.send(req.files[1].filename);
    }
})
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
    var str = `select * from house where state=0`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//加载所有房源,价格从高到低
app.get("/priceHigh",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house where state=0 order by price desc`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//加载所有房源,价格从低到高
app.get("/priceLow",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house where state=0 order by price asc`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//加载所有房源,大小从大到小
app.get("/sizeHigh",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house where state=0 order by size desc`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//加载所有房源,大小从小到大
app.get("/sizeLow",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house where state=0 order by size asc`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//三室一厅
app.get("/threeone",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house where state=0 and guige="三室一厅"`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//四室一厅
app.get("/fourone",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house where state=0 and guige="四室一厅"`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//其他规格
app.get("/others",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house where state=0 and guige!="三室一厅" and guige!="四室一厅"`;
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
    var str = `select * from managers where mnumber='${req.body.number}' and mpassword='${req.body.password}' and delflag=0`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//预约
app.post("/premeet",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str1 = `select * from house where hid=${req.body.hid} and userid=${req.body.userid}`;
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
    var str = `select * from appoint,house,users where appoint.userid = ${req.body.userid} and appoint.hid=house.hid and house.userid=users.userid`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
       res.send(JSON.stringify(result)); 
    })
    
})
//删除预约
app.post("/delpre",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `delete from appoint where hid=${req.body.hid} and userid=${req.body.userid}`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
       res.send("1"); 
    })
})
//根据房名查找房源
app.post("/findhname",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house where hname like '%${req.body.hname}%' and state=0`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
       res.send(JSON.stringify(result)); 
    })
    
})
//根据房主id查找房源
app.post("/findidhouse",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house where userid =${req.body.userid}`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
       res.send(JSON.stringify(result)); 
    })
    
})
//根据state查找房源
app.get("/findcheckhouse",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from house where state=1`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
       res.send(JSON.stringify(result)); 
    })
    
})
//检查房源
app.post("/checkhouse",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `update house set state=${req.body.sta} where hid=${req.body.hid}`;
    connection.query(str,function(error,result){
        if(error){
            res.send("err");
        }else{
            if(result.affectedRows>0){
                res.send("ok");
            }else{
                res.send("err");
            }
        }
    })
})
//删除房子
app.post("/delhouse",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `delete from house where hid=${req.body.hid}`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
       res.send("1"); 
    })
})
//查找所有管理员
app.get("/getManager",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from managers where delflag=0`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})
//查找id最大的管理员并在之后添加
app.get("/getmaxmid",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from managers order by mid asc`;
    connection.query(str,function(error,result){
        if(error){
            res.send("err");
        }else{
           console.log(result);
            var mid = result[result.length-1].mid+1;
            var mnumber = String4num(mid);
            console.log(mnumber);
            var str1 = `insert into managers(mid,mnumber,mpassword,state,delflag) values (${mid},'${mnumber}','123456',0,0)`;
            connection.query(str1,(error,result)=>{
                if(error){
                    res.send("err");
                }else{
                    res.send("ok");
                }
            })
            /*res.send(JSON.stringify(result)); */
        }   
    })
})
//根据账号查找管理员
app.post("/findmnumber",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from managers where mnumber = '${req.body.mnumber}' and delflag=0`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
       res.send(JSON.stringify(result)); 
    })
    
})
//删除管理员
app.post("/delmanager",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `update managers set delflag=1 where mid=${req.body.mid}`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
       res.send("1"); 
    })
})
//根据电话查找用户
app.post("/finduser",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from users where tel = '${req.body.tel}'`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
       res.send(JSON.stringify(result)); 
    })
    
})
//添加房源
app.post("/addhouse",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var imgstr = `images/${req.body.picture}`;
    var provestr = `images/${req.body.hprove}`;
    console.log(req.body);
    var str = `insert into house(hname,size,city,longitude,latitude,guige,direction,price,message,userid,state,picture,hprove) values ('${req.body.hname}','${req.body.size}','${req.body.city}','${req.body.latitude}','${req.body.longitude}','${req.body.guige}','朝东','${req.body.price}','${req.body.message}',${req.body.userid},1,'${imgstr}','${provestr}')`;
            connection.query(str,function(error,result1){
                if(error) throw error;
                console.log("执行");
                res.send("1");
            }) 
})

//修改密码
app.post("/updatepass",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `update users set password='${req.body.newpassword}' where password='${req.body.password}' and tel='${req.body.tel}'`;
    connection.query(str,function(error,result){
        if(error){
            res.send("err");
        }else{
            if(result.affectedRows>0){
                res.send("ok");
            }else{
                res.send("err");
            }
        }
    })
    
})
//查找所有用户
app.get("/findalluser",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `select * from users`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
       res.send(JSON.stringify(result)); 
    })
    
})
//删除用户
app.post("/deluser",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var str = `delete from users where userid=${req.body.userid}`;
    connection.query(str,function(error,result){
        if(error) throw error;
        console.log(result);
       res.send("1"); 
    })
})
//修改管理员密码
app.post("/updatempass",function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    console.log(req.body);
    var str = `update managers set mpassword='${req.body.newpassword}' where mpassword='${req.body.password}' and mnumber='${req.body.mnumber}'`;
    console.log(str);
    connection.query(str,function(error,result){
        if(error){
            res.send("err");
        }else{
            console.log(result.affectedRows);
            if(result.affectedRows>0){
                res.send("ok");
            }else{
                res.send("err");
            }
        }
    })
    
})

function String4num(num){
    var n = ''+num;
    console.log(n)
    if(n.length==3){
        return '0'+n;
    }else if(n.length==2){
        return '00'+n;
    }else if(n.length==1){
        return '000'+n;
    }else{
        return num;
    }
}
app.listen(1701);
console.log("开启服务器");