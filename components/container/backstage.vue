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
		<div id="content">
			<ul id="nav">
				<li>
					<h2 @click="changeNum(1)">房源</h2>
					<div class="housenav" v-show="num==1">
						<a href="#/backstage/xhouse">展示房源</a>
						<a href="#/backstage/deletehouse">删除房源</a>
					</div>
				</li>
				<li>
					<h2 @click="changeNum(2)">用户</h2>
					<div class="usernav" v-show="num==2">
						<a href="">查询用户</a>
						<a href="">删除用户</a>
					</div>
				</li>
				<li>
					<h2 @click="changeNum(3)">管理员</h2>
					<div class="usernav" v-show="num==3">
						<a href="">查询管理员</a>
						<a href="">添加管理员</a>
						<a href="#/backstage/deletemanager">删除管理员</a>
					</div>
				</li>
			</ul>
			<div class="con-r">
				<router-view></router-view>	
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
	import $ from "jquery";
	export default{
		data(){
			return{
				num:1,//记录二级导航的显示和隐藏
			}
		},
		methods:{
			changeNum(num){
				this.num = num;
				if(num==2){
					this.$router.push({path: "xuser"});
				}else if(num==3){
					this.$router.push({path: "xmanager"});
				}else{
					this.$router.push({path: "xhouse"});
				}
				
			}
		},
		mounted(){
			if(sessionStorage.getItem("manager")){

			}else{
				this.$router.push({path:"../blogin"});
			}
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
#content{
	width: 80%;
	overflow: hidden;
	margin: 0 auto;
}
#content #nav{
	float: left;
	width: 20%;
}
#content #nav li{
	width: 100%;
	text-align: center;
	line-height: 4rem;
	margin-top: 0.5rem;
	color: #fff;
	font-size: 2rem;
	position: relative;
}
#content #nav li h2{
	border-radius: 10rem;
    height: 4rem;
    background: #64a131;
}   
#content #nav li .housenav{
	
}
#content #nav li .housenav a{
	display: block;
	color: #64a131;
}
#content #nav li .usernav a{
	display: block;
	color: #64a131;
}
#content .con-r{
	margin-top: 0.5rem;
	float: right;
	width: 78%;
	height: 34rem;
	background-color: #64a131;
	color: #fff;
	overflow-y: auto;
}
</style>