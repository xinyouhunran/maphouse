<template>
	<div id="back">
		<div class="nav">
			<div class="navall">
				<div class="nav-l">
					<img src="../../images/logo1.jpg" class="logo">
				</div>

				<h1>欢迎进入贴心二手房后台系统</h1>
			</div>
		</div>
		<div class="session-content">
		<div class="login">
			<p class="member">管理员登录</p>
			<div class="login-s">
				<div class="login-s-r">
					<form action="" id="fo1">
						<div>
							<label for="">账号</label><input type="text"  v-model="number">
						</div>
						<div>
							<label for="">密码</label><input type="password" id="pass" name="pass" v-model="password">
						</div>
						<div>
							<a href="#/blogin" id="loginbtn" @click="mLogin">登录</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
		<div style="clear:both;padding-top:2rem;">
			<div class="foot-b">
				<p>版权所有 ©2018贴心二手房商务有限公司  保留所有权利 | 渝ICP备12042163</p>
				<p>贴心二手房网</p>
				<div>
					<a href="##"><img src="../../images/gs.gif" alt=""></a>
					<a href="##"><img src="../../images/wg.png" alt=""></a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import "../../css/header.css";
	import "../../css/footer.css";
	import "../../css/alert.css";
	import $ from "jquery";
	export default{
		data(){
			return{
				number:"",
				password:""
			}
		},
		methods:{
			mLogin(){
				var _this = this;
				console.log(_this.number,_this.password);
				if(/^\d{8}$/.test(_this.number)&&/^\w{6,}$/.test(_this.password)){
					$.ajax({
						type:"POST",
						url:"http://localhost:1701/blogin",
						data:{
							number:_this.number,
							password:_this.password
						},
						success:function(result){
							var result = JSON.parse(result);
							console.log(result);
							if(result.length!=0){
								sessionStorage.setItem("manager",`${result[0].mnumber}`);
								_this.$router.push({path: "backstage"});
							}else{
								console.log(2);
							}
						}
					})
				}else{
					_this.quealert("手机号或密码输入错误");
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
			
		}
	}
</script>
<style scoped>
.nav{
	background-color: #64a131;
}
.navall h1{
	    text-align: center;
	    line-height: 8rem;
	    color: #fff;
	    float: left;
	    margin: 0 auto;
	    width: 70%;
	    font-size: 4rem;
}
.login{
	width: 40rem;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #ccc;
    padding: 2rem;
}
.login .member{
	  font-size: 20px;
	  color: #999999;
	  padding-top: 15px;
	  padding-bottom: 16px;
	  border-bottom: 1px solid #ccc;
	  margin-bottom: 36px;
}
.login .login-s .login-s-r form {
  margin-top: 75px;
}

.login .login-s .login-s-r form div {
  position: relative;
  margin-bottom: 26px;
  text-align: right;
}

.login .login-s .login-s-r form div:nth-of-type(3) {
  text-align: center;
}

.login .login-s .login-s-r form label {
  line-height: 40px;
  font-size: 16px;
  color: #999999;
  margin-right: 30px;
}

.login .login-s .login-s-r form input {
  width: 300px;
  height: 28px;
  outline: none;
  border-radius: 0;
  color: #555;
  padding: 6px 12px;
  border: 1px solid #ccc;
  line-height: 40px;
}

.login .login-s .login-s-r form .checkb {
  width: 18px;
  height: 18px;
  position: absolute;
  top: 12px;
  left: 175px;
}

.login .login-s .login-s-r form a {
  display: inline-block;
  width: 106px;
  line-height: 48px;
  height: 48px;
  border-radius: 4px;
  color: #64a131;
  background-color: #fff;
  text-align: center;
  border: 1px solid #64a131;
}

.login .login-s .login-s-r form a:nth-of-type(1) {
  background: #64a131;
  color: #fff;
}
</style>