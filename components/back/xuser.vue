<template>
	<div>
		<!-- <button @click="a">dasda</button> -->
		<form action="">
			<div style="width:80%;margin:0 auto;">
				<label for="">您可以根据账号查询:</label><input type="text"  v-model="tel">
				<button type="button" @click="finduser">查询</button>
			</div>
		</form>
		<table>
			<thead>
				<tr>
					<th>序号</th><th>账号</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in user">
					<td v-text="i.userid"></td>
					<td v-text="i.tel"></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import $ from "jquery";
	export default{
		data(){
			return{
				user:[],
				tel:""
			}
		},
		methods:{
			finduser(){
				var _this = this;
				if(this.tel!=""){
					$.ajax({
						type:"post",
						url:"http://localhost:1701/finduser",
						data:{
							tel:_this.tel
						},
						success:function(data){
							data = JSON.parse(data);
							if(data.length!=0){
								_this.user = [];
								for(var i in data){
									
									_this.user.push(data[i]);
								}
							}else{
								_this.quealert("没有您所查找的用户信息");
							}
						}
					})
				}else{
					this.quealert("账号不能为空");
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
			var _this = this;
			$.ajax({
				type:"get",
				url:"http://localhost:1701/findalluser",
				success:function(data){
					data = JSON.parse(data);
					for(var i in data){
						_this.user.push(data[i]);
					}
				}
			})
		}
	}
</script>

<style scoped>
form{
	margin-top: 1rem;
}
form label {
  line-height: 40px;
  font-size: 16px;
  color: #fff;
  margin-right: 30px;
}

form input {
  width: 300px;
  height: 28px;
  outline: none;
  border-radius: 0;
  color: #555;
  padding: 6px 12px;
  border: 1px solid #ccc;
  line-height: 40px;
}
form button{
	height: 36px;
    padding: 4px;
    background: #fff;
    color: #64a131;
}
table{
	border-spacing: 0;
	margin: 1rem auto;
	border-collapse: collapse;
}
table thead tr th{
	padding: 2rem;
	border: 1px solid #fff;
}
table thead tr th:nth-of-type(10){
	width:8rem;
}
table tbody tr td{
	text-align: center;
	border:1px solid #fff;
}
table tbody tr td img{
	width: 4rem;
	height: 4rem;
}	
</style>