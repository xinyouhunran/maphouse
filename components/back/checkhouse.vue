<template>
	<div>
		<form action="">
			<div style="width:22%;margin:0 auto;">
				<label for="">您将对房源进行审核</label>
			</div>
		</form>
		<table>
			<thead>
				<tr>
					<th>名称</th><th>大小</th><th>城市</th><th>经度</th><th>纬度</th><th>规格</th><th>价格</th><th>信息</th><th>图片</th><th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in house">
					<td v-text="i.hname"></td>
					<td v-text="i.size"></td>
					<td v-text="i.city"></td>
					<td v-text="i.longitude"></td>
					<td v-text="i.latitude"></td>
					<td v-text="i.guige"></td>
					<td v-text="i.price"></td>
					<td v-text="i.message"></td>
					<td><img :src="i.picture" alt=""></td>
					<td><span @click="checkhouse(i.hid,0)">审核通过</span><span @click="checkhouse(i.hid,2)">审核失败</span></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	import $ from "jquery";
	import "../../css/alert.css";
	export default{
		data(){
			return {
				house:[],
				hname:""
			}
		},
		methods:{
			checkhouse(id,num){
				var _this = this;
				
					$.ajax({
						type:"post",
						url:"http://localhost:1701/checkhouse",
						data:{
							hid:id,
							sta:num
						},
						success:function(data){
							if(data=="ok"){
								_this.quealert("操作成功");
								/*_this.$router.push({path:"xhouse?n=1"});*/
								_this.house=_this.house.filter((val)=>{
								return val.hid!=id;	
							});
							}else{
								_this.quealert("操作失败");
								/*_this.$router.push({path:"xhouse?n=1"});*/
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
			var _this = this;
			$.ajax({
				type:"get",
				url:"http://localhost:1701/findcheckhouse",
				success:function(data){
					data = JSON.parse(data);
					if(data.length!=0){
						for(var i in data){
							_this.house.push(data[i]);
						}
					}else{
						_this.quealert("没有需要审核的房源");
						_this.$router.push({path:"checkhouse"});
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
table thead tr th:nth-of-type(9){
	width:8rem;
}
table tbody tr td{
	text-align: center;
	border: 1px solid #fff;
}
table tbody tr td img{
	width: 6rem;
	height: 6rem;
}
table tbody tr td span{
	padding: 5px;
	border: 1px solid #fff;
	cursor:pointer;
	display: inline-block;
	width: 50%;
}
</style>