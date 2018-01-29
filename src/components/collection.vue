<!-- 收款 -->
<template>
	<div>
		<el-container>
			<el-header>
				<el-row>
				  <el-col :span="3"><router-link to="/"><i class="el-icon-back" style="color:#fff"></i></router-link></el-col>
				  <el-col :span="18" style="font-size:20px">收款</el-col>
				  <el-col :span="3"></el-col>
				</el-row>
			</el-header>
			<el-container>
				<el-aside width="auto" style="padding-top: 30px;">
					<el-button type="success" plain icon="el-icon-edit" @click="dialogVisible = true">折扣/备注</el-button>
				</el-aside>
				<el-main>
					<div class="payment_input">
						<div class="flex">
							<div class="payment_name blue">总额：</div>
							<input type="text" v-model="amount" class="flex-1 blue-border" disabled>
							<div class="payment amount" :class="{elect:checkedObj.includes('0')}" @click="payStyle(0)">现金</div>
						</div>
						<div class="flex">
							<div class="flex-1 flex marginL-5" v-if="checkedObj.includes('0')">
								<div class="payment_name">现金：</div>
								<div class="flex-1">
									<input type="number" v-model="cash" class="red-border" :autofocus="true">
								</div>
							</div>
							<div class="flex-1 flex marginL-5" v-if="checkedObj.includes('2')">
								<div class="payment_name">微信：</div>
								<div class="flex-1">
									<input type="number" v-model="WeChat" class="red-border">
								</div>
							</div>
							<div class="flex-1 flex marginL-5" v-if="checkedObj.includes('1')">
								<div class="payment_name">支付宝：</div>
								<div class="flex-1">
									<input type="number" v-model="AliPay" class="red-border">
								</div>
							</div>
							<div class="payment WeChat" :class="{elect:checkedObj.includes('2')}" @click="payStyle(2)">微信</div>
						</div>
						<div class="flex">
							<div class="payment_name blue">找零：</div>
							<input type="text" v-model="change" class="flex-1 blue-border" disabled>
							<div class="payment AliPay" :class="{elect:checkedObj.includes('1')}" @click="payStyle(1)">支付宝</div>
						</div>
						<div class="flex">
							<div class="flex-1" style="padding-top:8px">
								<el-switch v-model="isPrintReceipt"
									active-text="打印小票"
  									inactive-text="不打印小票">
								</el-switch>
							</div>
							<div class="payment-pay">
								<el-checkbox v-model="checked">组合支付</el-checkbox>
							</div>
						</div>
					</div>
				</el-main>
			</el-container>
			<el-footer height="auto" align="center">
				<img src="https://loupan.b0.upaiyun.com/1/ueditor/201712021338494892299.jpg" class="submit-img" @click="PosOrderPay">
			</el-footer>
		</el-container>
		<!-- Discount note -->
		<el-dialog title=" " :visible.sync="dialogVisible">
			<el-collapse v-model="activeNames">
				<el-collapse-item title="折扣 Discount" name="1">
					<div>
						<el-button type="primary" plain size="mini" :class="{blue:discount=='95'}" @click="discountFn(95)">95 折</el-button>
						<el-button type="primary" plain size="mini" :class="{blue:discount=='90'}" @click="discountFn(90)">9 折</el-button>
						<el-button type="primary" plain size="mini" :class="{blue:discount=='85'}" @click="discountFn(85)">85 折</el-button>
						<el-button type="primary" plain size="mini" :class="{blue:discount=='80'}" @click="discountFn(80)">8 折</el-button>
						<el-button type="primary" plain size="mini" :class="{blue:discount=='75'}" @click="discountFn(75)">75 折</el-button>
						<el-button type="primary" plain size="mini" :class="{blue:discount=='70'}" @click="discountFn(70)">7 折</el-button>
						<el-button type="primary" plain size="mini" :class="{blue:discount=='60'}" @click="discountFn(60)">6 折</el-button>
						<el-button type="primary" plain size="mini" :class="{blue:discount=='50'}" @click="discountFn(50)">5 折</el-button>
					</div>
					<div style="margin-top:10px">
						<el-button type="primary" plain size="mini" :class="{blue:discount=='0'}" @click="discountFn(0)">免 单</el-button>
						<el-button type="primary" plain size="mini" :class="{blue:discount=='100'}" @click="discountFn(100)">原价</el-button>
						<!-- <el-button type="primary" plain size="mini" :class="{blue:discount=='-1'}" @click="discountFn(-1)">抹分</el-button> -->
					</div>
				</el-collapse-item>
				<el-collapse-item title="备注 Note" name="2">
					<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请在此填写单据备注" v-model="note"></el-input>
				</el-collapse-item>
			</el-collapse>
		</el-dialog>
		<!-- lodop -->
	  	<object id="LODOP" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width="100" height="100" style="display:none">
			<embed id="LODOP_EM" type="application/x-print-lodop" width="100" height="100"></embed>
			<param name="Caption" value="我是打印控件lodop">
			<param name="Color" value="#C0C0C0">
			<param name="Border" value="1">
		</object>
		<!-- audio -->
		<audio preload="auto" id="video">
			<source src="../assets/02.mp3" type="audio/mpeg" />
			您的浏览器不支持音频事件，请升级浏览器！！
		</audio>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import _ from 'lodash'
	import {getLodop}  from "../assets/LodopFuncs"
	export default {
		data(){
			return{
				checked:false,
				checkedObj:["0"],
				disamount:'0.00',
				amount:'0.00',
				OrderID:'',
				cash:'0.00',
				WeChat:'0.00',
				AliPay:'0.00',
				change:'0.00',
				dialogVisible:false,
				activeNames: ['1','2'],
				discount:100,
				ReduceMoney:'',
				AuthorizationCode:'',
				isPrintReceipt:true,
				note:''
			}
		},
		created(){
			this.OrderID = this.DONE_POSORDERSUBMIT.Data.OrderID
			this.amount = this.DONE_POSORDERSUBMIT.Data.OrderAmount
			this.cash = this.amount
			this.disamount = this.amount
			this.mofen()
		},
		computed: {
	      ...mapGetters(['DONE_POSORDERSUBMIT','DONE_POSORDERPAY','DONE_PRINTGETMODEL'])
	    },
		methods:{
			mofen(){
				var a = this.amount.toString()
				if(a.lastIndexOf('.')<0) return
	    		var b = a.substring(0,a.lastIndexOf('.')+2)
	    		var c = a.substring(a.lastIndexOf('.')+2,a.lastIndexOf('.')+3)
	    		this.ReduceMoney = c*0.01
			    this.amount = b
			    this.cash = this.amount
			},
			payStyle(data){
				var _data = data.toString();
				if(!this.checked){//非组合支付
					console.log("非组合支付")
					this.checkedObj = Array(_data)
					switch (this.checkedObj[0])
					{
						case '0':
							this.WeChat = 0
							this.AliPay = 0
							setTimeout(()=>{this.cash = this.amount},0)
							break;
						case '2':
							this.cash = 0
							this.AliPay = 0
							setTimeout(()=>{this.WeChat = this.amount},0)
							break;
						case '1':
							this.cash = 0
							this.WeChat = 0
							setTimeout(()=>{this.AliPay = this.amount},0)
							break;
					}
				}else{
					console.log("组合支付")
					if(data === 2){//微信
						this.checkedObj = ["0"];
						this.checkedObj[1] = _data
						this.WeChat = 0
						this.AliPay = 0
						setTimeout(()=>{this.cash = this.amount},0)
					}else if(data === 1){//支付宝
						this.checkedObj = ["0"];
						this.checkedObj[1] = _data
						this.AliPay = 0
						this.WeChat = 0
						setTimeout(()=>{this.cash = this.amount},0)
					}
				}
			},
		    discountFn(val){//折扣
		    	if(-1 == val){//抹分
		    		// if(this.ReduceMoney != 0){
		    		// 	return
		    		// }else{
			    	// 	var a = this.amount.toString()
			    	// 	var b = a.substring(0,a.lastIndexOf('.')+2)
			    	// 	var c = a.substring(a.lastIndexOf('.')+2,a.lastIndexOf('.')+3)
			    	// 	this.ReduceMoney = c*0.01
					   //  this.amount = b
		    		// }
		    	}else{
					this.discount = val;
					this.amount = this.toDecimal2(this.disamount*this.discount*0.01)
		    	}

				if(this.checked){
					this.checked = false
				}else{
					this.checkedObj = ["0"];
					this.WeChat = 0
					this.AliPay = 0
					this.cash = this.amount
				}
		    },
		    changeMath:_.debounce(function(auto){
		    	if(!this.checked){//非组合
					var a = this.accAdd(this.cash,this.WeChat),
						b = this.accAdd(a,this.AliPay);	
					this.change = this.accSubtra(b,this.amount)
		    	}else{
					var changeN = parseInt(this.checkedObj[1]); 
					switch (auto)
					{
						case 0://现金+微信 || 现金+支付宝
							if(changeN === 2){
								this.WeChat = this.accSubtra(this.amount,this.cash)
								this.change = 0
							}else{
								this.AliPay = this.accSubtra(this.amount,this.cash)
								this.change = 0
							}
							break;
						case 2://微信 + 现金
							this.cash = this.accSubtra(this.amount,this.WeChat)
							break;
						case 1://支付宝 + 现金
							this.cash = this.accSubtra(this.amount,this.AliPay)
							break;
						case 3://折扣
							console.log('折扣',this.change)
							break;
					}
		    	}
		    }, 300),
		    PosOrderPay(){
				var ccheck = this.checkedObj.includes("1") || this.checkedObj.includes("2")
				if(ccheck){//需要扫码
					this.$prompt('请扫描支付码', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			        }).then(({ value }) => {
			          this.AuthorizationCode = value
			          this.storePos()
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '取消输入'
			          });       
			        });

				}else{
					this.storePos()
				}
		    },
		    storePos:_.debounce(function(){
		    	var ccheck = this.checkedObj.includes("1") || this.checkedObj.includes("2")
		    	var payment = 0;
		    	if(this.checkedObj.includes("0")){
		    		payment = parseFloat(this.cash) + payment
		    	}
		    	if(this.checkedObj.includes("1")){
		    		payment = parseFloat(this.AliPay) + payment
		    	}
		    	if(this.checkedObj.includes("2")){
		    		payment = parseFloat(this.WeChat) + payment
		    	}
		    	console.log(payment,parseFloat(this.amount))
		    	
		    	if(isNaN(payment) || payment < parseFloat(this.amount)){
		    		this.$message({
			          message: '支付金额不能小于商品总额！',
			          type: 'warning'
			        });
		    		return
		    	}
		    	var obj = {
		    		OrderID:this.OrderID,
		    		PaymentAmount:parseFloat(this.amount),
		    		PayType:this.checked ? -1 : parseInt(this.checkedObj[0]),
		    		ChildPayType:this.checked ? parseInt(this.checkedObj[1]) : '',
		    		CashPayAmount:this.checked ? this.cash : '',
		    		OrderDiscount:parseInt(this.discount),
		    		AuthorizationCode:ccheck ? this.AuthorizationCode : '',
		    		Remark:this.note,
		    		ReduceMoney:this.ReduceMoney,
		    		BackAmount:parseFloat(this.change)
		    	}
		    	console.log(obj)
		    	this.$store.dispatch('FECTH_POSORDERPAY',obj)
		    },300),
			myPreview(val){
				LODOP = getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));
				//打印初始化
				LODOP.PRINT_INIT("");
				eval(val)
				LODOP.PRINT();
			}
		},
		watch:{
			checked(){
				if(this.checked){
					this.checkedObj = ["0","2"];
				}else{
					this.checkedObj = ["0"];
				}
				this.WeChat = 0
				this.AliPay = 0
				setTimeout(()=>{this.cash = this.amount},0)
			},
			cash(){
				if(this.cash > this.amount){
					var flag = this.cash
					this.checked = false;
					setTimeout(()=>{this.cash = flag},50)
					this.changeMath(0)
				}else{
					this.changeMath(0)
				}
			},
			WeChat(){
				if(this.WeChat > this.amount){
					this.checked = false;
					setTimeout(()=>{
						this.checkedObj = ["2"]
						this.WeChat = this.amount
						this.cash = 0
						this.changeMath(2)
					},50)
				}else{
					this.changeMath(2)
				}
			},
			AliPay(){
				if(this.AliPay > this.amount){
					this.checked = false;
					setTimeout(()=>{
						this.checkedObj = ["1"];
						this.AliPay = this.amount
						this.cash = 0
						this.changeMath(1)
					},50)
				}else{
					this.changeMath(1)
				}
			},
			amount(){
				this.changeMath(3)
			},
			checkedObj(val){
				if (val.length == 1 && val[0] == "0") {
					this.mofen()
				}else{
					this.ReduceMoney = 0
					this.amount = this.toDecimal2(this.disamount*this.discount*0.01)
				}
			},
			DONE_POSORDERPAY(val){
				var _this = this;
				console.log(val)
	    		if(val.Success){
		            this.$store.commit('TOGGLE_DELETE_BARCODE_LIST',{})
		            window.sessionStorage.clear("userName")
		            var myVideo=document.getElementById("video");
					myVideo.play()
					// var myVideo=document.getElementById("video");
					// myVideo.pause();
		            if(!!this.isPrintReceipt){
		            	this.$store.dispatch('FECTH_PRINTGETMODEL',{OrderId:this.OrderID})
		            }
		            this.$message({
	                	type: 'success',
	                	message: "支付成功！",
	                	duration:1000,
	                	onClose: action => {
	                		_this.$router.replace('/')
	                	}
	              	});	            
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
	.payment_input > .flex{
		margin-top:10px;
		height: 80px; 
	}
	.payment_input input.blue-border{
		outline: none;
		text-align: right;
    	font-size: 25px;
    	padding: 0px 15px;
    	border:1px solid #d7e0f3;
    	border-radius: 0 4px 4px 0;
    	-moz-border-radius: 0 4px 4px 0;
    	-webkit-border-radius: 0 4px 4px 0;
    	-webkit-appearance: none;
    	transition: border-color .2s cubic-bezier(.645,.045,.355,1);
	}
	.payment_input input.red-border{
		width: 99%;
		height: 75px;
		outline: none;
		text-align: right;
    	font-size: 25px;
    	padding-right: 1%;
    	border:1px solid #d7e0f3;
    	border-radius: 0 4px 4px 0;
    	-moz-border-radius: 0 4px 4px 0;
    	-webkit-border-radius: 0 4px 4px 0;
    	-webkit-appearance: none;
    	transition: border-color .2s cubic-bezier(.645,.045,.355,1);
	}
	.payment_input .flex .red-border:focus{
		border-color: #CB636E;
		outline: none;
	}
	.payment_input .flex .blue-border:focus{
		border-color: #409eff;
		outline: none;
	}
	.payment_name{
		width: 100px;
		background-color: #CB636E;
		display: inline-block;
		height: 80px;
		font-size: 20px;
		color:#fff;
		text-align: center;
		line-height: 80px;
		border-radius: 4px 0 0 4px;
		-moz-border-radius: 4px 0 0 4px;
		-webkit-border-radius: 4px 0 0 4px;
	}
	.payment{
		background-color: #A69E87;
		width: 150px;
		font-size: 15px;
		color:#fff;
		text-align: center;
		line-height: 80px;
		border-radius: 4px;
		-moz-border-radius: 4px;
		-webkit-border-radius: 4px;
		margin-left: 5px;
	}
	.payment-pay{
		background-color: #ebebe4;
		width: 150px;
		font-size: 15px;
		color:#fff;
		text-align: center;
		height: 40px;
		line-height: 40px;
		border-radius: 4px;
		-moz-border-radius: 4px;
		-webkit-border-radius: 4px;
		margin-left: 5px;
	}
	.elect{
		background-color: #CB636E
	}
	.blue{
		color: #fff;
		background-color: #409eff
	}
	.marginL-5{
		margin-left: 5px;
	}
	.marginL-5:first-child{margin-left: 0}
	.submit-img{
		width: 20%;
		border-radius: 4px;
		-moz-border-radius: 4px;
		-webkit-border-radius: 4px;
		box-shadow: 2px 2px 8px;
		-moz-box-shadow: 2px 2px 8px;
		-webkit-box-shadow: 2px 2px 8px;
		transition: 0.3s;
		-moz-transition: 0.3s;
		-webkit-transition: 0.3s;
	}
	.submit-img:active{
		transform: translate(2px,2px);
	}
</style>