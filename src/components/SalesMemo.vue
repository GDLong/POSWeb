<template>
	<div class="hello">
	  	<el-container style="border: 1px solid #eee;height:99vh">
		  <el-header height="auto">
			<el-row>
			  <el-col :span="3"><router-link to="/" style="display:block"><i class="el-icon-back" style="color:#fff"></i></router-link></el-col>
			  <el-col :span="18" style="font-size:20px">销售单据</el-col>
			  <el-col :span="3"></el-col>
			</el-row>
			<div class="block">	
			    <el-date-picker
			      v-model="pickerValue"
			      type="daterange"
			      align="right"
			      unlink-panels
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
	      		  value-format="yyyy-MM-dd"
			      :picker-options="pickerOptions">
			    </el-date-picker>
			    <div class="pickerValueInput">
		    		<el-input v-model="inputValue" placeholder="会员/订单号" style="width:200px"></el-input>
		    		<el-button type="primary" @click="searchInfo" icon="el-icon-search">搜索</el-button>
		    		<el-button type="primary" @click="showTotal = !showTotal" icon="el-icon-sort">汇总</el-button>
			    </div>
			</div>
			<el-collapse-transition>
				<div v-show="showTotal" class="total">
					<span>订单总额：{{Total.OrderAmountTotal}}</span>
					<span>付款总额：{{Total.PaymentAmountTotal}}</span>
					<span>微信支付：{{Total.WxPayAmountTotal}}</span>
					<span>支付宝支付：{{Total.AliPayAmountTotal}}</span>
					<span>现金支付：{{Total.CashPayAmountTotal}}</span>
					<span>退款总额：{{Total.ReturnAmountTotal}}</span>
				</div>
			</el-collapse-transition>
		  </el-header>
		  <el-container>
		    <el-aside width="280px" style="padding: 20px 0 0 10px;">
		    	<div class="flex aside-title">
		    		<p class="flex-1">流水号</p>
		    		<p>总额</p>
		    	</div>
			    <ul class="aside-ul">
			    	<li class="flex ico-money" v-for="(item,index) in tableList.rows" @click="orderInfo(item,index)" :class="{on:iscur==index}">
			    		<div class="flex-1">
			    			<p>{{item.OrderCode}}</p>
			    			<p>{{formatDate(item.OrderTime,1)}}</p>
			    		</div>
			    		<div>
			    			<p class="aside-red">{{item.PaymentAmount}}</p>
			    			<p>{{formatDate(item.OrderTime)}}</p>
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
	    	  <el-table :data="tableInfo.ItemList" border  height="auto" style="width: 100%;height:calc(100% - 110px)">
			    <el-table-column prop="Sku" label="SKU" width="180"></el-table-column>
			    <el-table-column prop="ProductName" label="商品名"></el-table-column>
			    <el-table-column prop="SellPrice" sortable label="售价" width="100"></el-table-column>
			    <el-table-column prop="Price" sortable label="折扣价" width="100"></el-table-column>
			    <el-table-column prop="Quantity" sortable label="购买数量" width="110"></el-table-column>
			    <el-table-column prop="ReturnQuantity" sortable label="退货数量" width="110"></el-table-column>
			    <el-table-column prop="Remark" sortable label="备注" width="100"></el-table-column>
			    <el-table-column fixed="right" label="操作" width="100" align="center">
		            <template slot-scope="scope">
						<el-button type="danger" size="mini" 
						@click="posOrderSolo(scope.$index, scope.row)" 
						v-if="scope.row.ReturnQuantity < scope.row.Quantity">退货</el-button>
		              	<el-button type="info" size="mini" v-else>已退</el-button>
		            </template>
		        </el-table-column>
			  </el-table>
			  <div class="flex">
			  	<div class="flex-1">
				  <div class="flex sale-count">
				  	<div class="flex-1">
				  		商品总额：<span>¥{{tableInfo.OrderAmount}}</span>
				  		<span style="color:#409EFF">{{ReturnAmount(tableInfo.ReturnAmount)}}</span>
				  	</div>
				  	<div class="flex-1">收银员：{{tableInfo.CashierID}}</div>
				  </div>
				  <div class="flex sale-count">
				  	<div class="flex-1">
				  		实际支付：<span class="aside-red">¥{{tableInfo.PaymentAmount}}</span>
				  		<span style="color:#409EFF">{{CashPayAmount(tableInfo.CashPayAmount)}}</span>
				  		<span style="color:#409EFF">{{OrderDiscount(tableInfo.OrderDiscount)}}</span>
				  	</div>
				  	<div class="flex-1">支付类型：{{PayType(tableInfo.PayType)}} {{ChildPayType(tableInfo.ChildPayType)}}</div>
				  </div>
				  <div class="flex sale-count">
				  	<div class="flex-1" style="color:#999">备注：{{tableInfo.OrderRemark}}</div>
				  	<div class="flex-1" style="color:#999">会员名称：{{tableInfo.BuyerName}}</div>
				  </div>
			  	</div>
			  	<div class="td" v-if="ReturnStatus != 2" @click="posOrderAll">退单</div>
			  	<div class="td ed" v-else>已退</div>
			  </div>
		    </el-main>
		  </el-container>
		</el-container>
		<!-- alertEdit -->
	    <el-dialog title="订单退货" :visible.sync="alertEditsolo" width="30%">
	      <el-container>
	        <el-main>
	          	<el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">

	          	  <el-form-item label="订单编号">
				    <el-input :disabled="true" v-model="ruleForm1.OrderCode"></el-input>
				  </el-form-item>
				  <el-form-item label="商品ID">
				    <el-input :disabled="true" v-model="ruleForm1.ProductId"></el-input>
				  </el-form-item>
				  <el-form-item label="商品SKU">
				    <el-input :disabled="true" v-model="ruleForm1.SKU"></el-input>
				  </el-form-item>

				  <el-form-item label="退货个数" prop="ReturnQuantity">
				    <el-input v-model.number="ruleForm1.ReturnQuantity" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="退款金额" prop="ReturnAmount">
				    <el-input v-model.number="ruleForm1.ReturnAmount" auto-complete="off" :placeholder="ruleForm1.Recommend"></el-input>
				  </el-form-item>
				  <el-form-item label="商品备注" prop="Remark">
				    <el-input v-model="ruleForm1.Remark" auto-complete="off"></el-input>
				  </el-form-item>

				  <el-form-item>
				    <el-button type="primary" @click="submitForm1('ruleForm1')">提交</el-button>
				    <el-button @click="resetForm1('ruleForm1')">重置</el-button>
				  </el-form-item>

				</el-form>
	        </el-main>
	      </el-container>
	    </el-dialog>
	    <el-dialog title="整单退货" :visible.sync="alertEditAll" width="30%">
	      <el-container>
	        <el-main>
	          	<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
					
					<el-form-item label="订单编号">
						<el-input :disabled="true" v-model="ruleForm2.OrderCode"></el-input>
					</el-form-item>

					<el-form-item label="退款金额" prop="ReturnAmount">
						<el-input v-model.number="ruleForm2.ReturnAmount" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="商品备注" prop="Remark">
						<el-input v-model="ruleForm2.Remark" auto-complete="off"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="submitForm1('ruleForm2')">提交</el-button>
						<el-button @click="resetForm1('ruleForm2')">重置</el-button>
					</el-form-item>

				</el-form>
	        </el-main>
	      </el-container>
	    </el-dialog>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
  	export default{
  		name: 'HelloWorld',
	    data() {
	      	var validateQ = (rule, value, callback) => {
		        if (value === '') {
		        	this.ruleForm1.Recommend = ""
		          callback(new Error(`目前最多可退 ${this.ruleForm1.amount}`));
		        } else {
		          var _value = value.toString().split('.')[1] ? value.toString().split('.')[1].length : 0
		          if (!Number.parseFloat(value) || _value > 2) {
		          	this.ruleForm1.Recommend = ""
		            callback(new Error('请输入数字值（限小数点后两位）'));
		          }else if(value > this.ruleForm1.amount){
		          	this.ruleForm1.Recommend = ""
 					callback(new Error(`目前最多可退 ${this.ruleForm1.amount}`));
		          }else{
		          	this.ruleForm1.Recommend = '建议 ¥'+this.toDecimal2(value*this.ruleForm1.discount*this.ruleForm1.price)
		          	callback();
		          }
		        }
	      	};
	    	var validateA = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error(`目前最多可退 ¥${this.ruleForm1.money}`));
		        } else {
		          var _value = value.toString().split('.')[1] ? value.toString().split('.')[1].length : 0;
		          var re = /^[0-9]+.?[0-9]*$/;
		          if (!re.test(value) || _value > 2) {
		            callback(new Error('请输入数字值（限小数点后两位）'));
		          }else if(value > this.ruleForm1.money){
 					callback(new Error(`目前最多可退 ¥${this.ruleForm1.money}`));
		          }
		          callback();
		        }
	      	};
	      	var validateM = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入备注'));
		        } else {
		          callback();
		        }
	      	};
	      	var validateAA = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入退款金额'));
		        } else {
		          var re = /^[0-9]+.?[0-9]*$/;
		          if (!re.test(value)) {
		            callback(new Error('请输入数字值'));
		          }else if(value > this.ruleForm2.money){
 					callback(new Error('退货金额不能大于商品总金额'));
		          }
		          callback();
		        }
	      	};
	      	var validateMM = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入备注'));
		        } else {
		          callback();
		        }
	      	};
	      return {
	      	ruleForm1: {
	      		OrderID:"",//订单id
				OrderCode:"",
				ReturnAmount:"",//退款金额
				ProductId:"",//单个商品退货必填
				SKU:"",//单个商品退货必填
				ReturnQuantity:"",//单个商品退货必填
				Remark:"",//备注
				amount:'',
				money:'',
				price:0,
				discount:100,
				Recommend:''
	        },
	        ruleForm2:{
	        	OrderID:"",//订单id
	        	OrderCode:"",
				ReturnAmount:"",//退款金额
				Remark:"",//备注
				amount:'',
				money:''
	        },
	        rules1: {
	          ReturnQuantity: [
	            { validator: validateQ, trigger: 'blur' }
	          ],
	          ReturnAmount: [
	            { validator: validateA, trigger: 'blur' }
	          ],
	          Remark: [
	            { validator: validateM, trigger: 'blur' }
	          ]
	        },
	        rules2: {
	          ReturnAmount: [
	            { validator: validateAA, trigger: 'blur' }
	          ],
	          Remark: [
	            { validator: validateMM, trigger: 'blur' }
	          ]
	        },
	        alertEditsolo: false,
	        alertEditAll:false,
	        showTotal:false,
	        iscur:0,
	        tableList:[],
	        tableInfo:[],
	        Total:{},
	        pickerOptions: {
	          shortcuts: [{
	            text: '今天',
	            onClick(picker) {
	              	var start = new Date();
			    	var n1 = start.format("yyyy-MM-dd");
			    	var end = new Date();
			    	end.setDate(end.getDate() + 1);
			    	var n2 = end.format("yyyy-MM-dd");					
					picker.$emit('pick', [n1, n2]);
	            }
	          },{
	            text: '最近一周',
	            onClick(picker) {
			    	var start = new Date();
			    	start.setDate(start.getDate() - 6);
			    	var n1 = start.format("yyyy-MM-dd");	
			    	var end = new Date();
			    	end.setDate(end.getDate() + 1);
			    	var n2 = end.format("yyyy-MM-dd");					
					picker.$emit('pick', [n1, n2]);
	            }
	          }, {
	            text: '最近一个月',
	            onClick(picker) {
	              	var start = new Date();
			    	start.setDate(start.getDate() - 29);
			    	var n1 = start.format("yyyy-MM-dd");			    	
		            var end = new Date();
			    	end.setDate(end.getDate() + 1);
			    	var n2 = end.format("yyyy-MM-dd");	
			    	picker.$emit('pick', [n1, n2]);
	            }
	          }, {
	            text: '最近三个月',
	            onClick(picker) {
	              	var start = new Date();
			    	start.setDate(start.getDate() - 89);
			    	var n1 = start.format("yyyy-MM-dd");
		            var end = new Date();
			    	end.setDate(end.getDate() + 1);
			    	var n2 = end.format("yyyy-MM-dd");	
			    	picker.$emit('pick', [n1, n2]);
	            }
	          }]
	        },
	        pickerValue:[],
	        inputValue:'',
	        ReturnStatus:0//0正常 1部分退单 2整单退单
      	  }
	    },
	    created(){
	    	var now = new Date();
	    	var n1 = now.format("yyyy-MM-dd");

	    	var tom = new Date();
	    	tom.setDate(tom.getDate() + 1);
	    	var n2 = tom.format("yyyy-MM-dd");
	    	
	    	this.pickerValue[0] = n1;
	    	this.pickerValue[1] = n2;

	    	this.searchInfo()

	    },
	    computed: {
	      ...mapGetters(['DONE_SEARCHORDERINFO','DONE_POSORDERRETURN'])
	    },
	    methods:{
			searchInfo(){
				var orderinfo = {
					BuyNameOrPhoneOrCode:this.inputValue,
					OrderTimeStart:this.pickerValue ? this.pickerValue[0] : '',//this.formatTime(this.pickerValue[0])
					OrderTimeEnd:  this.pickerValue ? this.pickerValue[1] : '',//this.formatTime(this.pickerValue[1])
					OrderType:2,
					CashierName:"",
					pageIndex:1,
					pageSize:50,
				}
				this.$store.dispatch('FECTH_SEARCHORDERINFO',orderinfo)
			},
			orderInfo(data,index){
				this.iscur = index
				this.tableInfo = data
				this.ReturnStatus = data.ReturnStatus
			},
			handleCurrentChange(val) {//分页
	        	var data = {
	    			BuyNameOrPhoneOrCode:this.inputValue,
					OrderTimeStart:this.pickerValue ? this.pickerValue[0] : '',//this.formatTime(this.pickerValue[0])
					OrderTimeEnd:  this.pickerValue ? this.pickerValue[1] : '',//this.formatTime(this.pickerValue[1])
					OrderType:2,
					CashierName:"",
	    			pageIndex:val,
	    			pageSize:50
	    		}
	    		this.$store.dispatch('FECTH_SEARCHORDERINFO',data)
	      	},
			formatDate(data,flag){
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

				if(flag){
					return date
				}else{
					return time
				}
			},
			PayType(type){
				// PayType// -1组合支付,0现金 ,1支付宝 ,2微信 ,3银联 4....
				switch (type)
					{
						case -1://组合支付
							return "组合支付"
							break;
						case 0://现金
							return "现金支付"
							break;
						case 1://支付宝
							return "支付宝支付"
							break;
						case 2://微信
							return "微信支付"
							break;
					}
			},
			ChildPayType(type){
				switch (type)
					{
						case 1://支付宝
							return "（现金 + 支付宝）"
							break;
						case 2://微信
							return "（现金 + 微信支付）"
							break;
						default:
							return ""
					}
			},
			OrderDiscount(val){
				if (val !== 100 && val !== null && val !== undefined && val !== -1) {
					return `（${val/10}折优惠）` 
				}
			},
			CashPayAmount(val){
				if (val !== null && val !== undefined) {
					return `（现金支付¥${val}）`
				}
			},
			ReturnAmount(val){
				if (val !== null && val !== undefined && val !== 0) {
					return `（已退¥${val}）`
				}
			},
			posOrderSolo(index,row){//退货	
				var order = this.tableInfo
				this.alertEditsolo = true
				this.ruleForm1.OrderID = order.OrderID//订单id
				this.ruleForm1.OrderCode = order.OrderCode
				this.ruleForm1.ProductId = row.ProductId//商品id
				this.ruleForm1.SKU = row.Sku//商品Sku
				this.ruleForm1.price = row.Price,//单价
				this.ruleForm1.discount = row.OrderDiscount == -1 ? 1 : this.toDecimal2(row.OrderDiscount * 0.01),//总折扣
				this.ruleForm1.amount = this.accSubtra(row.Quantity,row.ReturnQuantity),//rule 数量
				this.ruleForm1.money = this.toDecimal2(row.Price * this.ruleForm1.amount * this.ruleForm1.discount)//rule 金额
			},
			posOrderAll(){//退单
				var order = this.tableInfo
				this.alertEditAll = true
				this.ruleForm2.OrderCode = order.OrderCode
				this.ruleForm2.OrderID = order.OrderID//订单id
				this.ruleForm2.money = this.accSubtra(order.PaymentAmount,order.ReturnAmount)//rule 金额
			},
			submitForm1(formName) {
				var _this = this;
				var _value = formName == 'ruleForm1'? 1 : 2;
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            _this.PosOrderReturn(_value)
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
	      	resetForm1(formName) {
	        	this.$refs[formName].resetFields();
	      	},
	      	PosOrderReturn(val){
	      		if (val == 1) {//退货
		      		var data = {
						OrderID:this.ruleForm1.OrderID,//订单id
						ReturnStatus:1,//1 部分退单 2整单退单
						ReturnAmount:this.ruleForm1.ReturnAmount,//退款金额
						ProductId:this.ruleForm1.ProductId,//单个商品退货必填
						SKU:this.ruleForm1.SKU,//单个商品退货必填
						ReturnQuantity:this.ruleForm1.ReturnQuantity,//单个商品退货必填
						Remark:this.ruleForm1.Remark//备注					
					}
	      		}else{//退单
					var data = {
						OrderID:this.ruleForm2.OrderID,//订单id
						ReturnStatus:2,//1 部分退单 2整单退单
						ReturnAmount:this.ruleForm2.ReturnAmount,//退款金额
						Remark:this.ruleForm2.Remark//备注					
					}
	      		}
	      		console.log('提交数据',data)
				this.$store.dispatch('FECTH_POSORDERRETURN',data)
	      	}
	    },
	    watch:{
	    	DONE_SEARCHORDERINFO(val){
	    		console.log(val)
	    		if(val.Success){
	    			if(val.Data.total != 0){
			        	this.tableList = val.Data
			        	this.Total = val.Data.ExObject
			            this.tableInfo = val.Data.rows[0]
	    			}else{
	    				this.$message({
				          showClose: true,
				          message: '未搜索到订单！'
				        });
	    			}
		        }else{
		        	this.jumpCode(val)
		        }
	    	},
	    	DONE_POSORDERRETURN(val){
	    		var _this = this;
	    		if(val.Success){
	    			this.$message({
			          showClose: true,
			          message: val.Data,
			          type: 'success',
			          duration:1000,
			          onClose:()=> {
			          		_this.alertEditsolo = false
	        				_this.alertEditAll = false
			          }
			        });
		        }else{
		        	this.jumpCode(val)
		        }
	    	},
	    	alertEditsolo(val){
	    		var formName = 'ruleForm1'
	    		if(!val){
	    			this.resetForm1(formName)
	    		}
	    	},
	    	alertEditAll(val){
	    		var formName = 'ruleForm2'
	    		if(!val){
	    			this.resetForm1(formName)
	    		}
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
    	line-height: 108px;
	}
	.td.ed{
		background-color: #d1d1d1;
	}
	.total{
		line-height: 50px;
		font-size: 14px;
	}
	.total span{
		margin:0px 5px;
		padding: 5px;
		background-color: #fe6c6f;
		border-radius: 4px;
		-moz-border-radius: 4px;
		-webkit-border-radius: 4px;
	}
</style>