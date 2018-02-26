<template>
<div class="hea">
	<xheader />
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
	}
</script>