<template>
<div class="hea">
	<xheader />
	<div class="session-content">
		<div class="login">
			<p class="member">会员注册</p>
			<div class="login-s">
				<div class="login-s-r">
					<form action="" id="fo2">
						<div>
							<label for="">手机号</label><input type="text" id="phone"	name="phone" v-model="tel"><span class="iconerror"></span>
						</div>
						<div>
							<label for="">密码</label><input type="password" id="pass" name="pass" v-model="password"><span class="iconerror"></span>
						</div>
						<div>
							<label for="">确认密码</label><input type="password" id="quepass" name="quepass" v-model="quepass"><span class="iconerror"></span>
						</div>
						<div>
							<a href="#/xregister" class="regis" @click="myRegister">注册</a>
							<a href="#/xlogin">会员登录</a>
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
    data(){
      return {
        tel:"",
        password:"",
        quepass:""
      }
    },
    methods:{
      myRegister(){
        var _this = this;
        console.log(_this.tel,_this.password,_this.quepass);
        if(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(_this.tel)){
          if(/^\w{6,}$/.test(_this.password)){
            if(_this.quepass==_this.password){
              $.ajax({
                type:"POST",
                url:"http://localhost:1701/myRegister",
                data:{
                  phone:_this.tel,
                  password:_this.password
                },
                success:function(result){
                  if(result=="1"){
                    alert("注册成功");
                  }else{
                    alert("用户已存在");
                  }
                }
              })
            }else{
              alert("两次密码不相等");
            }
          }else{
            alert("密码输入不符合要求");
          }
        }else{
          alert("电话号码不符合要求");
        }
      }
    }
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
.login .login-s .login-s-r #fo2 {
  margin-top: 0;
}

.login .login-s .login-s-r #fo2 div:nth-of-type(3) {
  text-align: right;
}

.login .login-s .login-s-r #fo2 #yanzheng {
  width: 270px;
  margin-right: 30px;
}

.login .login-s .login-s-r #fo2 #yan {
  position: absolute;
  right: 31px;
  border: 0;
  width: 60px;
  color: #64a131;
  font-size: 16px;
  top: 2px;
}

.login .login-s .login-s-r #fo2 .true {
  display: none;
}

.login .login-s .login-s-r #fo2 .false {
  display: block;
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