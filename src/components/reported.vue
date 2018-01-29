<template>
  <div class="hello">
    <el-container style="border: 1px solid #eee;height:99vh">
      <el-header>
        <otherHeader :headerTitle="title"></otherHeader>
      </el-header> 
      <el-main class="main-vh">
        <el-table :data="tableData" border stripe height="auto" highlight-current-row show-summary :summary-method="getSummaries" ref="singleTable">
          <el-table-column prop="SKU" label="商品编码" width="200" align="center"></el-table-column>
          <el-table-column prop="ProductName" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="SpecString" label="规格" align="center"></el-table-column>
          <!-- <el-table-column prop="SellPrice" label="售价" width="100" align="center"></el-table-column> -->
          <el-table-column prop="Quantity" label="数量" width="100" align="center"></el-table-column>
          <!-- <el-table-column prop="countPrice" label="售价小计" width="80" align="center"></el-table-column> -->
          <el-table-column fixed="right"  label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
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
                  v-model="barcode_cashier_state" 
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
              <el-row style="border-top:1px solid #e6ebf5;padding-top: 20px;">
                <el-col :span="8">
                  <div class="grid-content" style="border-right: 1px solid #e6ebf5">
                    <div>{{OrderQuantity}}</div>
                    <div>
                      <el-button type="text" size="mini">总报损</el-button>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content" style="border-right: 1px solid #e6ebf5">
                    <div>{{Orderjinjia}}</div>
                    <div>
                      <el-button type="text" size="mini">总进价</el-button>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content">
                    <div>{{OrderAmount}}</div>
                    <div>
                      <el-button type="text" size="mini">总售价</el-button>
                    </div>
                  </div>
                </el-col>
              </el-row> 
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
          <el-form ref="form" :model="form" label-width="80px">
            <!-- <el-form-item label="售价">
              <el-input v-model="form.SellPrice" :disabled="true">
                <i slot="prefix" class="el-input__icon">¥</i>
              </el-input>
            </el-form-item> -->
            <el-form-item label="数量">
              <el-input type="number" v-model="form.Quantity"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.Remark"></el-input>
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
      <el-table :data="DONE_BARCODE" border stripe height="200" size="mini" 
          highlight-current-row 
          type="index" 
          class="done_barcode" 
          @row-click="done_barcode_change"
          v-show="done_barcode">
        <el-table-column prop="SKU" label="SKU" width="150" align="center"></el-table-column>
        <el-table-column prop="ProductName" label="商品名称" width="200" align="center"></el-table-column>
        <el-table-column prop="SpecString" label="规格" width="110" align="center"></el-table-column>
        <el-table-column prop="Stock" label="库存" width="80" align="center"></el-table-column>
        <el-table-column prop="SellPrice" label="售价" width="80" align="center"></el-table-column>
      </el-table>
    </transition>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import otherHeader from './tpl/otherHeader'
  import _ from 'lodash'
  export default {
    name: 'Index',
    components:{
      otherHeader
    },
    data() {
      return {
        title:'商品报损',
        tableData: [],
        barcode_cashier: [],
        barcode_cashier_state: '',
        done_barcode:false,
        alertEdit: false,
        textarea:'',
        form: {},
        Orderjinjia:"0.00",
        OrderQuantity:"0",
        OrderAmount:"0.00"
      }
    },
    mounted(){
      this.$refs.inputfocus.focus()
    },
    computed: {
      ...mapGetters(['DONE_BARCODE','DONE_REPORTEDLOSS','DONE_TOLOGIN'])
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
      handleEdit(index,row) {
        this.alertEdit = true

        this.form.countPrice = row.countPrice//售价小计
        this.form.Quantity = row.Quantity//数量
        this.form.ActualSellPrice = row.ActualSellPrice//现价
        this.form.ProductId = row.ProductId// 商品主键
        this.form.SKU = row.SKU// 商品Sku
        this.form.ProductName = row.ProductName// 商品名称
        this.form.SpecString = row.SpecString// sku对应的规格
        this.form.SellPrice = row.SellPrice// 商品价格
        this.form.Stock = row.Stock// 商品库存
        this.form.SellFlag = row.SellFlag// 0 正常售卖 1 停止售卖 
        this.form.Remark = row.Remark || ""// 备注
      },
      SubmitDetail() {
        const _this = this;
        if(_this.form.Quantity<1){
          this.$message({
            message: '警告，输入信息不符合规范！',
            type: 'warning'
          });
          return
        }
        this.alertEdit = false
        this.tableData.forEach((element,index,array)=>{
          if(_this.form.SKU === element.SKU){
              // element.SellPrice = _this.form.SellPrice// 商品价格
              element.Quantity = parseFloat(_this.toDecimal2(_this.form.Quantity))//数量
              // element.countPrice = _this.toDecimal2(element.SellPrice*element.Quantity)//小计
              element.Remark = _this.form.Remark || ''// 备注
              return
          }
        })
        this.$refs.singleTable.doLayout();
      },
      handleSelect() {
        if(this.barcode_cashier_state !== ""){
          this.$store.dispatch('FECTH_BARCODE',this.barcode_cashier_state)
        }
      },
      Submit(){
        if(this.tableData.length !== 0){
          this.$store.dispatch('FECTH_REPORTEDLOSS',this.tableData)
        }else{
          this.$alert('当前没有报损商品，请先添加！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              console.log(action)
            }
          })
        }
      },
      done_barcode_change(row){
        const _this = this;
        this.done_barcode = false;
        this.barcode_cashier_state = '';
        const flag = {isPush:true};
        row.Quantity = row.Quantity || 1;//数量
        // row.countPrice = this.toDecimal2(row.SellPrice*row.Quantity) || row.SellPrice;//小计
        if (this.tableData.length !== 0) {
          this.tableData.forEach((element,index,array)=>{
            if(row.SKU === element.SKU){
                element.Quantity++;
                // element.countPrice = _this.toDecimal2(element.Quantity*element.SellPrice);
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
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index];
          } else {
            sums[index];
          }
        });

        // this.OrderQuantity = sums[4] || "0"
        // this.OrderAmount = this.toDecimal2(sums[5]) || "0.00"
        return ''
      },
      debounce: _.debounce(function () {
          this.$store.dispatch('FECTH_BARCODE',this.barcode_cashier_state)
      }, 300)
    },
    watch:{
      DONE_BARCODE(val){
        if(val.length == 0){
          this.done_barcode = false;
          if(this.barcode_cashier_state != ""){
            this.$notify({
              title: '提示',
              message: '未找到相关产品',
              position: 'bottom-left',
              duration:1500,
              offset: 150
            });
            this.barcode_cashier_state = ""
          }
        }else if(val.length === 1){
          this.done_barcode = false;
          this.done_barcode_change(val[0])
        }else{
          this.done_barcode = true;
        }
      },
      DONE_TOLOGIN(val){
		    this.jumpCode(val)
      },
      DONE_REPORTEDLOSS(val){
    		if(val.Success){
    			this.$message({
    	          message: '报损成功！',
    	          type: 'success'
    	        });
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
    width: 620px;
    position: absolute;
    bottom: 130px;
    z-index: 999;
  }
</style>
