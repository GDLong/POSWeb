<!-- 副屏 -->
<template>
	<div id="subpanel">
		<!-- <header>
			<img src="https://loupan.b0.upaiyun.com/1/ueditor/201712021644318975507.png" style="height: 60px">
		</header> -->
	  	<article>
			<el-container>
			  <el-aside width="auto" v-show="istable">
		  		<el-row style="height:85vh;overflow:hidden">
					<div class="item" v-for="item in tableData">
					    <div>
					        <p class="box__desc">{{item.ProductName}}</p>
					        <div class="bottom">
					          <div class="quantity">数量：{{item.Quantity}}</div>
					        </div>
					    </div>
					</div>
				</el-row>
				<div class="bg-purple">
	              <el-row>
	                <el-col>
	                  <div class="dx-collection">¥{{Amount}}</div>
	                  <div>共计 {{Quantity}} 件商品</div>
	                </el-col>
	              </el-row> 
	            </div>
			  </el-aside>

			  <el-main>
			  	<el-carousel :interval="4000" type="card" height="250" indicator-position="none" >
				    <el-carousel-item v-for="item in sliderData" :key="item">
				      <img v-bind:src="item.img" style="max-width:100%">
				    </el-carousel-item>
				</el-carousel>
				<div class="flex" style="text-align:center; margin-top: 10%;">
					<div class="flex-1"></div>
					<div class="flex-1">
						<img v-bind:src="APP[1].img" class="flex-img"><br>
						<span>关注公众号</span>
					</div>
					<div class="flex-1">
						<img v-bind:src="APP[0].img" class="flex-img"><br>
						<span>下载APP</span>
					</div>
					<div class="flex-1"></div>
				</div>
			  </el-main>
			</el-container>
	  	</article>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default{
		data(){
			return{
				message: "hello world!" ,
				
				webapi:'http://erpapi.dangxiabs.com/api',
				istable:false,
				userInfo:{},
	        	tableData:[],
	        	sliderData:[
	        		{img:"https://loupan.b0.upaiyun.com/1/ueditor/201712081026237946820.jpg"},
	        		{img:"https://loupan.b0.upaiyun.com/1/ueditor/201712081034094707664.jpg"},
	        		{img:"https://loupan.b0.upaiyun.com/1/ueditor/201712081034052645502.jpg"},
	        		{img:"https://loupan.b0.upaiyun.com/1/ueditor/201712081158302734922.jpg"}
	        	],
	        	APP:[
	        		{img:"https://loupan.b0.upaiyun.com/1/ueditor/201712081809045443536.jpg"},
	        		{img:"https://loupan.b0.upaiyun.com/1/ueditor/201712081810476244836.jpg"},
	        	],
	        	Amount:0,
	        	Quantity:0
			}
		},
		computed: {
	      ...mapGetters(['GloginGet'])
	    },
		mounted(){
			this.$nextTick(function () {
				var _this = this;
				this.$store.commit('loginGet','loginInfo')
			 	var conn = $.connection("http://erpapi.dangxiabs.com/myconnection");
				conn.start().done(function (data) {
				    _this.ApplyConn(data.id);
				});
				conn.received(function (data) {
				    var _data = JSON.parse(data)
				    console.log(_data)
				    if(_data.tableDate.length !== 0){
				    	_this.istable = true
						_this.tableData = _data.tableDate
						_this.Amount = _data.Amount
						_this.Quantity = _data.Quantity
				    }else{
						_this.istable = false
				    }
				});
		  	})
		},
		methods:{
			ApplyConn(id){
				var _this = this;
				var userinfo =  this.userInfo;
				var obj = {
					...userinfo,
					Guid:id,
					TypeId:1
				}
				$.ajax({
				 	type: 'POST',
			        url: _this.webapi+"/Connection/ApplyConn",
			        contentType: "application/json;charset=utf-8",
			        data:JSON.stringify(obj),
			        success: function (data) {
			            if (data.Success) {
			              	_this.$message({
					          message: data.Data,
					          type: 'success'
					        });
			             }
			            else {
			            	_this.$message.error(data.Msg);
			            }
			        },
			        error: function (msg) {
			        	_this.$message.error(msg);
			        }
				})
	      	}
		},
		watch:{
			GloginGet(val){
				this.userInfo = val;
			}
		}
	}
</script>
<style scoped>
  		#subpanel{
			min-height: 99vh;
		    display: flex;
		    flex-direction: column;
  		}
  		.flex-img{
  			height: 150px;
  			width: 150px;
  			margin: 0 auto;
  		}
  		header, footer {
			background-color: #B3C0D1;
			height: 60px;
		}
		footer{
			position: fixed;
    		bottom: 0;
		    left: 0;
		    width: 100%;
		    height: 100px;
		}
		article {
		  flex: auto;
		  /*background-color: #E9EEF3;*/
		}
		/**/
		.el-aside{
			max-width: 250px;
		}
		.item{
			width:100px;
			display: inline-block;
			vertical-align: top;
			margin:5px;
			padding:5px;
			border: 1px solid #e6ebf5;
			box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
		}
		.bottom {
			font-size: 12px;
			margin-top: 3px;
			line-height: 15px;
		}

		.image {
			max-width: 100%;
			display: block;
		}
		.box__desc {
		    font-size: 13px;
		    margin:0;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-box-orient: vertical;
		    -webkit-line-clamp: 1;
		}
		.bg-purple {
		    background: #FF5555;
		    color: #ffffff;
		    position: fixed;
		    bottom: 0;
		    padding: 10px;
		    margin: 5px;
		    min-width: 200px;
		    -webkit-box-sizing: border-box;
		    -moz-box-sizing: border-box;
		    box-sizing: border-box;
		    -webkit-border-radius: 4px;
		    -moz-border-radius: 4px;
		    border-radius: 4px;
		}
		.el-container{
			min-height: 99vh
		}
		.dx-collection {
		    font-size: 20px;
		}
</style>