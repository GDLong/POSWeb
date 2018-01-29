<template>	
	<el-row>
	  <el-col :span="3"><div style="display:block" @click="goBack"><i class="el-icon-back" style="color:#fff"></i></div></el-col>
	  <el-col :span="18" style="font-size:20px">{{headerTitle}}</el-col>
	  <el-col :span="3"></el-col>
	</el-row>
</template>
<script>
	export default {
		props: ["headerTitle"],
		data(){
			return{

			}
		},
		methods:{
			goBack(){
				this.$router.go(-1)
			}
		}
	}
</script>
<style>
	.el-header{
		background-color: #324057;
		color: #fff;
		line-height: 60px;
		text-align: center;
	}
</style>