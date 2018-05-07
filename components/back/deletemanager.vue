<template>
	<div>
		<!-- <button @click="a">dasda</button> -->
		<form action="">
			<div>
				<label for="">您可以根据账号查询:</label><input type="text"  v-model="mnumber">
				<button type="button" @click="findmnumber">查询</button>
			</div>
		</form>
		<table>
			<thead>
				<tr>
					<th>序号</th><th>账号</th><th>状态</th><th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in manager">
					<td v-text="i.mid"></td>
					<td v-text="i.mnumber"></td>
					<td v-text="i.state"></td>
					<td @click="del(i.mid)" style="cursor:pointer">删除</td>
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
				manager:[],
				mnumber:"",
				flag:false,
			}
		},
		methods:{
			/*a(){
				fetch("/api",{
					method:"post"
					body:{}//post请求的数据
					headers:{"content-type":"application/x-www-form-urlencoded"}
				}).then(function(e){
					return e.text();
				}).then((e)=>{
					console.log(e);	
				});	
			},*/
			del(id){
				if(this.$store.state.sflag==1){
					$.ajax({
						type:"post",
						url:"http://localhost:1701/delmanager",
						data:{
							mid:id
						},
						success:(data)=>{
							if(data=="1"){
								this.manager=this.manager.filter((val)=>{
									return val.mid!=id;	
								});
							}
						}
					})
				}else{
					this.quealert("您不具有此项操作的权利");
				}
				
			},
			findmnumber(){
				var _this = this;
				if(this.mnumber!=""){
					$.ajax({
						type:"post",
						url:"http://localhost:1701/findmnumber",
						data:{
							mnumber:_this.mnumber
						},
						success:function(data){
							data = JSON.parse(data);
							if(data.length!=0){
								_this.manager = [];
								for(var i in data){
									
									_this.manager.push(data[i]);
								}
							}else{
								_this.quealert("没有您所查找的管理员信息");
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
			if(this.$store.state.sflag==1){
				this.flag == true;
			}else{
				this.flag == false;
			}
			var _this = this;
			$.ajax({
				type:"get",
				url:"http://localhost:1701/getManager",
				success:function(data){
					data = JSON.parse(data);
					for(var i in data){
						_this.manager.push(data[i]);
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
	margin-top: 1rem;
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