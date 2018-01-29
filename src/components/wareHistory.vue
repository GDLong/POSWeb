<template>
  	<el-container style="height:99vh">
		<el-header height="auto">
			<el-row>
			  <el-col :span="3"><router-link to="/" style="display:block"><i class="el-icon-back" style="color:#fff"></i></router-link></el-col>
			  <el-col :span="18" style="font-size:20px">商品入库历史</el-col>
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
		    		<el-input v-model="inputValue" placeholder="入库单/商品名/SKU" style="width:200px"></el-input>
		    		<el-button type="primary" @click="searchInfo" icon="el-icon-search">搜索</el-button>
		    		<el-button type="success" @click="toWarehousing" icon="el-icon-refresh">新建入库</el-button>
			    </div>
			</div>
		</el-header> 
		<el-main>
	        <el-table :data="tableData.rows" border stripe size="small" height="auto" highlight-current-row style="height:calc(100% - 50px)">
	          <el-table-column type="index" width="50" align="center"></el-table-column>
	          <el-table-column prop="Code" label="入库单号" width="150" align="center"></el-table-column>
	          <el-table-column prop="SKU" label="SKU" width="150" align="center"></el-table-column>
	          <el-table-column prop="Name" label="商品名" align="center"></el-table-column>
	          <el-table-column prop="Size" label="规格" align="center"></el-table-column>
	          <el-table-column prop="Quantity" label="数量" width="80" align="center"></el-table-column>
	          <el-table-column prop="SupplierName" label="供应商" align="center"></el-table-column>
	          <el-table-column label="添加时间" align="center">
	          	<template slot-scope="scope">
	          		<span>{{formatDate(scope.row.DetailCreateDate)}}</span>
	          	</template>
	          </el-table-column>
	        </el-table>
	        <div class="pageUi">
		    	<el-pagination  
	            	layout="prev,pager,next,total"  
	            	:page-size="tableData.pageSize" 
	            	:total="tableData.total"
	            	:current-page="tableData.pageIndex"
	            	@current-change="handleCurrentChange"></el-pagination>
		    </div>
	    </el-main>
	</el-container>
</template>
<script>
	import { mapGetters } from 'vuex'
	import otherHeader from './tpl/otherHeader'
	export default{
		name: 'WareHistory',
	    components:{
	      otherHeader
	    },
		data(){
			return{
				title:'采购历史',
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
				tableData:{}
			}
		},
		created(){
			this.searchInfo()
		},
		computed: {
	      ...mapGetters(['DONE_WAREHISTORY'])
	    },
		methods:{
			searchInfo(){
				var data = {
					Code:this.inputValue,
					BeginTime:this.pickerValue ? this.pickerValue[0] : '',//this.formatTime(this.pickerValue[0])
					EndTime:  this.pickerValue ? this.pickerValue[1] : '',//this.formatTime(this.pickerValue[1])
					pageIndex:1,
					pageSize:30
				}
				this.$store.dispatch('FECTH_WAREHISTORY',data)
			},
			handleCurrentChange(val) {//分页
	        	var data = {
	    			Code:this.inputValue,
					BeginTime:this.pickerValue ? this.pickerValue[0] : '',//this.formatTime(this.pickerValue[0])
					EndTime:  this.pickerValue ? this.pickerValue[1] : '',//this.formatTime(this.pickerValue[1])
					pageIndex:val,
					pageSize:30
	    		}
	    		this.$store.dispatch('FECTH_WAREHISTORY',data)
	      	},
	      	formatDate(data){
	      		if(data !== null){
					var dates = data.split("T")[0];
					var times = data.split("T")[1];
					var _time = times.split(".")[0];
					var datatime = new Array(2);
					datatime[0] = dates;
					datatime[1] = _time;

					return datatime.join(" ") 
	      		}
			},
			toWarehousing(){
				this.$router.push('/warehousing')
			}
		},
		watch:{
			DONE_WAREHISTORY(val){
				if(val.Success){
					this.tableData = val.Data
	    		}else{
	    			this.jumpCode(val)
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
	.pageUi{
		text-align: center;
		margin-top: 10px;
	}
</style>