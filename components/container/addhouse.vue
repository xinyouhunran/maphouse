<template>
	<div>
		<xheader />
		<div id="backmap"></div>
		<div style="margin:0 1rem;position:relative;overflow:hidden;">
		<!-- <form id="uploadForm" action="http://localhost:1701/upload" enctype="multipart/form-data" ref="form"> -->
		<form id="uploadForm">
		<label for="">请选择城市</label>
			<select style="width:10rem;text-align:center;color:#aaa;" v-model="city">
				<option v-for="a in cityarr" :value="a">{{a}}</option>
			</select>
		<div>
			<label for="">区县</label><input type="text" placeholder="涉及到区或县" v-model="address" required>
		</div>
		<div>
			<label for="">房名</label><input type="text" placeholder="房源名称" v-model="hname" required>
		</div>
		<div>
			<label for="">大小</label><input type="number" placeholder="平米" v-model="size" required>
		</div>
		<div>
			<label for="">规格</label><input type="text" placeholder="如三室一厅" v-model="guige" required>
		</div>
		<div>
			<label for="">价格</label><input type="number" placeholder="万" v-model="price" required>
		</div>
		<div>
			<label for="">信息</label><input type="text" placeholder="描述" v-model="message" required>
		</div>
		<div>
			<label for="">电话</label><input type="text" placeholder="号码" v-model="host" required disabled>
		</div>
		<div>
			<label for="">图片</label><input type="file" id="file" name="house" multiple />
        	<input type="button" value="上传" @click="upload" />
		</div>
		<div>
			<label for="">证明</label><input type="file" multiple name="prove"/>
        	<input type="button" value="上传" @click="uploadsecond" />
		</div>
        <button type="button" @click.prevent="d">提交</button>
    	</form>
		
		</div>
		<xfooter />
	</div>
</template>

<script>
	import xheader from "../common/xheader.vue";
	import xfooter from "../common/xfooter.vue";
	import $ from "jquery";
	import "../../css/alert.css";
	export default{
		components:{
			xheader,
			xfooter
		},
		data(){
			return{
				map:"",
				city:"",
				cityarr:["重庆","北京","上海","天津"],
				address:"",
				size:"",
				guige:"",
				price:"",
				message:"",
				host:"",
				imgname:"",
				userid:0,
				hname:"",
				prove:""
			}
		},
		methods:{
			upload(){	
	            $.ajax({
	                url: "http://localhost:1701/upload",
	                type: "POST",
	                processData:false,
	                contentType:false,
	                cache:false,
	                data:new FormData($("#uploadForm")[0]),
	                success:(data)=>{
	                	if(data!=""){
	                		console.log(data);
	                		this.imgname = data;
	                		this.quealert("上传成功");
	                	}else{
	                		this.quealert("上传失败");
	                	}
	                	
	                }
	            })
			},
			uploadsecond(){	
	            $.ajax({
	                url: "http://localhost:1701/uploadsecond",
	                type: "POST",
	                processData:false,
	                contentType:false,
	                cache:false,
	                data:new FormData($("#uploadForm")[0]),
	                success:(data)=>{
	                	if(data!=""){
	                		console.log(data);
	                		this.prove = data;
	                		this.quealert("上传成功");
	                	}else{
	                		this.quealert("上传失败");
	                	}
	                	
	                }
	            })
			},
			d(){

				var _this = this;
				var str = "";
				var l=new BMap.LocalSearch(this.map);
				/*l.search("重庆沙坪坝区春华秋实");*/
				if(this.city!=""&&this.address!=""&&this.hanme!=""){
					str = this.city+this.address+this.hname;
					//获取地址的经纬度
					l.search(str);
					l.setSearchCompleteCallback(function(result){
						
						if(result.getPoi(0)){
							console.log(result.getPoi(0));
							console.log(result.getPoi(0).point);//lng,lat
							if(_this.size!=""&&_this.guige!=""&&_this.price!=""&&_this.message!=""&&_this.host!=""&&_this.imgname!=""&&_this.prove!=""){
								if(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(_this.host)){
									$.ajax({
										type:"post",
										url:"http://localhost:1701/finduser",
										data:{
											tel:_this.host
										},
										success:(data)=>{
											data = JSON.parse(data);
											if(data.length!=0){
												_this.userid = data[0].userid;
												/*_this.refs.from.submit();*/
												$.ajax({
													type:"post",
													url:"http://localhost:1701/addhouse",
													data:{
														hname:_this.hname,
														size:_this.size,
														city:_this.city,
														longitude:result.getPoi(0).point.lng,
														latitude:result.getPoi(0).point.lat,
														guige:_this.guige,
														price:_this.price,
														message:_this.message,
														userid:_this.userid,
														picture:_this.imgname,
														hprove:_this.prove
													},
													success:(data1)=>{
														if(data1=="1"){
															_this.quealert("房源发布成功")
														}
													}
												})
											}else{
												_this.alert("没有此电话对应的用户");
											}
										}
									})
								}else{
									_this.quealert("电话输入错误");
								}
							}else{
								_this.quealert('请完整填写所有信息');
							}
						}else{
							_this.qualert("未查找到所输入的房源");
						}	
					});	
				}else{
					_this.quealert('城市,区县或房名不能为空');
				}
			},
			quealert(val){
				var div = document.createElement('div');
	            div.className = 'alert';  
	            var but = document.createElement('button');
	            var p = document.createElement('p');
	            p.className = 'quep';
	            p.innerHTML = val;
	            div.appendChild(p);
	            but.innerHTML = '确定';
	            but.className = 'que';
	            div.appendChild(but); 
	            var div1 = document.createElement('div');
	            div1.className = 'meng';
	            div1.appendChild(div);
	            document.body.appendChild(div1);
	            but.onclick = function(){
	              div1.remove();
	            }
			}
		},
		mounted(){
			var map = new BMap.Map("backmap");
			this.map = map;
			if(sessionStorage.getItem("user")){
				this.host = sessionStorage.getItem("user");
			}else{
				this.quealert("您尚未登录，请先登录");
				this.$router.push({path:"xlogin"});
			} 
		}
	}
</script>

<style scoped>
form{
	margin: 1rem auto;
	width: 500px;
	border: 1px solid #64a131;
	padding-left: 116px;
	padding-bottom: 10px;
}
form select{
	height: 28px;
	padding: 6px 12px;
	margin-bottom: 26px;
}
form div {
  position: relative;
  margin-bottom: 26px;
  text-align: left;
}
form div:nth-of-type(8) input:last-of-type{
	width: 60px;
	padding: 0;
	line-height: 40px;
	height: 28px;
	margin-left: 20px;
}
form div:nth-of-type(9) input:last-of-type{
	width: 60px;
	padding: 0;
	line-height: 40px;
	height: 28px;
	margin-left: 20px;
}
form label {
  line-height: 40px;
  font-size: 16px;
  color: #64a131;
  margin-right: 30px;
}

form input {
  width: 300px;
  height: 28px;
  outline: none;
  border-radius: 0;
  color: #555;
  padding: 6px 12px;
  border: 1px solid #ccc;
  line-height: 40px;
}
button{
	width: 60px;
    padding: 6px 12px;
    color: #64a131;
    background: #fff;
    border-radius: 12px;
    margin-left: 170px;
}
</style>
