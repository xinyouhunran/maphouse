<template>
	<div class="hea">
		<xheader />
		<div class="mine">
			<h2>个人中心</h2>
			<div style="margin-top:15px;">
				<p>账号:<span v-text="user"></span></p>
			</div>
			<form action="" id="fo1">
						<div>
							<label for="">密码</label><input type="password" v-model="password">
						</div>
						<div>
							<label for="">新密码</label><input type="password" v-model="newpassword">
						</div>
						<div>
							<a href="#/updatepass" @click="updatepass">提交</a>
						</div>
					</form>
		</div>
		<xfooter />
	</div>
</template>

<script>
	import xheader from "../common/xheader.vue";
	import xfooter from "../common/xfooter.vue";
	import "../../css/alert.css";
	import $ from "jquery";
	
	export default{
		components:{
			xheader,
			xfooter
		},
		data(){
			return {
				user:"",
				password:"",
				newpassword:""
			}
		},
		methods:{
			updatepass(){
				if(this.password!=""&&this.newpassword!=""){
					if(/^\w{6,}$/.test(this.password)&&/^\w{6,}$/.test(this.newpassword)){
						$.ajax({
							type:"post",
							url:"http://localhost:1701/updatepass",
							data:{
								tel:this.user,
								password:this.password,
								newpassword:this.newpassword
							},
							success:(data)=>{
								if(data=="ok"){
									this.quealert("修改成功");
								}else{
									this.quealert("修改失败");
								}
							}
						})
					}else{
						this.quealert("密码输入不符合要求");
					}
				}else{
					this.quealert("两次密码均不能为空");
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
			if(sessionStorage.getItem("user")){
				this.user = sessionStorage.getItem("user");
			}else{
				this.quealert("您尚未登录，请先登录");
				this.$router.push({path:"xlogin"});
			}
		}
	}
</script>

<style scoped>
.mine{
	width: 400px;
	margin: 0 auto;
	border: 1px solid #ccc;
	height: 400px;
}
.mine h2{
	text-align: center;
	font-size: 2rem;
	color: #64a131;
}
p{
	text-align: center;
	line-height: 20px;
	font-size: 1.5rem;
	color: #aaa;
}
p span{
	color: #64a131;
}
a {
  display: block;
  width: 106px;
  line-height: 48px;
  height: 48px;
  border-radius: 4px;
  color: #64a131;
  background-color: #fff;
  text-align: center;
  border: 1px solid #64a131;
  margin: 10px auto;
}
form{
	margin-top:68px;
}
form div {
  position: relative;
  margin-bottom: 26px;
  text-align: center;
}

 form label {
  line-height: 40px;
  font-size: 16px;
  color: #999999;
  margin-right: 30px;
}

 form input {
  width: 250px;
  height: 28px;
  outline: none;
  border-radius: 0;
  color: #555;
  padding: 6px 12px;
  border: 1px solid #ccc;
  line-height: 40px;
}
</style>