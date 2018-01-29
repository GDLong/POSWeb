<template>
	<el-container v-loading="loading" class="main-vh">
	  <el-header height="10vh"></el-header>
	  <el-main>
	  	<img src="https://loupan.b0.upaiyun.com/1/ueditor/201711251744159829254.png" />
	    <h1>当下商城-门店收银</h1>
	    <form>
	        <input class="usename" type="text" v-model="usename" placeholder="用户名"/><br/>
	        <input class="password" type="password" v-model="password" placeholder="密码" @keyup.enter="submit"/>
	        <div class="bt">
	            <el-checkbox v-model="checked" class="" disabled style="visibility: hidden;">记住密码</el-checkbox>
	            <el-button type="primary" size="small" style="margin-left: 185px;" @click="submit">登录</el-button>
	        </div>
	    </form>
	  </el-main>
	  <el-footer height="15vh">
	  	<span>© 2016-2017 常州罗盘智能网络科技有限公司</span><br>
	  	<span>Design by compass Technical department</span>
	  </el-footer>
	</el-container>
</template>

<script>
	import { mapGetters } from 'vuex'
  	export default{
  		name: 'Login',
	    data() {
	      return {
	      	loading:false,
	        checked:false,
	        usename:"",
	        password:""
      	  }
	    },
	    computed: {
	      ...mapGetters(['DONE_LOGIN'])
	    },
	    methods:{
			submit(){
				if(this.usename === ""){
					this.$message({
			          message: '请输入用户名',
			          type: 'warning'
			        });
				}else if(this.password === ""){
					this.$message({
			          message: '请输入密码',
			          type: 'warning'
			        });
				}else{
					var data = {
						UserName:this.usename,
						UserPass:this.password
					}
					this.$store.dispatch('FECTH_LOGIN',data)
					this.RequestFullScreen()
				}
			}
	    },
	    watch:{
	    	DONE_LOGIN(val){
	    		if(val.Success){
	    			this.loading = true
	    			window.sessionStorage.clear("userName")
	    			this.SetCookie("loginInfo",val.Data,2)
	    			setTimeout(() => {
	    				// 存cookie
	    				this.loading = false
	    				this.$router.replace('/')
	    			}, 2000)
	    			
	    		}else{
	    			this.jumpCode(val)
	    		}
	    	}
	    }
  	} 
</script>
<style scoped>
	h1{padding:0;margin:0;}
	img { border:none; vertical-align:top; }
	main{text-align: center;height:74vh;position: relative;z-index: 1000;background: #fff;}
	main img{padding-bottom:10px; }
	main h1{color:#444;font: 200 22px/84px "黑体";}
	.main-vh{height: 99vh}
	.usename,.password {width:330px;height:38px;margin: 10px 0;text-indent: 20%; font-size: 14px;color: #a0a0a1;outline: none;}
	.usename{background: url("https://loupan.b0.upaiyun.com/1/ueditor/201711251749504204254.png") no-repeat; border: 0;}
	.password{background: url("https://loupan.b0.upaiyun.com/1/ueditor/201711251750271860504.png") no-repeat; border: 0;}
	.bt{width:330px;margin:0 auto;}
	.el-footer{text-align: center;clear: both;background:#324057;}
	.el-footer span{position: relative;top: 7vh;color: #fff}
	#c{position: absolute;left: 0;top:0;}
</style>