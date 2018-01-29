<template>
  <div class="hello">
    <el-container style="border: 1px solid #eee;height:99vh">
      <indexHeader :userinfo="userinfo" v-on:emit-TipCounts="listenEmit"></indexHeader>
      <el-main class="main-vh">
        <el-table :data="tableData" 
          border 
          stripe 
          height="auto" 
          highlight-current-row 
          show-summary 
          :summary-method="getSummaries" 
          ref="singleTable">
          <el-table-column prop="SKU" label="商品编码" width="150" align="center"></el-table-column>
          <el-table-column prop="ProductName" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="SpecString" label="规格" align="center"></el-table-column>
          <el-table-column prop="SellPrice" label="原价" width="80" align="center"></el-table-column>
          <el-table-column prop="discount" label="折扣%" width="80" align="center"></el-table-column>
          <el-table-column prop="Quantity" label="数量" width="80" align="center"></el-table-column>
          <el-table-column prop="countPrice" label="小计" width="80" align="center"></el-table-column>
          <el-table-column prop="ActualSellPrice" label="现价" width="80" align="center"></el-table-column>
          <el-table-column prop="SellFlag" label="状态" width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.SellFlag !== 0 || scope.row.Stock <=0" style="color: red">不可售</span>
              <span v-else>正常</span>
            </template>
          </el-table-column>
          <el-table-column prop="Stock" label="库存" width="80" align="center"></el-table-column>
          <el-table-column label="可用库存" width="80" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.AbleStock}}</span>
              <span v-if="scope.row.AbleStock < scope.row.Stock" @click="expandClick(scope.row.SKU)">
                <i class="el-icon-warning" style="color:#409EFF;font-size:12px;position:relative;top:-1px;left:3px;"></i>
              </span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100" align="center">
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
                  :disabled="true" 
                  v-model="nocode_cashier" 
                  @keyup.enter.native="enter_nobarcode">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="dx-input-member">
              <el-input 
                  placeholder="会员号/手机号" 
                  v-model="member_cashier" 
                  class="dx-input-member-input" 
                  @keyup.enter.native="enter_cashier">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="enter_cashier"></i>
              </el-input>
              <el-row style="border-top:1px solid #e6ebf5">
                <el-col :span="8">
                  <div class="grid-content" style="border-right: 1px solid #e6ebf5">
                    <div style="height:20px;line-height:20px">{{GetUName.MemberUserName}}</div>
                    <div>
                      <el-button type="text" size="mini" @click="memberOut">退出</el-button>
                      <el-button type="text" size="mini">查看</el-button>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content" style="border-right: 1px solid #e6ebf5">
                    <div style="height:20px;line-height:20px">00.00</div>
                    <div>
                      <el-button type="text" size="mini">余额</el-button>
                      <el-button type="text" size="mini">查看</el-button>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content">
                    <div style="height:20px;line-height:20px">0</div>
                    <div>
                      <el-button type="text" size="mini">积分</el-button>
                      <el-button type="text" size="mini">查看</el-button>
                    </div>
                  </div>
                </el-col>
              </el-row> 
            </div>
          </el-col>
          <el-col :span="7">
          <div style="padding:10px 0px;">
            <el-button icon="el-icon-delete" @click="removeAll">清除</el-button>
            <el-badge  class="item">
              <el-button icon="el-icon-upload" @click="registerOrder">挂单</el-button>
            </el-badge>
            <el-badge :value="registerCount" class="item">
              <router-link to="/registerOrderList"><el-button icon="el-icon-download">挂单列表</el-button></router-link>              
            </el-badge>
          </div>
          </el-col>
          <el-col :span="6">
            <div class="bg-purple" @click="Submit">
              <el-row>
                <el-col :span="11">
                  <div class="dx-collection">收款</div>
                  <div>共计 {{OrderQuantity}} 件商品</div>
                </el-col>
                <el-col :span="13">
                  <div class="dx-priceCount">¥{{OrderAmount}}</div>
                </el-col>
              </el-row> 
            </div>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
    <!-- AlertEdit -->
    <el-dialog :title="title" :visible.sync="alertEdit" width="30%">
      <el-container>
        <el-main>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="原价">
              <el-input v-model="form.SellPrice" :disabled="true">
                <i slot="prefix" class="el-input__icon">¥</i>
              </el-input>
            </el-form-item>
            <el-form-item label="折扣">
              <div class="el-input">
                <input class="el-input__inner" ref="nowDiscount" type="number" v-model="form.discount" @input="disChange">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner"><i class="el-input__icon">%</i></span>
                </span>
              </div>
            </el-form-item>
            <el-form-item label="现价">
              <div class="el-input is-disabled">
                <input class="el-input__inner" ref="nowPrice" type="number" disabled v-model="form.ActualSellPrice" @input="SellChange">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner"><i class="el-input__icon">¥</i></span>
                </span>
              </div>
            </el-form-item>
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
    <!-- dialogVisible -->
    <el-dialog title="库存警告提示" :visible.sync="dialogVisible" width="60%">
      <el-table :data="dialogData" height="400">
        <el-table-column property="SKU" label="SKU" width="150"></el-table-column>
        <el-table-column property="ProductName" label="商品名称"></el-table-column>
        <el-table-column property="Quantity" label="购买数量" width="100"></el-table-column>
        <el-table-column property="" label="可用库存" width="100">
          <template slot-scope="scope">
              <span style="color: red">{{scope.row.AbleStock}}</span>
          </template>
        </el-table-column>
        <el-table-column property="Stock" label="库存" width="100"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- dialogwarn -->
    <el-dialog title="库存占用详情" :visible.sync="dialogWarn" width="70%">
      <el-table :data="dialogWarnData" height="400">
        <el-table-column property="Code" label="单号" width="180" align="center"></el-table-column>
        <el-table-column property="Type" label="订单类型" width="100" align="center"></el-table-column>
        <el-table-column property="Quantity" label="占用数量" width="80" align="center"></el-table-column>
        <el-table-column property="CreateDate" label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.CreateDate.split("T")[0]}} {{scope.row.CreateDate.split("T")[1].split(".")[0]}}</span>
          </template>
        </el-table-column>
        <el-table-column property="PayType" label="支付状态" width="100" align="center"></el-table-column>
        <el-table-column property="SkuUnit" label="单位" width="100" align="center"></el-table-column>
        <el-table-column property="MinUnitQuantity" label="箱规" width="100" align="center"></el-table-column>
      </el-table>
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
        <el-table-column prop="SellPrice" label="单价" width="80" align="center"></el-table-column>
        <el-table-column prop="ProductId" label="商品ID" width="80" align="center"></el-table-column>
        <el-table-column prop="SellFlag" label="现状" width="80" align="center"></el-table-column>
      </el-table>
    </transition>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import indexHeader from './tpl/homeHeader'
  import _ from 'lodash'
  export default {
    name: 'Index',
    components:{
      indexHeader
    },
    data() {
      return {
        userinfo:"",
        GetUName:{
          MemberUserId:0,
          MemberUserName:"******",
          ID:""
        },
        tableData: [],
        barcode_cashier: [],
        dialogData:[],
        dialogWarnData:[],
        barcode_cashier_state: '',
        nocode_cashier: '',
        member_cashier:'',
        title:'商品详情',
        done_barcode:false,
        alertEdit: false,
        dialogVisible:false,
        dialogWarn:false,
        TempSave:false,
        textarea:'',
        form: {},
        discountSwitch:'true',
        OrderQuantity:"0",
        OrderAmount:"0.00",
        registerCount:"",
        registerDot:false,
      }
    },
    created(){
      this.$store.commit('loginGet','loginInfo')
      if(this.GloginGet.hasOwnProperty('UserName')){
        if(this.DONE_BARCODE_LIST.length !== 0){
          this.tableData = this.DONE_BARCODE_LIST
        }
        this.userinfo = this.GloginGet
        this.$store.dispatch('FECTH_POSORDERLOGCOUNTS',{})
      }else{
        this.$router.push('/login')
      }
    },
    mounted(){
      this.$refs.inputfocus.focus()
      var userName = window.sessionStorage.getItem("userName")
      if(userName !== null){
        var _GetUName = JSON.parse(userName)
        this.GetUName.MemberUserName = _GetUName.MemberUserName
        this.GetUName.MemberUserId = _GetUName.MemberUserId
        this.GetUName.ID = _GetUName.ID
      }
    },
    computed: {
      ...mapGetters(['DONE_BARCODE','DONE_BARCODE_LIST','DONE_POSORDERSUBMIT','DONE_TOLOGIN','GloginGet','DONE_CASHIER','DONE_SENDMESSAGE','DONE_POSORDERLOGCOUNTS','DONE_GETPOSSKUUSESTOCK'])
    },
    methods:{
      registerTip(){
        this.registerDot = true;
      },
      handleDelete(index,row) {
        var _this = this;
        this.$alert('确定要删除么？', '删除', {
          confirmButtonText: '确定',
          callback: action => {
            if(action === 'confirm'){
              _this.tableData.splice(index,1)
              this.$message({
                type: 'success',
                message: "删除成功！",
                duration:1000
              });
              this.$refs.inputfocus.focus()
            }else{
              this.$message({
                type: 'info',
                message: "取消删除！",
                duration:1000
              });
              this.$refs.inputfocus.focus()
            }
          }
        })
      },
      handleEdit(index,row) {
        this.alertEdit = true
        this.form.countPrice = row.countPrice//小计
        this.form.Quantity = row.Quantity//数量
        this.form.ActualSellPrice = row.ActualSellPrice//现价
        this.form.discount = row.discount//折扣
        this.form.ProductId = row.ProductId// 商品主键
        this.form.SKU = row.SKU// 商品Sku
        this.form.ProductName = row.ProductName// 商品名称
        this.form.SpecString = row.SpecString// sku对应的规格
        this.form.SellPrice = row.SellPrice// 商品价格
        this.form.Stock = row.Stock// 商品库存
        this.form.SellFlag = row.SellFlag// 0 正常售卖 1 停止售卖 
        this.form.Remark = row.Remark || ""// 备注
      },
      disChange(){//折扣
        var discountvalue = this.$refs.nowDiscount.value
        var priceValue = this.toDecimal2(discountvalue * this.form.SellPrice / 100)
        this.$refs.nowPrice.value = priceValue
      },
      SellChange(){//价格
        var priceValue = this.$refs.nowPrice.value
        var discountvalue = ((priceValue / this.form.SellPrice)*100).toFixed(2)
        this.$refs.nowDiscount.value = discountvalue
      },
      SubmitDetail() {//修改商品信息
        const _this = this;
        this.form.discount = this.$refs.nowDiscount.value 
        if(_this.form.discount < 0 || _this.form.Quantity <= 0){
          this.$message({
            message: '警告，输入信息不符合规范！',
            type: 'warning',
            duration:1000
          });
          return
        }
        this.alertEdit = false
        this.tableData.forEach((element,index,array)=>{
          if(_this.form.SKU === element.SKU){
              element.discount = _this.form.discount//折扣
              element.SellPrice = _this.form.SellPrice// 商品价格
              element.Quantity = parseFloat(_this.toDecimal2(_this.form.Quantity))//数量
              element.ActualSellPrice = _this.toDecimal2(element.SellPrice*element.discount*0.01)//现价
              element.countPrice = _this.toDecimal2(element.ActualSellPrice*element.Quantity)//小计
              element.Remark = _this.form.Remark || ''// 备注
              return
          }
        })

        this.$refs.singleTable.doLayout();
      },
      handleSelect() {//扫码检索
        if(this.barcode_cashier_state !== ""){
          this.$store.dispatch('FECTH_BARCODE',this.barcode_cashier_state)
        }
      },
      enter_nobarcode(){
        alert(`${this.nocode_cashier}`)
      },
      enter_cashier(){
        var data = {
          PhoneOrUName:this.member_cashier
        }
        this.$store.dispatch('FECTH_CASHIER',data)
      },
      memberOut(){//会员退出
        this.GetUName.MemberUserId = 0
        this.GetUName.MemberUserName = "******"
        this.GetUName.ID = ""
        window.sessionStorage.removeItem("userName")
      },
      registerOrder(){//挂单
        if(this.tableData.length !== 0){
          this.TempSave = true
          var data = {
            MemberUserId:this.GetUName.MemberUserId,
            MemberUserName:this.GetUName.MemberUserName,
            SubmitParametersItems:this.tableData,
            IsTempSave:-1,
            OrderID:this.GetUName.ID
          }
          this.$store.dispatch('FECTH_POSORDERSUBMIT',data)
        }else{
          this.$alert('当前没有订单，请先添加商品！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              console.log(action)
            }
          })
        }
      },
      Submit(){//判断库存--提交
        if(this.tableData.length !== 0){
          var filterResult = this.tableData.filter((item,index,array)=>{
            return (item.AbleStock < item.Quantity)
          })
          if(filterResult.length == 0){
            this.dialogSubmit()
          }else{
            this.dialogData = filterResult
            this.dialogVisible = true
          }
        }else{
          this.$alert('当前没有订单，请先添加商品！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              console.log(action)
            }
          })
        }
      },
      dialogSubmit(){//提交确认
        this.TempSave = false
          var data = {
            MemberUserId:this.GetUName.MemberUserId,
            MemberUserName:this.GetUName.MemberUserName,
            OrderID:this.GetUName.ID,
            SubmitParametersItems:this.tableData
          }
          console.log(data)
          this.$store.commit('TOGGLE_BARCODE_LIST',this.tableData)
          this.$store.dispatch('FECTH_POSORDERSUBMIT',data)
      },
      expandClick(sku){
        var data = {
          SkuOrName:sku
        }
        this.$store.dispatch('FECTH_GETPOSSKUUSESTOCK',data)
      },
      done_barcode_change(row){
        const _this = this;
        this.done_barcode = false;
        this.barcode_cashier_state = '';
        const flag = {isPush:true};
        row.Quantity = row.Quantity || 1;//数量
        row.discount = row.discount || 100;//折扣
        row.ActualSellPrice = this.toDecimal2(row.SellPrice*row.discount*0.01) || row.SellPrice;//现价
        row.countPrice = this.toDecimal2(row.ActualSellPrice*row.Quantity) || row.SellPrice;//小计
        if (this.tableData.length !== 0) {
          this.tableData.forEach((element,index,array)=>{
            if(row.SKU === element.SKU){
                element.Quantity++;
                element.countPrice = _this.toDecimal2(element.Quantity*element.ActualSellPrice);
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
            // sums[index] += ' 元';
            sums[index];
          } else {
            // sums[index] = 'N/A';
            sums[index];
          }
        });

        this.OrderQuantity = sums[5] || "0"
        this.OrderAmount = this.toDecimal2(sums[6]) || "0.00"
        this.sendMessage()
        return ''
      },
      removeAll(){
        var _this = this;
        if(this.tableData.length == 0) {
          this.$message({
            message: '还没有订单哦！',
            type: 'warning',
            duration:1000
          });
          return
        }
        this.$alert('确定要全部删除么？', '删除', {
          confirmButtonText: '确定',
          callback: action => {
            if(action === 'confirm'){
              _this.tableData = []
              this.$message({
                type: 'success',
                message: "删除成功！",
                duration:1000
              });
              this.$refs.inputfocus.focus()
            }else{
              this.$message({
                type: 'info',
                message: "取消删除！",
                duration:1000
              });
              this.$refs.inputfocus.focus()
            }
          }
        })
      },
      sendMessage:_.debounce(function(){//发送副屏
        var JsonData = {
          tableDate:this.tableData,
          Quantity:this.OrderQuantity,
          Amount:this.OrderAmount
        }
        var obj = {
          TypeId:1,
          JsonData:JSON.stringify(JsonData)
        }
        this.$store.dispatch('FECTH_SENDMESSAGE',obj)
      },300),
      listenEmit(val){
        console.log("val")
      }
    },
    watch:{
      DONE_POSORDERLOGCOUNTS(val){
        if(val.Success){
          this.registerCount = val.Data;
          if(this.registerCount > 0) {
            this.registerTip()
          }else{
            this.registerDot = false
          }
        }else{
            this.jumpCode(val)
        }
      },
      DONE_POSORDERSUBMIT(val){
        if(val.Success){
          if (!this.TempSave) {
              this.$router.push('/collection')
          }else{
            this.$message({
              message: '挂单成功！',
              type: 'success',
              duration:1000
            });
            this.tableData = []
            this.$store.dispatch('FECTH_POSORDERLOGCOUNTS',{})
          }
        }else{
            this.jumpCode(val)
        }
      },
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
      DONE_CASHIER(val){
        if(val.Success){
            this.member_cashier = ""
            this.GetUName.MemberUserName = val.Data.UserName
            this.GetUName.MemberUserId = val.Data.UserID
            var GetUName = JSON.stringify(this.GetUName)
            window.sessionStorage.setItem("userName",GetUName)
        }else{
            this.jumpCode(val)
        }
      },
      DONE_SENDMESSAGE(val){
        if(!val.Success){
          this.$message.error('副屏推送 失败！');
        }
      },
      DONE_GETPOSSKUUSESTOCK(val){
        if(val.Success){
            this.dialogWarnData = val.Data
            this.dialogWarn = true
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
    background: #FF5555;
    color: #ffffff;
    float: right;
    width: 310px;
    margin: 10px 0px;
    height: 90px;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
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
  .grid-content{height: 40px;font-size: 14px;text-align: center;margin-top: 5px;overflow: hidden;}
  .dx-collection{line-height: 40px;font-size: 20px;}
  .dx-priceCount{font-size: 30px;line-height: 70px;text-align: center;}
  .done_barcode{
    width: 620px;
    position: absolute;
    bottom: 130px;
    z-index: 999;
  }
</style>
<style>
  .dx-input-member-input input{ border: none}
</style>
