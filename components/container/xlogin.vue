<template>
<div class="hea">
	<xheader />
	<div class="session-content">
		<div class="login">
			<p class="member">会员登录</p>
			<div class="login-s">
				<div class="login-s-r">
					<form action="" id="fo1">
						<div>
							<label for="">手机号</label><input type="text" id="phone"	name="phone">
						</div>
						<div>
							<label for="">密码</label><input type="password" id="pass" name="pass">
						</div>
						<div>
							<input type="checkbox" checked="checked" class="checkb"><label for="">记住密码</label>
						</div>
						<div>
							<a href="#/xlogin" id="loginbtn">登录</a>
							<a href="#/xregister">注册会员</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<xfooter />
</div>
	
</template>

<script>
	import xheader from "../common/xheader.vue";
	import xfooter from "../common/xfooter.vue";
	import $ from "jquery";
	export default{
		components:{
			xheader,
			xfooter
		},
	}
</script>

<style scoped>
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