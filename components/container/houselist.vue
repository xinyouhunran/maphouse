<template>
<div class="hea">
	<xheader />
	<div class="session-content">
		<div class="page-t">
			<div class="page-list">
				<h5>价格</h5>
				<div class="page-list-r">
					<div class="leftpart"><a href="#/houselist"><span>选择</span></a></div>
					<div class="rightpart">
						<a href="#/houselist" @click="priceHigh"><span :class="{green:flag==1}">从高到低</span></a>
						<a href="#/houselist" @click="priceLow"><span :class="{green:flag==2}">从低到高</span></a>
						
					</div>
				</div>
			</div>
			<div class="page-list">
				<h5>大小</h5>
				<div class="page-list-r">
					<div class="leftpart"><a href="#/houselist"><span>选择</span></a></div>
					<div class="rightpart">
						<a href="#/houselist" @click="sizeHigh"><span :class="{green:flag==3}">从大到小</span></a>
						<a href="#/houselist" @click="sizeLow"><span :class="{green:flag==4}">从小到大</span></a>
					</div>
				</div>
			</div>
			<div class="page-list">
				<h5>规格</h5>
				<div class="page-list-r">
					<div class="leftpart"><a href="#/houselist"><span>选择</span></a></div>
					<div class="rightpart">
						<a href="#/houselist" @click="threeone"><span :class="{green:flag==5}">三室一厅</span></a>
						<a href="#/houselist" @click="fourone"><span :class="{green:flag==6}">四室一厅</span></a>
						<a href="#/houselist" @click="others"><span :class="{green:flag==7}">其他</span></a>
					</div>
				</div>
			</div>
		</div>
		<div class="session-content middle">
			<ul class="list-ul middle-s">
          <li v-for="i in house">
          <a href="#/detial" @click="giveHid(i.hid)" >
            <div class="himg"><img :src="i.picture" alt=""></div>
            <div class="hcon">
              <p v-text="i.message"></p>
              <p>
                <span v-text="i.guige"></span>
                <span v-text="i.size"></span><span>平米</span>
                <span v-text="i.direction"></span>
                <span v-text="i.price"></span><span>万</span>
              </p>
              <p v-text="i.hname"></p>
              <p><span>查看详情</span></p>
            </div>
          </a>
        </li>
			</ul>
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
        house:[],
        flag:0
      }
    },
    methods:{
      giveHid(id){
        this.$store.state.hid = id;
        console.log(this.$store.state.hid);
      },
      priceHigh(){
        var _this = this;
        this.house = [];
        this.flag = 1;
        $.ajax({
            type:"GET",
            url:"http://localhost:1701/priceHigh",
            success:function(result){
              if(result){
                result = JSON.parse(result);
                for(var j in result){
                    _this.house.push(result[j]);
                }
              }
              console.log(_this.house);
            }
          })
      },
      priceLow(){
        var _this = this;
        this.house = [];
        this.flag = 2;
        $.ajax({
            type:"GET",
            url:"http://localhost:1701/priceLow",
            success:function(result){
              if(result){
                result = JSON.parse(result);
                for(var j in result){
                    _this.house.push(result[j]);
                }
              }
              console.log(_this.house);
            }
          })
      },
      sizeHigh(){
        var _this = this;
        this.house = [];
        this.flag = 3;
        $.ajax({
            type:"GET",
            url:"http://localhost:1701/sizeHigh",
            success:function(result){
              if(result){
                result = JSON.parse(result);
                for(var j in result){
                    _this.house.push(result[j]);
                }
              }
              console.log(_this.house);
            }
          })
      },
      sizeLow(){
        var _this = this;
        this.house = [];
        this.flag = 4;
        $.ajax({
            type:"GET",
            url:"http://localhost:1701/sizeLow",
            success:function(result){
              if(result){
                result = JSON.parse(result);
                for(var j in result){
                    _this.house.push(result[j]);
                }
              }
              console.log(_this.house);
            }
          })
      },
      threeone(){
        var _this = this;
        this.house = [];
        this.flag = 5;
        $.ajax({
            type:"GET",
            url:"http://localhost:1701/threeone",
            success:function(result){
              if(result){
                result = JSON.parse(result);
                for(var j in result){
                    _this.house.push(result[j]);
                }
              }else{
                _this.quealert("不存在");
              }
              console.log(_this.house);
            }
          })
      },
      fourone(){
        var _this = this;
        this.house = [];
        this.flag = 6;
        $.ajax({
            type:"GET",
            url:"http://localhost:1701/fourone",
            success:function(result){
              if(result){
                result = JSON.parse(result);
                for(var j in result){
                    _this.house.push(result[j]);
                }
              }else{
                _this.quealert("不存在");
              }
              console.log(_this.house);
            }
          })
      },
      others(){
        var _this = this;
        this.house = [];
        this.flag = 7;
        $.ajax({
            type:"GET",
            url:"http://localhost:1701/others",
            success:function(result){
              if(result){
                result = JSON.parse(result);
                for(var j in result){
                    _this.house.push(result[j]);
                }
              }else{
                _this.quealert("不存在");
              }
              console.log(_this.house);
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
            type:"GET",
            url:"http://localhost:1701/getHouse",
            success:function(result){
              if(result){
                result = JSON.parse(result);
                for(var j in result){
                    _this.house.push(result[j]);
                }
              }
              console.log(_this.house);
            }
          })
    }
	}
</script>

<style scoped>
.green{
  background-color: #64a131;
  color: #fff!important;
}
.yin {
  -webkit-box-shadow: 0 2px 8px rgba(230, 230, 230, 0.75);
  -moz-box-shadow: 0 2px 8px rgba(230, 230, 230, 0.75);
  -ms-box-shadow: 0 2px 8px rgba(230, 230, 230, 0.75);
  -o-box-shadow: 0 2px 8px rgba(230, 230, 230, 0.75);
  box-shadow: 0 2px 8px rgba(230, 230, 230, 0.75);
}

.page-t {
  padding-top: 26px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
}

.page-t .page-list {
  width: 100%;
  padding-bottom: 6px;
  padding-top: 12px;
  border-bottom: 1px solid #ccc;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
}

.page-t .page-list:after {
  content: "";
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.page-t .page-list h5 {
  color: #999999;
  line-height: 24px;
  margin-right: 20px;
  float: left;
  font-weight: 500;
}

.page-t .page-list .page-list-r {
  float: left;
  width: 1230px;
}

.page-t .page-list .page-list-r span {
  display: inline-block;
  font-size: 14px;
  height: 24px;
  padding-left: 9px;
  padding-right: 9px;
  line-height: 24px;
  text-align: center;
}

.page-t .page-list .page-list-r .leftpart {
  width: 48px;
  float: left;
}

.page-t .page-list .page-list-r .leftpart a {
  float: left;
  background: #64a131;
}

.page-t .page-list .page-list-r .leftpart a span {
  color: #fff;
}

.page-t .page-list .page-list-r .rightpart {
  float: left;
  width: 1182px;
}

.page-t .page-list .page-list-r .rightpart a span {
  color: #555;
}

.list-ul {
  margin-top: 27px;
}

.list-ul li {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
  transition: all 0.5s linear 0s;
}

.list-ul li:hover {
  -webkit-box-shadow: 0 0 20px #A5A5A5;
  -moz-box-shadow: 0 0 20px #A5A5A5;
  -ms-box-shadow: 0 0 20px #A5A5A5;
  -o-box-shadow: 0 0 20px #A5A5A5;
  box-shadow: 0 0 20px #A5A5A5;
}
.list-ul{overflow: hidden;}
.list-ul li{
  border-bottom: 1px solid #ddd;
  float: left;
  width: 33.33%;
}
.list-ul li a{
  display: block;
    width: 26rem;
    padding: 1rem 1rem;
    position: relative;
    color: #aaa;
}
.list-ul li a:after{content:"";clear:both;display:block;height:0;overflow: hidden;visibility: hidden;}
.list-ul li a{zoom:1;}
.list-ul li a .himg{
  float: left;
  margin-right: 1rem;
}
.list-ul li a .himg img{
  width: 6.5rem;
  height: 7.5rem;
}
.list-ul li a .hcon{
  float: left;
  width: 18rem;
}
.list-ul li a .hcon p:nth-of-type(1){
  color: #000;
  font-weight: 600;
  font-size: 1rem;
}
.list-ul li a .hcon p:nth-of-type(2) span:nth-of-type(5){
  color: red;
  margin-left: 4rem;
}
.list-ul li a .hcon p:nth-of-type(4) span{
  color: #64a131;
  border: 1px solid #64a131;
  text-align: center;
  padding: 0.2rem 0.8rem;
  display: inline-block;
  margin-top: 0.5rem;
}
</style>