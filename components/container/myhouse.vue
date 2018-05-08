<template>
<div class="hea">
	<xheader />
	<div class="session-content">
		<div class="carw">
			<div class="car-t">
				<div class="car-t-t">
					<p>我的房源</p>
					<a href="#/houselist">继续逛逛>></a>
				</div>
			</div>
			<div class="car-m">
				<div class="car-m-t">
					<div></div>
					<div><span>房子</span></div>
					<div><span>状态</span></div>
					<div><span>单价(万元)</span></div>
					<div><span>规格</span></div>
					<div><span>证明</span></div>
					<div><span>操作</span></div>
				</div>
				<div class="car-m-list">
					<ul id="shoplist">
						<li v-for="i in house">
							<div></div>
							<div><a href="#/detial" @click="giveHid(i.hid)"><img :src="i.picture" alt=""></a></div>
							<div>
								<p><a href="##" v-text="i.hname"></a></p>
							</div>
							<div>
								<p v-text="i.check"></p>
							</div>
							<div><p v-text="i.price"></p></div>
							<div><p v-text="i.guige"></p></div>
							<div><img :src="i.hprove" alt="" style="width:60px;height:80px;"></div>
							<div><p @click="delhouse(i.hid)" class="del">删除</p></div>
						</li>
					</ul>
				</div>
				<div class="car-m-b">
					<div class="jie">
						<!-- <span>已选择<em>件</em>商品  |  订单金额</span>
						<span>￥</span>
						<a href="##">去结算</a> -->
					</div>
				</div>
			</div>
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
				house:[]
			}
		},
		methods:{
      giveHid(id){
        this.$store.state.hid = id;
        console.log(this.$store.state.hid);
      },
      delhouse(id){
        var _this = this;
        $.ajax({
          type:"post",
          url:"http://localhost:1701/delhouse",
          data:{
            hid:id
          },
          success:function(data){
            if(data=="1"){
              _this.quealert("删除成功");
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
      $("#shoplist").on("click",".del",function(){
        $(this).parent().parent().remove();
      })
			var _this = this;
			if(sessionStorage.getItem("user")){
				$.ajax({
					type:"post",
					url:"http://localhost:1701/findidhouse",
					data:{
						userid:_this.$store.state.userid
					},
					success:function(data){
						data = JSON.parse(data);
						if(data.length==0){
							_this.quealert("您还没有发布房源");
						}else{
              _this.house = [];
							for(var i in data){
                if(data[i].state==0){
                  data[i].check="审核通过";
                }else if(data[i].state==1){
                  data[i].check="待审核";
                }else{
                  data[i].check="审核失败";
                }
                _this.house.push(data[i]);
              }
						}
					}
				})
			}else{
				_this.quealert("您尚未登录，暂时看不到预约消息");
				_this.$router.push({path:"xlogin"});
			}
		}
	}
</script>

<style scoped>
.yin {
  -webkit-box-shadow: 0 2px 8px rgba(230, 230, 230, 0.75);
  -moz-box-shadow: 0 2px 8px rgba(230, 230, 230, 0.75);
  -ms-box-shadow: 0 2px 8px rgba(230, 230, 230, 0.75);
  -o-box-shadow: 0 2px 8px rgba(230, 230, 230, 0.75);
  box-shadow: 0 2px 8px rgba(230, 230, 230, 0.75);
  border-bottom: 1px solid #f1f1f1;
}

.carw {
  width: 1000px;
  margin: 0 auto;
}

.carw .car-t {
  padding-top: 50px;
}

.carw .car-t .car-t-t {
  padding-left: 22px;
  height: 25px;
  background: url(../../images/icons.png) no-repeat -525px -330px;
}

.carw .car-t .car-t-t:after {
  content: "";
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.carw .car-t .car-t-t p {
  float: left;
  font-size: 20px;
  color: #555555;
  margin-left: 14px;
  line-height: 27px;
}

.carw .car-t .car-t-t a {
  float: right;
  font-size: 14px;
  color: #64a131;
  padding-top: 9px;
}

.carw .car-m {
  margin-top: 14px;
}

.carw .car-m .car-m-t {
  height: 50px;
  line-height: 50px;
  padding-left: 14px;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  color: #999999;
}

.carw .car-m .car-m-t:after {
  content: "";
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.carw .car-m .car-m-t div {
  float: left;
}

.carw .car-m .car-m-t div:nth-of-type(1) {
  width: 63px;
  height: 100%;
}

.carw .car-m .car-m-t div:nth-of-type(2) {
  margin-left: 96px;
}

.carw .car-m .car-m-t div:nth-of-type(3) {
  margin-left: 245px;
}

.carw .car-m .car-m-t div:nth-of-type(4) {
  margin-left: 75px;
}

.carw .car-m .car-m-t div:nth-of-type(5) {
  margin-left: 61px;
}

.carw .car-m .car-m-t div:nth-of-type(6) {
  margin-left: 93px;
}

.carw .car-m .car-m-t div:nth-of-type(7) {
  margin-left: 88px;
}

.carw .car-m .car-m-t div span {
  font-size: 14px;
}

.carw .car-m .car-m-list {
  border: 1px solid #ccc;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
}

.carw .car-m .car-m-list ul li {
  font-size: 14px;
  color: #333;
  height: 130px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
}

.carw .car-m .car-m-list ul li:after {
  content: "";
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.carw .car-m .car-m-list ul li div {
  float: left;
  position: relative;
  height: 100%;
}

.carw .car-m .car-m-list ul li div a {
  display: block;
}

.carw .car-m .car-m-list ul li div img {
  width: 100%;
  height: 110px;
}

.carw .car-m .car-m-list ul li div p {
  margin: 15px 0;
  margin-left: 15px;
}

.carw .car-m .car-m-list ul li div p a {
  height: 42px;
  color: #555555;
}

.carw .car-m .car-m-list ul li div:nth-of-type(5), .carw .car-m .car-m-list ul li div:nth-of-type(7) p {
  color: #64a131;
  font-size: 18px;
}

.carw .car-m .car-m-list ul li div:nth-of-type(1) {
  width: 23px;
  padding: 0 14px;
}

.carw .car-m .car-m-list ul li div:nth-of-type(2) {
  width: 110px;
  height: 110px;
  margin: 10px 0;
}

.carw .car-m .car-m-list ul li div:nth-of-type(3) {
  width: 260px;
}

.carw .car-m .car-m-list ul li div:nth-of-type(4) {
  width: 62px;
}

.carw .car-m .car-m-list ul li div:nth-of-type(5) {
  width: 168px;
  text-align: center;
}

.carw .car-m .car-m-list ul li div:nth-of-type(6) {
  width: 91px;
  height: 24px;
}

.carw .car-m .car-m-list ul li div:nth-of-type(6) span {
  width: 28px;
  height: 24px;
  background: #eee;
  color: #a6a6a6;
  text-align: center;
  line-height: 22px;
  cursor: pointer;
  display: inline-block;
}

.carw .car-m .car-m-list ul li div:nth-of-type(6) input {
  outline: none;
  width: 35px;
  height: 22px;
  border: 0px;
  text-align: center;
  line-height: 24px;
  padding: 0;
  background: #fff;
}

.carw .car-m .car-m-list ul li div:nth-of-type(7) {
  width: 120px;
  text-align: center;
}

.carw .car-m .car-m-list ul li div:nth-of-type(7) p {
  margin-left: 0;
}

.carw .car-m .car-m-list ul li div:nth-of-type(8) {
  width: 130px;
  text-align: center;
  cursor: pointer;
}

.carw .car-m .car-m-b {
  margin-top: 24px;
  padding-left: 14px;
  height: 50px;
  line-height: 50px;
  border: 1px solid #64a131;
  background: #f5ffed;
}

.carw .car-m .car-m-b .jie {
  float: right;
}

.carw .car-m .car-m-b .jie span {
  float: left;
  margin-left: 15px;
  font-size: 14px;
  color: #999999;
}

.carw .car-m .car-m-b .jie span:nth-of-type(2) {
  margin-left: 15px;
  font-size: 22px;
  color: #64a131;
  font-weight: bold;
}

.carw .car-m .car-m-b .jie span em {
  color: #64a131;
  font-style: normal;
  font-weight: bold;
}

.carw .car-m .car-m-b .jie a {
  float: left;
  width: 150px;
  height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  background: #64a131;
  cursor: pointer;
}

</style>