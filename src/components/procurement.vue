<!-- 采购申请 -->
<template>
  <div class="hello">
    <el-container style="border: 1px solid #eee;height:99vh">
      <el-header>
        <otherHeader :headerTitle="title"></otherHeader>
      </el-header> 
      <el-main class="main-vh">
        <el-table :data="tableData" border stripe height="auto" highlight-current-row ref="singleTable" >
          <el-table-column prop="SKU" label="商品编码" width="200" align="center"></el-table-column>
          <el-table-column prop="ProductName" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="SpecString" label="规格" align="center"></el-table-column>
          <el-table-column prop="SupplierName" label="供应商" align="center"></el-table-column>
          <el-table-column prop="Quantity" label="数量" width="150" align="center">
            <template slot-scope="scope">
              <el-input-number  size="mini" v-model="scope.row.Quantity" :min="1":controls="false" style="width:100px"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column fixed="right"  label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button @click="handleDelete(scope.$index,scope.row)" type="text" size="small" style="color:#FA5555">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer height="110">
        <el-row :gutter="20" style="background-color:#ebeff7">
          <el-col :span="5">
            <div class="dx-input-barcode">
              <el-input 
                  placeholder="条码/品名" 
                  v-model="barcode_sku" 
                  ref="inputfocus"
                  @keyup.enter.native="handleSelect"
                  :autofocus="true">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-input  
                  placeholder="" 
                  :disabled="true">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
          </el-col>
          <el-col :span="7" style="visibility: hidden;">
            <div class="dx-input-member">

            </div>
          </el-col>
          <el-col :span="12">
            <el-button type="success" class="bg-purple" @click="Submit">提 交</el-button>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
    <!-- AlertEdit -->
    <el-dialog :title="title" :visible.sync="alertEdit" width="30%">
      <el-container>
        <el-main>
          <el-form ref="form" label-width="80px">
            <el-form-item label="预计到货">
              <el-date-picker v-model="goodsTime" type="datetime" placeholder="预计到货时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="采购类型">
              <el-select v-model="apply_type_val" placeholder="请选择">
                <el-option
                  v-for="item in apply_type"
                  :key="item.key"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="采购对象">
              <el-select v-model="apply_object_val" placeholder="请选择">
                <el-option
                  v-for="item in apply_object"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="备注">
              <el-input type="textarea" v-model="Remark"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="SubmitDetail">确定</el-button>
              <el-button @click="alertEdit = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-dialog>
    <transition name="el-fade-in-linear">
      <el-table :data="DONE_VERIFYSKU.Data" border stripe height="200" size="mini" 
          highlight-current-row 
          type="index" 
          class="done_barcode" 
          @row-click="barcode_sku_change"
          v-show="done_barcode">
        <el-table-column prop="SKU" label="SKU" width="150" align="center"></el-table-column>
        <el-table-column prop="ProductName" label="商品名称" width="200" align="center"></el-table-column>
        <el-table-column prop="SpecString" label="规格" width="110" align="center"></el-table-column>
        <el-table-column prop="SupplierName" label="供应商" width="80" align="center"></el-table-column>
      </el-table>
    </transition>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import otherHeader from './tpl/otherHeader'
  export default {
    name: 'Index',
    components:{
      otherHeader
    },
    data() {
      return {
        title:'采购申请',
        tableData: [],
        barcode_sku: '',
        alertEdit: false,
        done_barcode:false,
        textarea:'',
        goodsTime:"",
        Remark:"",
        apply_type_val:"",
        apply_object_val:"",
        apply_type: [],
        apply_object:[{
          key:0,
          value:"商品"
        },{
          key:1,
          value:"物料"
        },]
      }
    },
    mounted(){
      this.ApplyType()
    },
    computed: {
      ...mapGetters(['DONE_VERIFYSKU','DONE_APPLYTYPE','DONE_NEWAPPLMONAD'])
    },
    methods:{
      handleDelete(index,row) {
        var _this = this;
        this.$alert('确定要删除么？', '删除', {
          confirmButtonText: '确定',
          callback: action => {
            if(action === 'confirm'){
              _this.tableData.splice(index,1)
              this.$message({
                type: 'success',
                message: "删除成功！"
              });
              this.$refs.inputfocus.focus()
            }else{
              this.$message({
                type: 'info',
                message: "取消删除！"
              });
              this.$refs.inputfocus.focus()
            }
          }
        })
      },
      ApplyType(){
        this.$refs.inputfocus.focus()
        this.$store.dispatch('FECTH_APPLYTYPE',{})
      },
      SubmitDetail() {
        var Req = {
          PredictArrivalDate:this.goodsTime,
          PurchaseType:this.apply_type_val,
          WhetherSell:0,
          Remark:this.Remark,
          ApplyDetial:this.tableData
        }
        this.$store.dispatch('FECTH_NEWAPPLMONAD',Req)
      },
      barcode_sku_change(row){
        const _this = this;
        const flag = {isPush:true};
        this.done_barcode = false
        this.barcode_sku = ""
        row.Quantity = row.Quantity || 1;//数量
        if (this.tableData.length !== 0) {
          this.tableData.forEach((element,index,array)=>{
            if(row.SKU === element.SKU){
                element.Quantity++;
                _this.$refs.singleTable.doLayout();
                flag.isPush = false;
                return
            }
          })
          if(flag.isPush){
            this.tableData.push(row)
          }  
        }else{
          this.tableData.push(row)
        } 
        this.$refs.inputfocus.focus()  
      },
      handleSelect() {
        if(this.barcode_sku !== ""){
          var data = {
            Sku:this.barcode_sku
          }
          this.$store.dispatch('FECTH_VERIFYSKU',data)
        }else{
          this.done_barcode = false;
        }
      },
      Submit(){
        if(this.tableData.length == 0){
          this.$alert('当前没有采购商品，请先添加！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              console.log(action)
            }
          })
        }else{
          this.alertEdit = true
        }
      }
    },
    watch:{
      DONE_VERIFYSKU(val){
        if(val.Success){
            if(val.Data.length === 1){
              this.done_barcode = false;
              this.barcode_sku_change(val.Data[0])
            }else{
              this.done_barcode = true;
            }    
        }else{
          this.jumpCode(val)
          this.done_barcode = false;
          this.barcode_sku = ""
        }       
      },
      DONE_APPLYTYPE(val){
        if(val.Success){
            var ApplyType = []
            val.Data.ApplyType.map(function(value,index){
              var a = {}
              a.key = index
              a.value = value
              ApplyType[index] = a
            })
            this.apply_type = ApplyType
        }else{
          this.jumpCode(val)
        }  
      },
      DONE_NEWAPPLMONAD(val){
        if(val.Success){
          this.$message({
            message:val.Data,
            type:"success"
          })
          this.alertEdit = false
          this.tableData = []
        }else{
          this.jumpCode(val)
        }
      },
      alertEdit(val){
        if(!val){
          this.$refs.inputfocus.focus()
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.main-vh .el-table{
		height: 100%
	}
  .bg-purple {
	float: right;
    width: 330px;
    margin: 10px 0px;
    height: 90px;
    font-size: 25px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .dx-input-barcode > div{
    margin: 10px 0px;
  }
  .dx-input-barcode > div:last-child {
    margin-top: 0;
  }
  .dx-input-member{
    background-color: #ffffff;
    margin-top: 10px;
    height: 90px;
    border-radius: 4px;
  }
  .dx-input-member-input input{ border: none;}
  .grid-content{height: 40px;font-size: 14px;text-align: center;margin-top: 5px;overflow: hidden;}
  .done_barcode{
    width: 550px;
    position: absolute;
    bottom: 130px;
    z-index: 999;
  }
</style>
