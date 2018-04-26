<template>
<div class="hea">
	<xheader />
	<div class="session-content intro" v-for="i in house">
		<div class="intro-head">
			<strong><a href="fruit.html">首页</a></strong>
			<span>><a href="##">房子</a>></span>
			<span class="tit"></span>
		</div>
		<div class="intro-m">
			<div class="intro-m-l">
				<ul class="bul">
					<!-- <img src="../imgs/sapple.jpg" alt=""> -->
					<!-- <img src="" alt=""> -->
          <img :src="i.picture" alt="">
				</ul>
			</div>
			<div class="intro-m-r">
				<div class="intro-m-r-h">
					<h3 class="mytitle"></h3>
					<p class="mystitle"></p>
				</div>
				<div class="intro-m-r-b">
					<div class="money">
						<div class="money-l"><h5>房价</h5><span class="myprice" v-text="i.price"></span><span>万</span></div>
					</div>
					<div class="guige">
						<h5>规格</h5>
						<span class="myguige" v-text="i.guige"></span>
					</div>
					<div class="number">
						<h5>大小</h5>
						<span v-text="i.size"></span><span>平米</span>
					</div>
					<div class="abut">
						<div class="buy"><a href="#/detial" @click="premeet">预约</a></div>
					</div>
				</div>
			</div>
		</div>
		<div class="intro-b">
			<div class="intro-b-l">
				<div class="intro-b-l-h"><span>房屋简介</span></div>
				<div class="mybimg">
					<p v-text="i.message"></p>
				</div>
			</div>
			<div class="intro-b-r">
				<h5>最近浏览过</h5>
				<ul class="liulan">
					<!-- <li>
						<div><a href="detial.html?"><img src="../imgs/sapple.jpg" alt=""></a></div>
						<p>123</p>
					</li> -->
				</ul>
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
      premeet(){
        var _this = this;
        if(sessionStorage.getItem("user")){
          console.log(_this.$store.state.userid,_this.$store.state.hid);
          $.ajax({
            type:"post",
            url:"http://localhost:1701/premeet",
            data:{
              userid:_this.$store.state.userid,
              hid:_this.$store.state.hid
            },
            success:function(data){
              data = JSON.parse(data);
              if(data.length==0){
                $.ajax({
                  type:"post",
                  url:"http://localhost:1701/mypremeet",
                  data:{
                    userid:_this.$store.state.userid,
                    hid:_this.$store.state.hid
                  },
                  success:function(data){
                    if(data=="1"){
                      _this.quealert("预约成功");
                    }
                  }
                })
              }else{
                _this.quealert("此房子您已经预约过了");
              }
            }
          })
        }else{
          _this.quealert("您尚未登录，请登录后再预约");
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
      if(this.$store.state.hid!=0){
          $.ajax({
          url:"http://localhost:1701/detial",
          type:"post",
          data:{
            hid:_this.$store.state.hid
          },
          success:function(data){
            data = JSON.parse(data);
            console.log(data);
            _this.house = data;
          }
        })
      }else{
        this.$router.push({path: "maphouse"});
      }    
    }
	}
</script>

<style scoped>
.intro {
  padding-top: 50px;
}

.intro .intro-head {
  font-size: 14px;
  margin-bottom: 20px;
}

.intro .intro-head strong a {
  color: #64a131;
}

.intro .intro-head span a {
  color: #64a131;
}

.intro .intro-m {
  zoom: 1;
  margin-bottom: 68px;
}

.intro .intro-m:after {
  content: "";
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.intro .intro-m .intro-m-l {
  float: left;
  width: 55%;
  height: 30rem;
  position: relative;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
}

.intro .intro-m .intro-m-l .sul {
  float: left;
  width: 140px;
  height: 560px;
}

.intro .intro-m .intro-m-l .sul li {
  cursor: pointer;
  width: 138px;
  height: 138px;
  margin-bottom: 2px;
  position: relative;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
}

.intro .intro-m .intro-m-l .sul li img {
  width: 100%;
  height: 100%;
}

.intro .intro-m .intro-m-l .bul {
  float: left;
  width: 30rem;
  height: 30rem;
  cursor: pointer;
}

.intro .intro-m .intro-m-l .bul img {
  width: 100%;
  height: 100%;
}

.intro .intro-m .intro-m-r {
  float: left;
  padding-left: 28px;
  width: 40%;
  padding-top: 20px;
}

.intro .intro-m .intro-m-r .intro-m-r-h {
  width: 470px;
}

.intro .intro-m .intro-m-r .intro-m-r-h h3 {
  color: #555555;
  line-height: 40px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 24px;
  font-weight: 500;
}

.intro .intro-m .intro-m-r .intro-m-r-h p {
  height: 48px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 16px;
  line-height: 48px;
  color: #999;
}

.intro .intro-m .intro-m-r .intro-m-r-b {
  position: relative;
  border-bottom: 1px solid #dddddd;
}

.intro .intro-m .intro-m-r .intro-m-r-b h5 {
  color: #999999;
  float: left;
  width: 60px;
  font-weight: 500;
  font-size: 14px;
  line-height: 31px;
}

.intro .intro-m .intro-m-r .intro-m-r-b span {
  float: left;
  width: 124px;
  font-size: 24px;
  color: #64a131;
  cursor: pointer;
}

.intro .intro-m .intro-m-r .intro-m-r-b .money {
  position: relative;
  width: 100%;
  height: 75px;
  padding-left: 10px;
  background: url(../../images/icons.png) no-repeat 0 -48px;
  margin-bottom: 20px;
  margin-right: 20px;
}

.intro .intro-m .intro-m-r .intro-m-r-b .money .money-l {
  float: left;
  position: absolute;
  top: 25px;
}

.intro .intro-m .intro-m-r .intro-m-r-b .money .money-r {
  float: right;
  width: 56px;
  height: 26px;
  margin-top: 25px;
}

.intro .intro-m .intro-m-r .intro-m-r-b .money .money-r img {
  width: 26px;
  height: 26px;
}

.intro .intro-m .intro-m-r .intro-m-r-b .guige {
  margin-bottom: 22px;
  padding-left: 10px;
  position: relative;
  height: 30px;
}

.intro .intro-m .intro-m-r .intro-m-r-b .number {
  margin-bottom: 22px;
  padding-left: 10px;
  position: relative;
  height: 30px;
}

.intro .intro-m .intro-m-r .intro-m-r-b .number .number-l {
  float: left;
}

.intro .intro-m .intro-m-r .intro-m-r-b .number .number-l #reduce, .intro .intro-m .intro-m-r .intro-m-r-b .number .number-l #add {
  width: 20px;
  display: block;
  height: 24px;
  border: 1px solid #64a131;
  font-size: 16px;
  text-align: center;
  background: #eee;
}

.intro .intro-m .intro-m-r .intro-m-r-b .number .number-l #numtxt {
  width: 30px;
  float: left;
  height: 24px;
  text-align: center;
  border: 1px solid #64a131;
}

.intro .intro-m .intro-m-r .intro-m-r-b .abut {
  margin-bottom: 22px;
  height: 36px;
}

.intro .intro-m .intro-m-r .intro-m-r-b .abut .buy {
  float: left;
  margin-right: 10px;
  margin-left: 70px;
}

.intro .intro-m .intro-m-r .intro-m-r-b .abut .buy a {
  display: block;
  width: 160px;
  height: 36px;
  font-size: 16px;
  text-align: center;
  line-height: 36px;
  border-radius: 4px;
  color: #7daf57;
  background: #f5ffed;
  border: 1px solid #64a131;
}

.intro .intro-m .intro-m-r .intro-m-r-b .abut .shopbtn1 {
  float: left;
}

.intro .intro-m .intro-m-r .intro-m-r-b .abut .shopbtn1 a {
  display: block;
  width: 160px;
  height: 36px;
  font-size: 16px;
  text-align: center;
  line-height: 36px;
  border-radius: 4px;
  color: #eff4ec;
  background: #64a131;
}

.intro .intro-m .intro-m-r .zhushi {
  margin-top: 22px;
  zoom: 1;
}

.intro .intro-m .intro-m-r .zhushi:after {
  content: "";
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.intro .intro-m .intro-m-r .zhushi div {
  width: 50%;
  float: left;
  margin-bottom: 10px;
}

.intro .intro-m .intro-m-r .zhushi div h5 {
  color: #999999;
  float: left;
  width: 60px;
  font-weight: 500;
  font-size: 14px;
  line-height: 31px;
  width: 30%;
}

.intro .intro-m .intro-m-r .zhushi div span {
  width: 70%;
  float: left;
  width: 124px;
  font-size: 14px;
  color: #555;
  line-height: 31px;
}

.intro .intro-b {
  zoom: 1;
}

.intro .intro-b:after {
  content: "";
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.intro .intro-b .intro-b-l {
  float: left;
  width: 1002px;
  border: 1px solid #ccc;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}

.intro .intro-b .intro-b-l .intro-b-l-h {
  width: 1000px;
  background: #f1f1f1;
}

.intro .intro-b .intro-b-l .intro-b-l-h:after {
  content: "";
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.intro .intro-b .intro-b-l .intro-b-l-h span {
  height: 39px;
  border-top: 3px solid #64a131;
  padding: 0 36px;
  background-color: #ffffff;
  text-align: center;
  line-height: 36px;
  float: left;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
}

.intro .intro-b .intro-b-l .mybimg {
  width: 1000px;
  padding: 2rem;
}

.intro .intro-b .intro-b-l .mybimg p {
  text-align: center;
  font-size: 3rem;
  line-height: 2rem;
  color: #64a131;
}

.intro .intro-b .intro-b-r {
  width: 278px;
  float: right;
  padding-left: 20px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
}

.intro .intro-b .intro-b-r h5 {
  color: #64a131;
  line-height: 39px;
  border-bottom: 1px solid #ccc;
}

.intro .intro-b .intro-b-r ul li {
  width: 260px;
  height: 91px;
  padding: 13px 0 8px 0;
  border-bottom: 1px solid #ccc;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
}

.intro .intro-b .intro-b-r ul li div {
  float: left;
}

.intro .intro-b .intro-b-r ul li div a {
  display: block;
}

.intro .intro-b .intro-b-r ul li div img {
  width: 70px;
  height: 70px;
  overflow: hidden;
}

.intro .intro-b .intro-b-r ul li p {
  float: left;
  padding-left: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #64a131;
  line-height: 78px;
  width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;
}
</style>