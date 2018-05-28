<template>	
	<div class="adver">
		<div class="h">
			<h1 v-text="htext"></h1>
			<h1 v-text="topic"></h1>
		</div>
		<a href="#/maphouse">跳过</a>
	</div>
</template>
<script>
	import $ from "jquery";
	export default{

		data(){
			return{
				htext:'贴心二手房',
				topic:'连接你我的心'
			}
		},
		mounted(){
			new Promise((resolve,reject)=>{
				setTimeout(()=>{
					this.htext = '您还在为找房子';
					this.topic = '犯愁吗？';
					resolve();
				},3000);			
			}).then(()=>{
				
				return new Promise((resolve,reject)=>{
					setTimeout(()=>{
						this.htext = '你是否对中介费用';
						this.topic = '存有抱怨？';
						resolve()
					},3000);
				})
				
			}).then(()=>{
				return new Promise((resolve,reject)=>{
					setTimeout(()=>{
						this.htext = '跟我来';
						this.topic = '我将解决您的烦恼';
						resolve();
					},3000);
				})
				
			}).then(()=>{
				setTimeout(()=>{
					this.$router.push({path:'maphouse'});
				},3000);
			})
			
		}
	}
</script>
<style scoped>
.adver{
	width: 100%;
	background: url('../../images/bannerV2.jpg') no-repeat;
	height: 650px;
	overflow: hidden;
	position: relative;
}
.h{
	width: 60%;
	margin: 17rem auto;
	text-align: center;
}
.h h1{
	font-size: 5rem;
	color: #fff;
	transition: all 1s linear 0s;
}
.adver a{
	position: absolute;
	display: block;
	right: 3rem;
	top: 3rem;
	color: #fff;
	border: 1px solid #fff;
	padding: 1rem 2rem;
	border-radius: 2rem;
	font-size: 1.5rem;
	font-weight: 800;
}
</style>