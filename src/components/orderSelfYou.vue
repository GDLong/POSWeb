<template>
	<div class="hello">
	  	<el-container style="border: 1px solid #eee;height:99vh">
		  <el-header height="auto">
			<el-row>
			  <el-col :span="3"><router-link to="/" style="display:block"><i class="el-icon-back" style="color:#fff"></i></router-link></el-col>
			  <el-col :span="18" style="font-size:20px">订单自提</el-col>
			  <el-col :span="3"></el-col>
			</el-row>
		  </el-header>
		  <el-container>
		    <el-aside width="280px" style="padding: 20px 0 0 10px;">
		    	<div class="flex aside-title">
		    		<p class="flex-1">订单号</p>
		    		<p>总额</p>
		    	</div>
			    <ul class="aside-ul">
			    	<li class="flex ico-money" v-for="(item,index) in tableList.rows" @click="orderInfo(item,index)" :class="{on:iscur==index}">
			    		<div class="flex-1">
			    			<p>{{item.OrderCode}}</p>
			    			<p>{{formatDate(item.OrderTime)}}</p>
			    		</div>
			    		<div style="text-align: right;">
			    			<p class="aside-red">{{item.PaymentAmount}}</p>
			    			<p class="aside-red">{{item.BuyerName}}</p>
			    		</div>
			    	</li>
			    </ul>
			    <div class="pageUi">
			    	<el-pagination small 
		            	layout="prev,pager,next"  
		            	:page-size="tableList.pageSize" 
		            	:total="tableList.total"
		            	:current-page="tableList.pageIndex"
		            	@current-change="handleCurrentChange"></el-pagination>
			    </div>
		    </el-aside>
		    <el-main>
	    	  <el-table :data="tableInfo" border  height="auto" style="width: 100%;height:calc(100% - 73px)" @selection-change="handleSelectionChange">
			    <el-table-column type="selection" width="55" :selectable="checkSelect"></el-table-column>
			    <el-table-column prop="Sku" label="SKU" width="180"></el-table-column>
			    <el-table-column prop="ProductName" label="商品名"></el-table-column>
			    <el-table-column prop="Price" sortable label="实际单价" width="120"></el-table-column>
			    <el-table-column prop="Quantity" sortable label="购买数量" width="120"></el-table-column>
			    <el-table-column prop="Stock" label="实际库存" width="80"></el-table-column>
			    <el-table-column prop="AvailableStock" label="可用库存" width="80"></el-table-column>
			    <el-table-column label="状态" width="115">
			    	<template slot-scope="scope">
		              <span v-if="scope.row.IsPickUp == 1" style="color: red">已提</span>
		              <span v-else>未提<i v-if="scope.row.Quantity > scope.row.AvailableStock" style="color: #409EFF">-库存不足</i></span>
		            </template>
			    </el-table-column>
			    <el-table-column prop="Remark" label="备注" width="100"></el-table-column>
			  </el-table>
			  <div class="flex">
			  	<div class="flex-1">
				  <div class="flex sale-count">
				  	<div class="flex-1">
				  		买家：<span>{{orderData.BuyerPhone}}</span>
				  	</div>
				  	<div class="flex-1">
				  		商品总额：<span>¥{{orderData.OrderAmount}}</span>
				  	</div>
				  	<div class="flex-1">
				  		实际支付：<span class="aside-red">¥{{orderData.PaymentAmount}}</span>
				  	</div>
				  </div>
				  <div class="flex sale-count">
				  	<div class="flex-1" style="color:#999">备注：{{orderData.BuyerRemark}}</div>
				  </div>
			  	</div>
			  	<div class="td"  @click="orderSelfYou">自提</div>
			  </div>
		    </el-main>
		  </el-container>
		</el-container>
		<!-- lodop -->
	  	<object id="LODOP" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width="100" height="100" style="display:none">
			<embed id="LODOP_EM" type="application/x-print-lodop" width="100" height="100"></embed>
			<param name="Caption" value="我是打印控件lodop">
			<param name="Color" value="#C0C0C0">
			<param name="Border" value="1">
		</object>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import {getLodop}  from "../assets/LodopFuncs"
  	export default{
  		name: 'orderSelfYou',
	    data() {
	      return {
	        alertEditsolo: false,
	        alertEditAll:false,
	        iscur:0,
	        tableList:[],
	        tableInfo:[],
	        orderData:{},
	        array:[],
	        OrderId:""
      	  }
	    },
	    created(){
	    	this.searchInfo()
	    },
	    computed: {
	      ...mapGetters(['DONE_ORDERPICKUPLIST','DONE_ORDERPICKUPINFO','DONE_ORDERPICKUPOPERA','DONE_PRINTGETMODEL'])
	    },
	    methods:{
			searchInfo(){
				var data = {
					pageIndex:1,
					pageSize:50
				}
				this.$store.dispatch('FECTH_ORDERPICKUPLIST',data)
			},
			orderInfo(data,index){
				this.iscur = index
				this.OrderId = data.ID
				var orderData = {
					BuyerPhone:data.BuyerPhone || "",
					OrderAmount:data.OrderAmount || "",
					PaymentAmount:data.PaymentAmount || "",
					BuyerRemark:data.BuyerRemark || ""
				}
				this.orderData = {
					...orderData
				}
				var data = {
					OrderId:data.ID
				}
				this.$store.dispatch('FECTH_ORDERPICKUPINFO',data)
			},
			handleCurrentChange(val) {//分页
	        	var data = {
	    			pageIndex:val,
	    			pageSize:50
	    		}
	    		this.$store.dispatch('FECTH_ORDERPICKUPLIST',data)
	      	},
	      	handleSelectionChange(val) {
	        	var array = new Array();
	        	val.map(function(value,index){
	        		array[index] = value.ID
	        	})
	        	this.array = array
	      	},
	      	orderSelfYou(){
	      		var _this  = this;
	      		var data = {
	      			OrderId:"",
	    			PickUpFlag:2,
	    			OrderItemIds:this.array,
	    			PickUpRemark:""
	    		}
	    		if(this.array.length == 0) {
	    			this.$message({
			          showClose: true,
			          message: '请勾选商品',
			          duration:1000
			        });
	    		}else{
		    		this.$confirm('确认自提, 是否继续?', '自提', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			          _this.$store.dispatch('FECTH_ORDERPICKUPOPERA',data)
			        }).catch(() => {
			          console.log('cancel')         
			        });
	    		}
	    		
	      	},
			formatDate(data){
				var dates = data.split("T")[0];
				var times = data.split("T")[1];

				var _date = new Array(2);
				_date[0] = dates.split("-")[1];
				_date[1] = dates.split("-")[2];

				var _time = new Array(2);
				_time[0] = times.split(":")[0];
				_time[1] = times.split(":")[1];

				var date = _date.join("-");
				var time = _time.join(":");
				return date + " " + time
			},
			checkSelect(row,index){
				if(row.IsPickUp == 1 || row.AvailableStock < 0){
		          return false;
		        }else{
		          return true;
		        }
			},
			myPreview(val){
				LODOP = getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));
				//打印初始化
				LODOP.PRINT_INIT("");
				eval(val)
				LODOP.PRINT();
			}
	    },
	    watch:{
	    	DONE_ORDERPICKUPLIST(val){
	    		if(val.Success){
	    			if(val.Data.total != 0){
			        	this.tableList = val.Data
			        	this.orderInfo(val.Data.rows[0],0)
	    			}else{
	    				this.$message({
				          showClose: true,
				          message: '暂时没有自提订单！',
				          duration:1000
				        });
	    			}
		        }else{
		        	this.jumpCode(val)
		        }
	    	},
	    	DONE_ORDERPICKUPINFO(val){
	    		console.log(val)
	    		if(val.Success){
	    			this.tableInfo = val.Data
		        }else{
		        	this.jumpCode(val)
		        }
	    	},
	    	DONE_ORDERPICKUPOPERA(val){
	    		console.log(val)
	    		if(val.Success){
	    			this.$message({
			          showClose: true,
			          message: '提取成功！',
			          type: 'success',
			          duration:1000
			        });
			        this.orderInfo(this.tableList.rows[this.iscur],this.iscur)
			        if(val.Data.includes('自提完成')){//去打印
			        	console.log('ok')
						this.$store.dispatch('FECTH_PRINTGETMODEL',{OrderId:this.OrderId,Type:1})
			        }
		        }else{
		        	this.jumpCode(val)
		        }
	    	},
	    	DONE_PRINTGETMODEL(val){//打印数据
	    		this.myPreview(val.Data.ModelInfo)
	    	}
	    }
  	} 
</script>
<style scoped>
	.el-header{
		background-color: #324057;
		color: #fff;
		line-height: 60px;
		text-align: center;
	}
	.pickerValueInput{display: inline-block;}
	ul,li{
		margin:0;
		padding: 0;
		font-size: 12px;
		color: #5a5e66;
		height: calc(100% - 100px);
		overflow-y: scroll;
	}
	li{
		border-bottom: 1px solid #e6ebf5;
		padding: 0px 10px;
		overflow: hidden;
		height: 50px;
		cursor: pointer;
	}
	.pageUi{
		height: 30px;
	}
	.aside-ul li.on,
	.aside-ul li:hover{
		background-color: #dbeaff
	}
	.aside-title{
		background-color: #324057;
		padding: 0px 10px;
		color: #fff;
		-webkit-border-radius: 4px 4px 0 0;
		-moz-border-radius: 4px 4px 0 0;
		border-radius: 4px 4px 0 0;
	}
	.aside-ul p{
		padding: 0;
		margin: 8px 0px
	}
	.aside-red{color:#fe6c6f;}
	.ico-money{
		background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADDUlEQVRYR7VXQVLbQBDsWbtIwSXOC4AXxLlhp8o2Lwi8IHAIcIvzgpAXhCM4B8wPyAuQlQrihnlBzAsCF1OYkjq1sgWSvJJWpNBRtbvT09PbMyso8e39WuugitFh42Kkt+0MmvsiWL73x1/668ObrbN6baGy2Om1vFPbY8V2oV6nA7yqLP0F6JBSF0HtaT8dQDqCYPuwddG3PbcUgDBrt9EXyEdTAILXvZa3YhtcrysNYM9bW+GD+mMEQHzrtc/3XxTAjAVHIO10oHt//EZr4cUBaDEGlGSmFKds9s8qgd706Xezrnx+j2cq4EkZ8UV7S2tAb9QMkOosDoDPqP+zGQhLAJXUQBCMeu2LkzL1Lw1gZjTHAtkwB6Jz799tlhGidQlC2gM5hkjuPScxZBXbP96fD23YsAKw565tEerY5kC9hsQNq1i3AVEIYOb3X22DR+tsQeQCKJt5GqQNiEwA/xs8xsRwEozXs4RpBKD9Ppioy2S3AwgOQHEErEHk82MQ8BqUWQdkV0ReJzwCPO21vE1TGY0Adt2mVvDbuQ3k6Kjtrab7QdSCTQYVA7lpmhPmABRRnw4Wb8E7bsPYpKKbMQnGq+lSzAHIOyTMJsWCAvu6B+Rl/+T788NKAsC0yeCy6MpFLOy4jY2Jf+forAqBp8Abm1HRndd0a7EpCUbxzhdatFrqQriSNS1FAYMK3sUNKsHA7qBxEFf33L0GB72W18liyKYMBBNiTAAoolEbiwinHk9cHbW97tONAEmpiaCeV8J02y4FAMCVSBAG9ZW6iagMx3UAgZ6UIYlBxeCOibkxWQK3qef5D1kZhJ1OGAJARW7jAHwKFVGHyEEeA+mxPc1AtyiDmLE86mHXbbLo5liJcKrmxVHaSk2Ha1uOBFkCwM+j1nlimDEZkTULtllPLYC3aoH16Fln9IHoZ97rp0zQx3KRt6xKxzSgZLbjIlOyBaJLxYp0s6aj/IFEt+UH2QexYaOLFKgrQXBQ9FYoHMn0odGzW4gOp0ajLXc5HjC0aUA/209ZEcdmHtT7/wFHmrAwfryRXgAAAABJRU5ErkJggg==) no-repeat;
		background-size: 15px;
    	background-position: 5px;
    	padding-left: 25px;
	}
	.sale-count{
		background-color: #F5F7FA;
		color: #5a5e66;
		padding: 8px;
		border: 1px solid #e6ebf5;
    	margin-top: -1px;
    	font-size: 14px;
	}
	.td{
		background-color: #fa5555;
		color: #ffffff;
		padding: 0px 20px;
    	line-height: 72px;
	}
	.td.ed{
		background-color: #d1d1d1;
	}
</style>