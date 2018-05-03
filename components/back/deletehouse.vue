<template>
	<div>
		<form action="">
			<div>
				<label for="">您可以根据名称查询:</label><input type="text"  v-model="hname">
				<button type="button" @click="findhname">查询</button>
			</div>
		</form>
		<table>
			<thead>
				<tr>
					<th>序号</th><th>名称</th><th>大小</th><th>城市</th><th>经度</th><th>纬度</th><th>规格</th><th>价格</th><th>信息</th><th>图片</th><th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in house">
					<td v-text="i.hid"></td>
					<td v-text="i.hname"></td>
					<td v-text="i.size"></td>
					<td v-text="i.city"></td>
					<td v-text="i.longitude"></td>
					<td v-text="i.latitude"></td>
					<td v-text="i.guige"></td>
					<td v-text="i.price"></td>
					<td v-text="i.message"></td>
					<td><img :src="i.picture" alt=""></td>
					<td @click="del(i.hid)">删除</td>
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
				house:[],
				hname:""
			}
		},
		methods:{
			del(id){
				$.ajax({
					type:"post",
					url:"http://localhost:1701/delhouse",
					data:{
						hid:id
					},
					success:(data)=>{
						if(data=="1"){
							this.house = this.house.filter((val)=>{
								return val.hid!=id;
							})
						}
					}
				})
			},
			findhname(){
				var _this = this;
				if(this.hname!=""){
					$.ajax({
						type:"post",
						url:"http://localhost:1701/findhname",
						data:{
							hname:_this.hname
						},
						success:function(data){
							data = JSON.parse(data);
							if(data.length!=0){
								_this.house = [];
								for(var i in data){
									
									_this.house.push(data[i]);
								}
							}else{
								_this.quealert("没有您所查找的房源信息");
							}
						}
					})
				}else{
					this.quealert("名称不能为空");
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
				url:"http://localhost:1701/getHouse",
				success:function(data){
					data = JSON.parse(data);
					for(var i in data){
						_this.house.push(data[i]);
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