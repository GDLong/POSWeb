import * as types from '../receiving-types.js'
import axios from 'axios'
const state = {
    webapi:'http://erpapi.dangxiabs.com/api',
    // webapi:'http://erpapi.czluopan.net/api',
    // webapi:'http://192.168.0.105:90/api',
    loginInfo:{},
    VuexBarcode:[],
    VuexBarcodeList:[],
    VuexCashier:{},
    VuexSubmitResponse:{},
    VuexReturnResponse:{},
    VuexPosOrderResponse:{},
    VuexSearchOrderInfo:{},
    VuexLoginInfo:{},
    VuexToLogin:{},
    VuexToLoginOut:{},
    VuexLodop:{},
    VuexLodopGoods:{},
    VuexSendMessage:{},
    VuexWarning:{},
    VuexReported:{},
    VuexProductType:{},
    VuexProductList:{},
    VuexProductSearch:{},
    VuexOrderCount:{},
    VuexOrderList:{},
    VuexOrderInfo:{},
    VuexDelOrder:{},
    VuexOrderPickerList:{},
    VuexOrderPickerInfo:{},
    VuexOrderPickerOpera:{},
    VuexVerifySku:{},
    VuexApplyType:{},
    VuexNewApply:{},
    VuexNewStorage:{},
    VuexPurchaseHistory:{},
    VuexWareHistory:{},
    VuexTipCounts:{},
    VuexuseStock:{},
}

//需要处理返回的数据放在这，不进行业务操作
const getters = {
    [types.DONE_GETPOSCOUNT]: (state,getters) => {
        return state.VuexTipCounts// Tip汇总
    },
    [types.DONE_BARCODE_LIST]: (state,getters) => {
        return state.VuexBarcodeList// 获取订单信息列表
    },
    [types.DONE_VERIFYSKU]: (state,getters) => {
        return state.VuexVerifySku// 采购入库扫码
    },
    [types.DONE_BARCODE]: (state) => {
        return state.VuexBarcode// 获取商品信息
    },
    [types.DONE_CASHIER]: state => {
        return state.VuexCashier// 获取会员信息
    },
    [types.DONE_POSORDERSUBMIT]: state => {
        return state.VuexSubmitResponse// 提交订单
    },
    [types.DONE_POSORDERRETURN]: state => {
        return state.VuexReturnResponse// 退货订单
    },
    [types.DONE_POSORDERPAY]: state => {
        return state.VuexPosOrderResponse// 支付订单
    },
    [types.DONE_SEARCHORDERINFO]: state => {
        return state.VuexSearchOrderInfo// 销售单据
    },
    [types.DONE_WARNING]: state => {
        return state.VuexWarning// 库存预警
    },
    [types.DONE_REPORTEDLOSS]: state => {
        return state.VuexReported// 商品报损
    },
    [types.DONE_GETSTOREPRODUCTYPE]: state => {
        return state.VuexProductType// 商品分类
    },
    [types.DONE_POSORDERLOGCOUNTS]: state => {
        return state.VuexOrderCount// 挂单总数
    },
    [types.DONE_POSORDERLOGLIST]: state => {
        return state.VuexOrderList// 挂单列表
    },
    [types.DONE_POSORDERLOGINFO]: state => {
        return state.VuexOrderInfo// 挂单详情
    },
    [types.DONE_ORDERPICKUPLIST]: state => {
        return state.VuexOrderPickerList// 门店自提列表
    },
    [types.DONE_ORDERPICKUPINFO]: state => {
        return state.VuexOrderPickerInfo// 门店自提详情
    },
    [types.DONE_ORDERPICKUPOPERA]: state => {
        return state.VuexOrderPickerOpera// 门店自提操作
    },
    [types.DONE_APPLYTYPE]: state => {
        return state.VuexApplyType// 采购类型
    },
    [types.DONE_NEWAPPLMONAD]: state => {
        return state.VuexNewApply// 新建采购单
    }, 
    [types.DONE_NEWINSERTSTORAGE]: state => {
        return state.VuexNewStorage// 新建入库
    },
    [types.DONE_PURCHASEHISTORY]: state => {
        return state.VuexPurchaseHistory// 采购单历史
    },
    [types.DONE_WAREHISTORY]: state => {
        return state.VuexWareHistory// 入库单历史
    },
    [types.DONE_DELPOSORDERLOG]: state => {
        return state.VuexDelOrder// 删除挂单
    },
    [types.DONE_GETSTOREPRODUCLIST]: state => {
        return state.VuexProductList// 商品分类信息
    },
    [types.DONE_GETSTOREPRODUCLISTSEARCH]: state => {
        return state.VuexProductSearch// 商品分类信息检索
    },
    [types.DONE_LOGIN]: state => {
        return state.VuexLoginInfo// 登录信息
    },
    [types.DONE_TOLOGIN]: state => {
        return state.VuexToLogin// 去登录
    },
    [types.DONE_LOGINOUT]: state => {
        return state.VuexToLoginOut// 注销
    },
    [types.DONE_PRINTGETMODEL]: state => {
        return state.VuexLodop// 打印小票
    },
    [types.DONE_PRINTGETGOODS]: state => {
        return state.VuexLodopGoods// 打印商品标签
    },
    [types.DONE_SENDMESSAGE]({commit},data){
        return state.VuexSendMessage// 推送副屏
    },
    [types.DONE_GETPOSSKUUSESTOCK]({commit},data){
        return state.VuexuseStock// 库存占用明细
    },
    GloginGet:state => {
        return state.loginInfo// login cookies
    }
}

//注册各种数据变化的方法,处理同步
const mutations = {
    // Tip汇总
    [types.TOGGLE_GETPOSCOUNT](state, all) {
        state.VuexTipCounts = all
    },
    // 获取订单信息列表
    [types.TOGGLE_BARCODE_LIST](state, all) {
        state.VuexBarcodeList = all
    },
    // 采购入库扫码
    [types.TOGGLE_VERIFYSKU](state, all) {
        state.VuexVerifySku = all
    },
    // 清空订单信息列表
    [types.TOGGLE_DELETE_BARCODE_LIST](state, all) {
        state.VuexBarcodeList = []
    },
    // 根据扫码信息获取商品信息
    [types.TOGGLE_BARCODE](state, all) {
        state.VuexBarcode = all
    },
    // 获取会员信息
    [types.TOGGLE_CASHIER](state, all) {
        state.VuexCashier = all
    },
    // 提交订单
    [types.TOGGLE_POSORDERSUBMIT](state, all) {
        state.VuexSubmitResponse = all
    },
    // 退货订单
    [types.TOGGLE_POSORDERRETURN](state, all) {
        state.VuexReturnResponse = all
    },
    // 支付订单
    [types.TOGGLE_POSORDERPAY](state, all) {
        state.VuexPosOrderResponse = all
    },
    // 销售单据
    [types.TOGGLE_SEARCHORDERINFO](state,all){
        state.VuexSearchOrderInfo = all
    },
    // 库存预警
    [types.TOGGLE_WARNING](state,all){
        state.VuexWarning = all
    },
    // 商品报损
    [types.TOGGLE_REPORTEDLOSS](state,all){
        state.VuexReported = all
    },
    // 商品分类
    [types.TOGGLE_GETSTOREPRODUCTYPE](state,all){
        state.VuexProductType = all
    },
    // 商品分类信息
    [types.TOGGLE_GETSTOREPRODUCLIST](state,all){
        state.VuexProductList = all
    },
    // 商品分类信息检索
    [types.TOGGLE_GETSTOREPRODUCLISTSEARCH](state,all){
        state.VuexProductSearch = all
    },
    // 挂单总数
    [types.TOGGLE_POSORDERLOGCOUNTS](state,all){
        state.VuexOrderCount = all
    },
    // 挂单列表
    [types.TOGGLE_POSORDERLOGLIST](state,all){
        state.VuexOrderList = all
    },
    // 挂单详情
    [types.TOGGLE_POSORDERLOGINFO](state,all){
        state.VuexOrderInfo = all
    },
    // 删除挂单
    [types.TOGGLE_DELPOSORDERLOG](state,all){
        state.VuexDelOrder = all
    },
    // 门店自提列表
    [types.TOGGLE_ORDERPICKUPLIST](state,all){ 
        state.VuexOrderPickerList = all
    },
    // 门店自提详情
    [types.TOGGLE_ORDERPICKUPINFO](state,all){
        state.VuexOrderPickerInfo = all
    },
    // 门店自提操作
    [types.TOGGLE_ORDERPICKUPOPERA](state,all){
        state.VuexOrderPickerOpera = all
    },
    // 采购类型
    [types.TOGGLE_APPLYTYPE](state,all){
        state.VuexApplyType = all
    },
    // 新建采购单
    [types.TOGGLE_NEWAPPLMONAD](state,all){
        state.VuexNewApply = all
    },
    // 新建入库
    [types.TOGGLE_NEWINSERTSTORAGE](state,all){
        state.VuexNewStorage = all
    },
    // 采购单历史
    [types.TOGGLE_PURCHASEHISTORY](state,all){
        state.VuexPurchaseHistory = all
    },
    // 入库单历史
    [types.TOGGLE_WAREHISTORY](state,all){
        state.VuexWareHistory = all
    },
    // 登录
    [types.TOGGLE_LOGIN](state,all){
        state.VuexLoginInfo = all
    },
    // 去登录
    [types.TOGGLE_TOLOGIN](state,all){
        state.VuexToLogin = all
    },
    // 注销
    [types.TOGGLE_LOGINOUT](state,all){
        state.VuexToLoginOut = all
    },
    // 打印小票
    [types.TOGGLE_PRINTGETMODEL](state,all){
        state.VuexLodop = all
    },
    // 打印商品标签
    [types.TOGGLE_PRINTGETGOODS](state,all){
        state.VuexLodopGoods = all
    },
    // 推送副屏
    [types.TOGGLE_SENDMESSAGE](state,all){
        state.VuexSendMessage = all
    },
    // 库存占用明细
    [types.TOGGLE_GETPOSSKUUSESTOCK](state,all){
        state.VuexuseStock = all
    },
    // login cookies
    loginGet(state,name) {
        var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        var data = v ? JSON.parse(v[2]) : null;
        var response = {
            ...data,
            Version:"1",
            Source:"Window",
        }
        state.loginInfo = response
    }
}

//处理异步逻辑或者是一些逻辑，再去commit事件
const actions = {
    // Tip汇总
    [types.FECTH_GETPOSCOUNT]({commit},data) {
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Order/GetPosRemindCount', {
            ..._loginInfo,
            ...data
        })
        .then(res => {
            commit(types.TOGGLE_GETPOSCOUNT, res.data)
        }).catch(err => alert("Tip汇总，服务器拒绝访问！"))
    },
    // 根据扫码信息获取商品信息
    [types.FECTH_BARCODE]({commit},id) {
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Order/GetPosProduct', {
            ..._loginInfo,
            SkuOrName: id
        })
        .then(res => {
            if(res.data.Success){
                commit(types.TOGGLE_BARCODE, res.data.Data)
            }else{
                commit(types.TOGGLE_TOLOGIN, res.data)
            }
        }).catch(err => alert("扫码信息，服务器拒绝访问！"))
    },
    // 采购入库扫码
    [types.FECTH_VERIFYSKU]({commit},data) {
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Purchase/verifySku', {
            ..._loginInfo,
            ...data
        })
        .then(res => {
            commit(types.TOGGLE_VERIFYSKU, res.data)
        }).catch(err => alert("采购入库扫码，服务器拒绝访问！"))
    },
    // 获取会员信息
    [types.FECTH_CASHIER]({commit},data) {
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Order/GetMemberByPhoneOrUName',{
            ..._loginInfo,
            ...data
        })
        .then(res => {
            commit(types.TOGGLE_CASHIER, res.data)
        }).catch(err => alert("获取会员信息，服务器拒绝访问！"))
    },
    // 提交订单
    [types.FECTH_POSORDERSUBMIT]({commit}, submitObj) {
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Order/PosOrderSubmit',{
            ..._loginInfo,
            ...submitObj
        })
        .then(res => {
            commit(types.TOGGLE_POSORDERSUBMIT, res.data)
        }).catch(err => alert("提交订单，服务器拒绝访问！"))
    },
    // 退货订单
    [types.FECTH_POSORDERRETURN]({commit}, submitObj) {
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Order/PosOrderReturn',{
            ..._loginInfo,
            ...submitObj
        })
        .then(res => {
            commit(types.TOGGLE_POSORDERRETURN, res.data)
        }).catch(err => alert("退货订单，服务器拒绝访问！"))
    },
    // 支付订单
    [types.FECTH_POSORDERPAY]({commit}, submitObj) {
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Order/PosOrderPay',{
            ..._loginInfo,
            ...submitObj
        })
        .then(res => {
            commit(types.TOGGLE_POSORDERPAY, res.data)
        }).catch(err => alert("支付订单，服务器拒绝访问！"))
    },
    // 销售单据
    [types.FECTH_SEARCHORDERINFO]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Order/SearchOrderinfo',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_SEARCHORDERINFO,res.data)
        }).catch(err => alert("销售单据，服务器拒绝访问！"))
    },
    // 库存预警
    [types.FECTH_WARNING]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Product/GetProductInventoryWarning',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_WARNING,res.data)
        }).catch(err => alert("库存预警，服务器拒绝访问！"))
    },
    // 商品报损
    [types.FECTH_REPORTEDLOSS]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Order/ReportedLossSubmit',{
            ..._loginInfo,
            Items:data
        }).then(res => {
            commit(types.TOGGLE_REPORTEDLOSS,res.data)
        }).catch(err => alert("商品报损，服务器拒绝访问！"))
    },
    // 商品分类
    [types.FECTH_GETSTOREPRODUCTYPE]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Product/GetStoreProductType',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_GETSTOREPRODUCTYPE,res.data)
        }).catch(err => alert("商品分类，服务器拒绝访问！"))
    },
    // 商品分类信息
    [types.FECTH_GETSTOREPRODUCLIST]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Product/GetStoreProductList',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_GETSTOREPRODUCLIST,res.data)
        }).catch(err => alert("商品分类信息，服务器拒绝访问！"))
    },
    // 商品分类信息检索
    [types.FECTH_GETSTOREPRODUCLISTSEARCH]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Product/GetStoreProductList_bySearch',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_GETSTOREPRODUCLISTSEARCH,res.data)
        }).catch(err => alert("商品分类信息检索，服务器拒绝访问！"))
    },
    // 打印小票
    [types.FECTH_PRINTGETMODEL]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Print/GetModel_OrderInfo',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_PRINTGETMODEL,res.data)
        }).catch(err => alert("打印小票，服务器拒绝访问！"))
    },
    // 打印商品标签
    [types.FECTH_PRINTGETGOODS]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Print/GetModel_GoodsInfo',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_PRINTGETGOODS,res.data)
        }).catch(err => alert("打印商品标签，服务器拒绝访问！"))
    },
    // 挂单总数
    [types.FECTH_POSORDERLOGCOUNTS]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Order/GetPosOrderLogCounts',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_POSORDERLOGCOUNTS,res.data)
        }).catch(err => alert("挂单总数，服务器拒绝访问！"))
    },
    // 挂单列表
    [types.FECTH_POSORDERLOGLIST]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Order/GetPosOrderLogList',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_POSORDERLOGLIST,res.data)
        }).catch(err => alert("挂单列表，服务器拒绝访问！"))
    },
    // 挂单详情
    [types.FECTH_POSORDERLOGINFO]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Order/GetPosOrderItemLogList',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_POSORDERLOGINFO,res.data)
        }).catch(err => alert("挂单详情，服务器拒绝访问！"))
    },
    // 删除挂单
    [types.FECTH_DELPOSORDERLOG]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Order/DelPosOrderLog',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_DELPOSORDERLOG,res.data)
        }).catch(err => alert("删除挂单，服务器拒绝访问！"))
    },
    // 门店自提列表
    [types.FECTH_ORDERPICKUPLIST]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Order/GetStoreOrderPickUpList',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_ORDERPICKUPLIST,res.data)
        }).catch(err => alert("门店自提列表，服务器拒绝访问！"))
    },
    // 门店自提详情
    [types.FECTH_ORDERPICKUPINFO]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Order/GetStoreOrderPickUpItem',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_ORDERPICKUPINFO,res.data)
        }).catch(err => alert("门店自提详情，服务器拒绝访问！"))
    },
    // 门店自提操作
    [types.FECTH_ORDERPICKUPOPERA]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Order/UpdateStoreOrderPickUp',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_ORDERPICKUPOPERA,res.data)
        }).catch(err => alert("门店自提操作，服务器拒绝访问！"))
    },
    // 采购类型
    [types.FECTH_APPLYTYPE]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Purchase/allApplyType',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_APPLYTYPE,res.data)
        }).catch(err => alert("采购类型，服务器拒绝访问！"))
    },
    // 新建采购单
    [types.FECTH_NEWAPPLMONAD]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Purchase/InsertPurchaseApply',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_NEWAPPLMONAD,res.data)
        }).catch(err => alert("新建采购单，服务器拒绝访问！"))
    },
    // 新建入库
    [types.FECTH_NEWINSERTSTORAGE]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Purchase/InsertPurchaseStorage',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_NEWINSERTSTORAGE,res.data)
        }).catch(err => alert("新建入库，服务器拒绝访问！"))
    },
    //入库单历史
    [types.FECTH_WAREHISTORY]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Purchase/queryStorage',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_WAREHISTORY,res.data)
        }).catch(err => alert("入库单历史，服务器拒绝访问！"))
    },
    //采购单历史
    [types.FECTH_PURCHASEHISTORY]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Purchase/queryApply',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_PURCHASEHISTORY,res.data)
        }).catch(err => alert("采购单历史，服务器拒绝访问！"))
    },
    // 登录
    [types.FECTH_LOGIN]({commit},data){
        axios.post(state.webapi+'/token/post',{
            ...data
        }).then(res => {
            commit(types.TOGGLE_LOGIN,res.data)
        }).catch(err => alert("登录，服务器拒绝访问！"))
    },
    // 注销
    [types.FECTH_LOGINOUT]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/token/LogOut',{
            ..._loginInfo
        }).then(res => {
            commit(types.TOGGLE_LOGINOUT,res.data)
        }).catch(err => alert("注销，服务器拒绝访问！"))
    },
    // 推送副屏
    [types.FECTH_SENDMESSAGE]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Connection/SendMesage',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_SENDMESSAGE,res.data)
        }).catch(err => alert("推送副屏，服务器拒绝访问！"))
    },
    // 库存占用明细
    [types.FECTH_GETPOSSKUUSESTOCK]({commit},data){
        commit('loginGet','loginInfo')
        let _loginInfo = state.loginInfo
        axios.post(state.webapi+'/Order/GetPosSkuUseStock',{
            ..._loginInfo,
            ...data
        }).then(res => {
            commit(types.TOGGLE_GETPOSSKUUSESTOCK,res.data)
        }).catch(err => alert("库存占用明细，服务器拒绝访问！"))
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}