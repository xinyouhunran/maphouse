var express=require("express");
var router=express.Router();

router.get("/",function(req,res){
	res.end("1");
});

module.exports=router;