<template>
  	<el-container style="height:99vh">
		<el-header>
			<otherHeader :headerTitle="title"></otherHeader>
		</el-header> 
		<el-main>
	        <el-table :data="tableData" border stripe height="auto" highlight-current-row>
	          <el-table-column type="index" width="50" align="center"></el-table-column>
	          <el-table-column prop="OrderCode" label="订单编号" width="" align="center"></el-table-column>
	          <el-table-column prop="OrderAmount" label="金额" width="200" align="center"></el-table-column>
	          <el-table-column prop="OrderTime" label="时间" align="center" width="200">
	          	<template slot-scope="scope">
	              <span>{{formatDate(scope.row.OrderTime)}}</span>
	            </template>
	          </el-table-column>
	          <el-table-column prop="BuyerName" label="会员名" align="center" width=""></el-table-column>
	          <el-table-column label="操作" width="150" align="center">
	            <template slot-scope="scope">
	              <el-button type="primary" size="mini" @click="handlePay(scope.$index, scope.row)">继续</el-button>
	              <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	            </template>
	          </el-table-column>
	        </el-table>
	    </el-main>
	</el-container>
</template>
<script>
	import { mapGetters } from 'vuex'
	import otherHeader from './tpl/otherHeader'
	export default{
		name: 'RegisterOrderList',
	    components:{
	      otherHeader
	    },
		data(){
			return{
				title:'挂单列表',
				tableData:[],
				userName:{
		          MemberUserId:"",
		          MemberUserName:"",
		          ID:""
				}
			}
		},
		created(){
			this.GetWarning()
		},
		computed: {
	      ...mapGetters(['DONE_POSORDERLOGLIST','DONE_POSORDERLOGINFO','DONE_DELPOSORDERLOG'])
	    },
		methods:{
			GetWarning(){
				var data = {
					pageIndex:1,
					pageSize:100
				}
				this.$store.dispatch('FECTH_POSORDERLOGLIST',data)
			},
			handlePay(index, row) {
		        this.userName.MemberUserId = row.BuyerId
		        this.userName.MemberUserName = row.BuyerName
		        this.userName.ID = row.ID
				var data = {
					OrderID:row.ID
				}
				this.$store.dispatch('FECTH_POSORDERLOGINFO',data)
			},
			handleDelete(index, row) {
				var data = {
					OrderID:row.ID
				}
				this.$store.dispatch('FECTH_DELPOSORDERLOG',data)
			},
			formatDate(data){
				var dates = data.split("T")[0];
				var times = data.split("T")[1];
				var _time = times.split(".")[0];
				var datatime = new Array(2);
				datatime[0] = dates;
				datatime[1] = _time;

				return datatime.join(" ") 
			}
		},
		watch:{
			DONE_POSORDERLOGLIST(val){
				if(val.Success){
					this.tableData = val.Data.rows
	    		}else{
	    			this.jumpCode(val)
	    		}
			},
			DONE_POSORDERLOGINFO(val){
				var _this = this
				if(val.Success){
					val.Data.map(function(value,index,arr){
						arr[index].discount = 100//折扣
						arr[index].ActualSellPrice = value.SellPrice//现价
						arr[index].countPrice = _this.toDecimal2(value.SellPrice*value.Quantity)//小计
					})
					this.$store.commit('TOGGLE_BARCODE_LIST',val.Data)
					var username = JSON.stringify(this.userName)
					window.sessionStorage.setItem("userName",username)
					this.$router.push('/')
	    		}else{
	    			this.jumpCode(val)
	    		}
			},
			DONE_DELPOSORDERLOG(val){
				console.log(val)
	    		if(val.Success){
	    			this.$message({
			          showClose: true,
			          message: val.Data.msg,
			          type: 'success',
			          duration:1000
			        });
			        this.GetWarning()
		        }else{
		        	this.jumpCode(val)
		        }
			}
		}
	}
</script>
<style scoped>
	.el-main .el-table{
		height: 100%
	}
</style>