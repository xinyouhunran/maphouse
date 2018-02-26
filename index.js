import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import "./template/base.css";
//container
import maphouse from "./components/container/maphouse.vue";
import houselist from "./components/container/houselist.vue";
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
		path:"/",
		redirect:'/maphouse'
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

