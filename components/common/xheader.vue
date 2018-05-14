<template>
	<div>
	<div class="nav">
		<div class="navall">
			<div class="nav-l">
				<img src="../../images/logo1.jpg" class="logo" @click="reindex">
				<ul id="nav">
					<li><a href="#/maphouse">地图查房<span>Maphouse</span></a></li>
					<li><a href="#/houselist">推荐<span>Recommend</span></a></li>
					<li><a href="#/premeet">预约<span>Premeet</span></a></li>
					<li><a href="#/mine" v-text="user">我的<span>Mine</span></a></li>
				</ul>
			</div>
			<div class="nav-r">
				<div class="nav-r-l"><a href="#/xlogin" v-if="flag">登录</a></div>
				<div class="nav-r-r"><a href="#/xregister">注册</a></div>
			</div>
		</div>
	</div>
	</div>
</template>
<script>
	import "../../css/header.css";
	export default{
		data(){
			return {
				user:"我的",
				flag:true
			}
		},
		methods:{
			reindex(){
				this.$router.push({path: "maphouse"});
			}
		},
		mounted(){
			if(sessionStorage.getItem("user")){
				this.user = sessionStorage.getItem("user");
				this.flag = false;
			}
		}
	}
</script>
