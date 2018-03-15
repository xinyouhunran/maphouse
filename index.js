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

//back
import xhouse from "./components/back/xhouse.vue";
import xuser from "./components/back/xuser.vue";
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
		path:"/",
		redirect:'/maphouse'
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
		city:"重庆"
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

