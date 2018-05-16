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
						<a href="#/backstage/xhouse" :class="{red:n==1}" @click="changeN(1)">展示房源</a>
						<a href="#/backstage/deletehouse" :class="{red:n==2}" @click="changeN(2)">删除房源</a>
						<a href="#/backstage/checkhouse" :class="{red:n==3}" @click="changeN(3)">房源审核</a>
					</div>
				</li>
				<li>
					<h2 @click="changeNum(2)">用户</h2>
					<div class="usernav" v-show="num==2">
						<a href="#/backstage/xuser" :class="{red:n==4}" @click="changeN(4)">查询用户</a>
						<a href="#/backstage/deleteuser" :class="{red:n==5}" @click="changeN(5)">删除用户</a>
					</div>
				</li>
				<li>
					<h2 @click="changeNum(3)">管理员</h2>
					<div class="usernav" v-show="num==3">
						<a href="#/backstage/xmanager" :class="{red:n==6}" @click="changeN(6)">查询管理员</a>
						<a href="#/backstage" v-if="flag" @click="addmanager" :class="{red:n==7}">添加管理员</a>
						<a href="#/backstage/updatempass" :class="{red:n==8}" @click="changeN(8)">修改密码</a>
						<a href="#/backstage/deletemanager" v-if="flag" :class="{red:n==9}" @click="changeN(9)">删除管理员</a>
					</div>
				</li>
				<li>
					<h2 @click="exitb">退出登录</h2>
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
	import "../../css/alert.css";
	import $ from "jquery";
	export default{
		data(){
			return{
				num:1,//记录二级导航的显示和隐藏
				flag:true,
				n:1
			}
		},
		methods:{
			changeN(num){
				this.n = num;
			},
			changeNum(num){
				this.num = num;
				if(num==2){
					this.$router.push({path: "xuser"});
					this.n = 4;
				}else if(num==3){
					this.$router.push({path: "xmanager"});
					this.n = 6;
				}else{
					this.$router.push({path: "xhouse"});
					this.n = 1;
				}
				
			},
			exitb(){
				sessionStorage.removeItem("manager");
				this.$router.push({path:"../blogin"});
			},
			addmanager(){
				this.num = 1;
				this.n = 1;
				$.ajax({
					type:"get",
					url:"http://localhost:1701/getmaxmid",
					success:(data)=>{
						if(data=='ok'){
							this.quealert("添加成功");

						}else{
							this.quealert("添加失败");
						}
					}
				})
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
			//console.log(this.$store.state.sflag);
			if(sessionStorage.getItem("manager")){
				//console.log(2);
				if(this.$store.state.sflag==1){
					this.flag = true;
				}else{
					this.flag = false;
				}
			}else{
				this.$router.push({path:"../blogin"});
			}
		}
	}
</script>
<style scoped>
.red{
	color: red!important;
}
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
    cursor:pointer;
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