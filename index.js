import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import "./template/base.css";
//container
import maphouse from "./components/container/maphouse.vue";
import houselist from "./components/container/houselist.vue";
import backstage from "./components/container/backstage.vue";
import xlogin from "./components/container/xlogin.vue";
import xregister from "./components/container/xregister.vue";
import detial from "./components/container/detial.vue";
import blogin from "./components/container/blogin.vue";
import premeet from "./components/container/premeet.vue";
import addhouse from "./components/container/addhouse.vue";
import mine from "./components/container/mine.vue";
import updatepass from "./components/container/updatepass.vue";
import myhouse from "./components/container/myhouse.vue";

//back
import xhouse from "./components/back/xhouse.vue";
import xuser from "./components/back/xuser.vue";
import xmanager from "./components/back/xmanager.vue";
import deletehouse from "./components/back/deletehouse.vue";
import deletemanager from "./components/back/deletemanager.vue";
import deleteuser from "./components/back/deleteuser.vue";
import updatempass from "./components/back/updatempass.vue";
/*import addhouse from "./components/back/addhouse.vue";*/
Vue.use(Vuex);
//配置路由
var router = new VueRouter({
	routes:[{
		path:"/maphouse",
		component:maphouse
	},{
		path:"/houselist",
		component:houselist
	},
	{
		path:"/xlogin",
		component:xlogin
	},
	{
		path:"/xregister",
		component:xregister
	},
	{
		path:"/detial",
		component:detial
	},
	{
		path:"/",
		redirect:'/maphouse'
	},
	{
		path:"/blogin",
		component:blogin
	},
	{
		path:"/premeet",
		component:premeet
	},
	{
		path:"/mine",
		component:mine
	},
	{
		path:"/addhouse",
		component:addhouse
	},
	{
		path:"/updatepass",
		component:updatepass
	},{
		path:"/myhouse",
		component:myhouse
	},
	{
		path:"/backstage",
		component:backstage,
		children:[{
			path:"xhouse",
			component:xhouse
		},
		{
			path:"xuser",
			component:xuser
		},{
			path:"xmanager",
			component:xmanager
		},{
			path:"deletehouse",
			component:deletehouse
		},{
			path:"deletemanager",
			component:deletemanager
		},{
			path:"deleteuser",
			component:deleteuser
		},{
			path:"updatempass",
			component:updatempass
		},
		{
			path:"/backstage",
			redirect:"/backstage/xhouse"
		}]
	}]
})
//配置状态
var store = new Vuex.Store({
	state:{
		city:"重庆",
		hid:0,//记录房子id
		userid:0,//记录已登录用户的id
		sflag:0//记录已登录管理员的状态
	}
})
new Vue({
	el:"#app",
	template:`
		<div id="box">
			<router-view></router-view>
		</div>
	`,
	router,
	store
})

