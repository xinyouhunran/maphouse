<template>
	<div>
		<div id="backmap"></div>
		<select style="width:10rem;text-align:center;color:#aaa;" v-model="city">
			<option v-for="a in cityarr" :value="a">{{a}}</option>
		</select>
		<form id="uploadForm">
        <input type="file" id="file" name="house" multiple />
        <input type="button" value="上传" @click="upload()" />
    	</form>
		<button @click="d">点击</button>
	</div>
</template>

<script>
	import $ from "jquery";
	export default{
		data(){
			return{
				map:"",
				city:"",
				cityarr:["重庆","北京","上海","天津"]
			}
		},
		methods:{
			upload(){
				console.log($("#uploadForm")[0])
	            $.ajax({
	                url: "http://localhost:1701/upload",
	                type: "POST",
	                processData:false,
	                contentType:false,
	                cache:false,
	                data:new FormData($("#uploadForm")[0]),
	                success:(data)=>{
	                	console.log(data);
	                }
	            })
			},
			d(){
				var l=new BMap.LocalSearch(this.map);
				l.setSearchCompleteCallback(function(result){
					console.log(result.getPoi(0));	
				});
				l.search("重庆沙坪坝区春华秋实");	
			}
		},
		mounted(){
			var map = new BMap.Map("backmap");
			this.map = map; 
		}
	}
</script>

<style scoped>
	
</style>
