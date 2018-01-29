<template>
  	<el-container style="height:99vh">
		<el-header>
			<otherHeader :headerTitle="title"></otherHeader>
		</el-header> 
		<el-main>
	        <el-table :data="tableData.items" border stripe height="auto" highlight-current-row>
	          <el-table-column type="index" width="50" align="center"></el-table-column>
	          <el-table-column prop="SKU" label="条码" width="200" align="center"></el-table-column>
	          <el-table-column prop="ProductName" label="品名" align="center"></el-table-column>
	          <el-table-column prop="SpecString" label="规格" align="center" width="200"></el-table-column>
	          <el-table-column prop="SellPrice" label="售价" width="80" align="center"></el-table-column>
	          <el-table-column prop="Stock" label="库存" width="80" align="center"></el-table-column>
	          <el-table-column prop="StockUpperLimit" label="库存上限" width="80" align="center"></el-table-column>
	          <el-table-column prop="StockLowerLimit" label="库存下限" width="80" align="center"></el-table-column>
	          <el-table-column prop="WarningFlag" label="预警标识" width="100" align="center">
	            <template slot-scope="scope">
	              <el-button type="warning" size="mini" v-if="scope.row.WarningFlag">高库存</el-button>
	              <el-button type="danger" size="mini" v-else>低库存</el-button>
	            </template>
	          </el-table-column>
	        </el-table>
	        <div class="pageUi">
		    	<el-pagination  
	            	layout="prev,pager,next,total"  
	            	:page-size="tableData.pageSize" 
	            	:total="tableData.WarningTotalCount"
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
		name: 'Waring',
	    components:{
	      otherHeader
	    },
		data(){
			return{
				title:'库存预警',
				tableData:{}
			}
		},
		created(){
			this.GetWarning()
		},
		computed: {
	      ...mapGetters(['DONE_WARNING'])
	    },
		methods:{
			GetWarning(){
				var data = {
					SearchFlag:1,
					pageIndex:1,
					pageSize:20
				}
				this.$store.dispatch('FECTH_WARNING',data)
			},
			handleCurrentChange(val) {//分页
	        	var data = {
	    			SearchFlag:1,
					pageIndex:val,
					pageSize:20
	    		}
	    		this.$store.dispatch('FECTH_WARNING',data)
	      	},
		},
		watch:{
			DONE_WARNING(val){
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
	.el-main .el-table{
		height: calc(100% - 30px)
	}
	.pageUi{
		height: 30px;
		text-align: center;
	}
</style>