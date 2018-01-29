<template>
	<div id="classify">
	  	<el-container style="border: 1px solid #eee;height:99vh">
		  <el-header height="auto">
		  	<otherHeader :headerTitle="title"></otherHeader>
		  </el-header>
		  <el-container>
			  <el-aside width="auto">
		  		<el-row style="height:85vh;overflow-y:scroll">
					<el-tree :data="ProductType" :props="defaultProps" default-expand-all highlight-current @node-click="handleNodeClick"></el-tree>
				</el-row>
			  </el-aside>
			  <el-main>
			  	<el-table ref="multipleTable" 
			  		:data="ProductList.rows" 
			  		border 
			  		stripe
			  		style="width: 100%" 
			  		height="auto" 
			  		@selection-change="handleSelectionChange" 
			  		highlight-current-row>
				    <el-table-column type="selection" width="55" align="center"></el-table-column>
				    <el-table-column prop="SKU" label="商品条码" width="200"></el-table-column>
				    <el-table-column prop="ProductName" label="商品名称"> </el-table-column>
				    <el-table-column prop="CategoryName" label="分类" width="150"> </el-table-column>
				    <el-table-column prop="SellPrice" label="销售价" width="150"> </el-table-column>
				    <el-table-column prop="Stock" label="库存" width="120"> </el-table-column>
				</el-table>
				<div class="classify-footer flex flex-align-center">
		            <div class="dx-input-barcode flex-1">
		              <el-input 
		                  placeholder="条码/品名" 
		                  v-model="classifyModel" 
		                  ref="inputfocus"
		                  @keyup.enter.native="productSearch"
		                  :autofocus="true"
		                  style="width:250px;margin: 0px 10px;">
		                <i slot="suffix" class="el-input__icon el-icon-search"></i>
		              </el-input>
		              <el-button type="primary" @click="printLabel" v-show="ispage">打印标签</el-button>
		            </div>
		            <el-pagination 
		            	layout="prev,pager,next,total"  
		            	:page-size="ProductList.pageSize" 
		            	:total="ProductList.total"
		            	:current-page="ProductList.pageIndex"
		            	@current-change="handleCurrentChange"
		            	v-show="ispage"></el-pagination>
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
	import otherHeader from './tpl/otherHeader'
	import {getLodop}  from "../assets/LodopFuncs"
  	export default{
  		name: 'Slassification',
  		components:{
	      otherHeader
	    },
	    data() {
	      return {
	      	title:'商品分类',
	      	iscur:0,
	      	ispage:false,
	      	classifyModel:"",
	      	CategoryID:'',
	      	ProductType:[{
	      		children:[],
	      		id:"0",
	      		text:'全部'
	      	}],
	      	ProductList:[],
	      	multipleSelection: [],
	        defaultProps: {
	          children: 'children',
	          label: 'text'
	        }
      	  }
	    },
	    created(){
	    	this.getProductType()
	    },
	    computed: {
	      ...mapGetters(['DONE_GETSTOREPRODUCTYPE','DONE_GETSTOREPRODUCLIST','DONE_GETSTOREPRODUCLISTSEARCH','DONE_PRINTGETGOODS'])
	    },
	    methods:{
	    	handleNodeClick(data) {
	        	var _data = {
	    			CategoryID:data.id,
	    			pageIndex:1,
	    			pageSize:20
	    		}
	    		this.CategoryID = data.id 
	    		this.$store.dispatch('FECTH_GETSTOREPRODUCLIST',_data)
	      	},
	    	getProductType(){
	    		this.$store.dispatch('FECTH_GETSTOREPRODUCTYPE',{})
	    	},
	    	handleSelectionChange(val){
	    		this.multipleSelection = val;
	    	},
	    	handleCurrentChange(val) {
	        	var data = {
	    			CategoryID:this.CategoryID,
	    			pageIndex:val,
	    			pageSize:20 
	    		}
	    		this.$store.dispatch('FECTH_GETSTOREPRODUCLIST',data)
	      	},
	      	productSearch(){
	      		var data = {	
					SkuOrName:this.classifyModel,//Sku或ProductName
					CategoryID:this.CategoryID,//商品分类ID
					pageIndex:1,//当前分页页数
					pageSize:20//当前分页行数
	      		}
	      		this.$store.dispatch('FECTH_GETSTOREPRODUCLISTSEARCH',data)
	      	},
	      	printLabel(){//打印商品标签
	      		var arry = [];
	      		this.multipleSelection.map((value,index,arr)=>{
	      			arry[index] = value.ID
	      		})
	      		console.log(arry)
				this.$store.dispatch('FECTH_PRINTGETGOODS',{GoodsIds:arry,Type:1})
	      	},
	      	myPreview(val){
	      		var setTime;
				LODOP = getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));
				//打印初始化
				LODOP.PRINT_INIT("");
				(function(arr){
				    var i = 0; length = arr.length;
				    (function a(){
				        setTime = setTimeout(function(){
				            if( i < length ){
					            eval(arr[i++]);
					        	LODOP.PRINT();
					            a();
				            }else{
								clearTimeout(setTime)
				            }
				        },2000);
				    }())
				}(val));
			}
	    },
	    watch:{
	    	DONE_GETSTOREPRODUCTYPE(val){//directory
	    		if(val.Success){
	    			if(val.Data.items.length != 0){
			        	this.ProductType[0].children = val.Data.items
	    			}else{
	    				this.$message({
				          showClose: true,
				          message: '还没有分类！'
				        });
	    			}
		        }else{
		        	this.jumpCode(val)
		        }
	    	},
	    	DONE_GETSTOREPRODUCLIST(val){//List
				if(val.Success){
					if(val.Data.rows.length != 0){
						this.ProductList = val.Data
						this.ispage = true
	    			}else{
	    				this.$message({
				          showClose: true,
				          message: '未查到商品！'
				        });
				        this.ProductList = []
				        this.ispage = false
	    			}
		        }else{
		        	this.jumpCode(val)
		        }
	    	},
	    	DONE_GETSTOREPRODUCLISTSEARCH(val){//search
	    		if(val.Success){
					if(val.Data.rows.length != 0){
						this.ProductList = val.Data
						this.ispage = true
	    			}else{
	    				this.$message({
				          showClose: true,
				          message: '未查到商品！'
				        });
				        this.ProductList = []
				        this.ispage = false
	    			}
		        }else{
		        	this.jumpCode(val)
		        }
	    	},
	    	DONE_PRINTGETGOODS(val){//打印商品标签
	    		console.log(val)
	    		this.myPreview(val.Data.ModelList)
	    	}
	    }
  	} 
</script>
<style scoped>
	.el-main .el-table{
		height: calc(100% - 50px);
	}
	/**/
	#classify{
		min-height: 99vh;
	    display: flex;
	    flex-direction: column;
	}
	.classify-footer{
		background-color:#ebeff7;
		height: 50px;
	}
	.el-aside{
		min-width: 200px;
	}
	.item.on{
		background-color: #409EFF;
    	color: #fff;
	}
	.item{
		width:100px;
		display: inline-block;
		vertical-align: top;
		margin:5px;
		padding:8px 5px;
		border: 1px solid #e6ebf5;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	    -webkit-border-radius: 4px;
	    -moz-border-radius: 4px;
	    border-radius: 4px;
	}

	.image {
		max-width: 100%;
		display: block;
	}
	.box__desc {
	    font-size: 14px;
	    margin:0;
	    text-align: center;
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
	}
	.dx-collection {
	    font-size: 20px;
	}
</style>