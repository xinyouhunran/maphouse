<template>
	<div class="hea">
		<xheader />
		<div id="allmap"></div>
		<div id="r-result" style="float:left;color:#64a131;font-size:1rem;">
		城市名: <input id="cityName" type="text" style="width:16rem; margin-right:1rem;padding:0.5rem 0;outline:none;color:#aaa;" v-model="val"/>
		<input type="button" value="查询" @click="theLocation" style="padding:0.5rem 1rem;background:#64a131;color:#fff;border-radius:1rem;outline:none;cursor:pointer;"/>
		<h2 v-text="seacity"></h2>
		<select style="width:10rem;text-align:center;color:#aaa;" v-model="city" @change="changeCity">
			<option v-for="a in cityarr" v-text="a"></option>
		</select>
		<ul id="houselist">
				<li>
					<a href="##">
						<div class="himg"><img src="../../images/house0.jpg" alt=""></div>
						<div class="hcon">
							<p>此房看中庭绿化，主卧室看江，精装修住家舒适</p>
							<p>
								<span>三室两厅</span>
								<span>134平米</span>
								<span>东北</span>
								<span>120万</span>
							</p>
							<p>华润二十四城</p>
							<p><span>查看详情</span></p>
						</div>
					</a>
				</li>
				<li>
					<a href="##">
						<div class="himg"><img src="../../images/house1.jpg" alt=""></div>
						<div class="hcon">
							<p>此房看中庭绿化，主卧室看江，精装修住家舒适</p>
							<p>
								<span>三室两厅</span>
								<span>134平米</span>
								<span>东北</span>
								<span>120万</span>
							</p>
							<p>华润二十四城</p>
							<p><span>查看详情</span></p>
						</div>
					</a>
				</li>
				<li>
					<a href="##">
						<div class="himg"><img src="../../images/house1.jpg" alt=""></div>
						<div class="hcon">
							<p>此房看中庭绿化，主卧室看江，精装修住家舒适</p>
							<p>
								<span>三室两厅</span>
								<span>134平米</span>
								<span>东北</span>
								<span>120万</span>
							</p>
							<p>华润二十四城</p>
							<p><span>查看详情</span></p>
						</div>
					</a>
				</li>
				<li>
					<a href="##">
						<div class="himg"><img src="../../images/house1.jpg" alt=""></div>
						<div class="hcon">
							<p>此房看中庭绿化，主卧室看江，精装修住家舒适</p>
							<p>
								<span>三室两厅</span>
								<span>134平米</span>
								<span>东北</span>
								<span>120万</span>
							</p>
							<p>华润二十四城</p>
							<p><span>查看详情</span></p>
						</div>
					</a>
				</li>
				<li>
					<a href="##">
						<div class="himg"><img src="../../images/house1.jpg" alt=""></div>
						<div class="hcon">
							<p>此房看中庭绿化，主卧室看江，精装修住家舒适</p>
							<p>
								<span>三室两厅</span>
								<span>134平米</span>
								<span>东北</span>
								<span>120万</span>
							</p>
							<p>华润二十四城</p>
							<p><span>查看详情</span></p>
						</div>
					</a>
				</li>
		</ul>
		</div>
		<xfooter />
	</div>
	
</template>

<script>
	import xheader from "../common/xheader.vue";
	import xfooter from "../common/xfooter.vue";
	import $ from "jquery";
	export default{
		components:{
			xheader,
			xfooter
		},
		data(){
			return{
				map:"",//地图
				val:"",//搜索文本框的值
				house:[],//房子信息
				seacity:"",//搜索的城市
				city:"重庆",//显示城市
				cityarr:["重庆","北京","上海","天津"]//下拉菜单
			}
		},
		methods:{
			theLocation(){
				var _this = this;
				/*var city = document.getElementById("cityName").value;*/
				if(this.val != ""){
					_this.map.centerAndZoom(_this.val,11);     // 用城市名设置地图中心点
					_this.$store.state.city = _this.val;
					_this.seacity = _this.val;
					_this.city = _this.val;
					console.log(_this.$store.state.city);
					/*_this.$router.push({path:"/maphouse"});*/
				}
			},
			changeCity(){
				this.map.centerAndZoom(this.city,11);
				this.$store.state.city = this.city;
					this.seacity = this.city;
					console.log(this.$store.state.city);
			}
		},
		mounted(){
			$("#allmap").on("click","Button",function(e){
					console.log(1);
				})

			var _this = this;
			var map = new BMap.Map("allmap");  // 创建Map实例
			this.map = map;
			/*map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);*/  // 初始化地图,设置中心点坐标和地图级别
			//添加地图类型控件
			map.addControl(new BMap.MapTypeControl({
				mapTypes:[
		            BMAP_NORMAL_MAP,
		            BMAP_HYBRID_MAP
		        ]}));
		    console.log(_this.$store.state.city);
		    this.seacity = this.$store.state.city; 	  
			map.centerAndZoom(_this.$store.state.city,12);          // 设置地图显示的城市 此项是必须设置的
			map.enableScrollWheelZoom(true);//滑轮控制
			map.enableInertialDragging();

			map.enableContinuousZoom();
			map.addEventListener("click",function(e){
				console.log(e.point.lng + "," + e.point.lat);
			});
			//添加选择城市的控件  
			   map.addControl(new BMap.CityListControl({
	                anchor:BMAP_ANCHOR_TOP_RIGHT,
	                offset:new BMap.Size(10,40)
	                // 切换城市之间事件
	                // onChangeBefore: function(){
	                //    alert('before');
	                // },
	                // 切换城市之后事件
	                /*onChangeAfter:function(){
	                  
	                }*/
	            }));
			  // 添加定位控件
			  var geolocationControl = new BMap.GeolocationControl();
			  geolocationControl.addEventListener("locationSuccess", function(e){
			    // 定位成功事件
			    var address = '';
			    address += e.addressComponent.province;
			    address += e.addressComponent.city;
			    address += e.addressComponent.district;
			    address += e.addressComponent.street;
			    address += e.addressComponent.streetNumber;
			    alert("当前定位地址为：" + address);
			  });
			  geolocationControl.addEventListener("locationError",function(e){
			    // 定位失败事件
			    alert(e.message);
			  });
			  map.addControl(geolocationControl);  
			  /*var point = new BMap.Point(116.404, 39.915);
			  var marker = new BMap.Marker(point);
			  map.addOverlay(marker);
			  marker.setAnimation(BMAP_ANIMATION_BOUNCE);*/
			  //创建标记点的信息
			  /*var data_info = [[116.417854,39.921988,"地址：北京市东城区王府井大街88号乐天银泰百货八层"],
					 [106.53063501,29.54460611,"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" + 
	"<img style='float:right;margin:4px' id='imgDemo' src='../img/tianAnMen.jpg' width='139' height='104' title='天安门'/>" + 
	"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...</p>" + 
	"<button>详情</button>"+
	"</div>"],
					 [116.412222,39.912345,"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" + 
	"<img style='float:right;margin:4px' id='imgDemo' src='../img/tianAnMen.jpg' width='139' height='104' title='天安门'/>" + 
	"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...</p>" + 
	"<button>详情</button>"+
	"</div>"]
					];*/
					var data = [{
						weidu:116.417854,
						jingdu:39.921988,
						contents:"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>华润天城</h4>" + 
							"<img style='float:right;margin:4px' id='imgDemo' src='images/house0.jpg' width='139' height='104' title='华润天城'/>" + 
							"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...</p>" + 
							"</div>"
					},{
						weidu:106.53063501,
						jingdu:29.54460611,
						contents:"重庆市九龙坡区石桥铺大西洋国际大厦"
					}];
				for(var i=0;i<data.length;i++){
					var marker = new BMap.Marker(new BMap.Point(data[i].weidu,data[i].jingdu));  // 创建标注
					var content = data[i].contents;
					map.addOverlay(marker);
					marker.setAnimation(BMAP_ANIMATION_BOUNCE);
					addClickHandler(content,marker);
				}
				//添加点击事件
				function addClickHandler(content,marker){
					marker.addEventListener("click",function(e){
						openInfo(content,e)}
					);
				}
				//打开信息窗口
				function openInfo(content,e){
					var p = e.target;
					var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
					var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象 
					map.openInfoWindow(infoWindow,point); //开启信息窗口
				}
		}
	}
</script>
<style scoped>
h2{margin:0.3rem 0;}
#houselist{max-height:40rem;overflow-y:scroll;}
#houselist li{
	border-bottom: 1px solid #ddd;
}
#houselist li a{
	display: block;
    width: 26rem;
    padding: 1rem 1rem;
    position: relative;
    color: #aaa;
}
#houselist li a:after{content:"";clear:both;display:block;height:0;overflow: hidden;visibility: hidden;}
#houselist li a{zoom:1;}
#houselist li a .himg{
	float: left;
	margin-right: 1rem;
}
#houselist li a .himg img{
	width: 6.5rem;
	height: 7.5rem;
}
#houselist li a .hcon{
	float: left;
	width: 18rem;
}
#houselist li a .hcon p:nth-of-type(1){
	color: #000;
	font-weight: 600;
	font-size: 1rem;
}
#houselist li a .hcon p:nth-of-type(2) span:nth-of-type(4){
	color: red;
	margin-left: 4rem;
}
#houselist li a .hcon p:nth-of-type(4) span{
	color: #64a131;
	border: 1px solid #64a131;
	text-align: center;
	padding: 0.2rem 0.8rem;
	display: inline-block;
}
</style>
