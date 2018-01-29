<template>
  <el-header>
  	<el-popover ref="popover1" placement="top" width="160" v-model="visible1" trigger="hover">
	  <p>是否打开副屏展示</p>
	  <div style="text-align: right; margin: 0">
	    <el-button size="mini" type="text" @click="visible1 = false">取消</el-button>
	    <el-button type="primary" size="mini" @click="visible1 = false">
	    	<router-link to="/subpanel" target="_blank" class="subpanel">确定</router-link>
	    </el-button>
	  </div>
	</el-popover>
  	<div class="flex flex-align-center">
		<el-menu :default-active="activeIndex" class="el-menu-demo flex-1" mode="horizontal" background-color="#324057" text-color="#e0e0e0" active-text-color="#ffd04b" router>
			<el-menu-item index="/">
		    	<i class="el-icon-goods"></i>
		    	<span>收银</span>
		  	</el-menu-item>
		  	<el-menu-item index="/salesMemo">
		    	<i class="el-icon-edit-outline"></i>
		    	<span>销售单据</span>
		  	</el-menu-item>
		  	<el-menu-item index="/warning">
		    	<i class="el-icon-warning"></i>
		    	<span>库存预警</span>
		    	<span class="warning-dot" v-show="TipCounts.WarningTotalCount > 0">{{TipCounts.WarningTotalCount}}</span>
		  	</el-menu-item>
		  	<el-menu-item index="/orderSelfYou">
		  		<i class="el-icon-news"></i>
		    	<span>订单自提</span>
		    	<span class="warning-dot" v-show="TipCounts.PickUpCount > 0">{{TipCounts.PickUpCount}}</span>
		  	</el-menu-item>
		  	<el-menu-item index="" @click="dialogMore = true">
		    	<i class="el-icon-menu"></i>
		    	<span>所有功能</span>
		  	</el-menu-item>
		</el-menu>
		<div class="user">
			<el-button type="text" v-popover:popover1 >{{userinfo.UserName}}、</el-button>
			<el-button type="primary" size="mini" @click="Logout">注销</el-button>
		</div>
  	</div>
  	<el-dialog title="所有功能" :visible.sync="dialogMore" width="50%" align="left">
  	  <moreVersble></moreVersble>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogMore = false">取 消</el-button>
	    <el-button type="primary" @click="dialogMore = false">确 定</el-button>
	  </span>
	</el-dialog>
  </el-header>
</template>
<script>
	import { mapGetters } from 'vuex'
	import moreVersble from './moreVersble'
	export default{
		props: ["userinfo"],
		components:{
	      moreVersble
	    },
		data(){
			return{
				activeIndex:'/',
				visible1: false,
				dialogMore:false,
				TipCounts:{}
			}
		},
		created(){
			this.getCount()
		},
		computed: {
	      ...mapGetters(['DONE_LOGINOUT','DONE_GETPOSCOUNT'])
	    },
		methods:{
		    Logout(){
		    	this.$store.dispatch('FECTH_LOGINOUT',{})
		    },
			getCount(){
				this.$store.dispatch('FECTH_GETPOSCOUNT',{})
			}
		},
		watch:{
			DONE_LOGINOUT(val){
				this.$message({
		          message: "退出成功！",
		          type: 'success'
		        });
	            this.SetCookie("loginInfo",'',-1)
	            this.$store.commit('TOGGLE_DELETE_BARCODE_LIST',{})
	            setTimeout( ()=> {
					this.$router.push("/login")
	            }, 500)
			},
			DONE_GETPOSCOUNT(val){
				if(val.Success){
					this.TipCounts = val.Data;
					this.$emit('emit-TipCounts',val.Data)
		        }else{
		            this.jumpCode(val)
		        }
			}
		}
	}
</script>
<style scoped>
	.el-header {
		background-color: #324057;
	}
	.el-menu-demo{
		
	}
	.user{
		/*align-self: center;*/
		color: #ffffff;
	}
	.subpanel{
		color: #fff;
	    font-size: 14px;
	    text-decoration: none;
	}
	.warning-dot{
		position: relative;
		top: -10px;
		background-color: #FF5555;
		border-radius: 10px;
		padding: 0px 5px;
	}
	
</style>