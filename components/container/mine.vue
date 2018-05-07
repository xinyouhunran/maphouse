<template>
	<div class="hea">
		<xheader />
		<div class="mine">
			<h2>个人中心</h2>
			<div style="margin-top:15px;">
				<p>账号:<span v-text="user"></span></p>
			</div>
			<div style="margin-top:55px;">
				<a href="#/maphouse" @click="exit">退出登录</a>
				<a href="#/updatepass">修改密码</a>
				<a href="#/addhouse">发布房源</a>
				<a href="#/myhouse">我的房源</a>
			</div>
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
				user:""
			}
		},
		methods:{
			exit(){
				sessionStorage.removeItem('user');
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
</style>