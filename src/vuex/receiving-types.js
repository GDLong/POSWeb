//记录所有的事件名

// actions types
export const FECTH_BARCODE_LIST = 'FECTH_BARCODE_LIST';			// 提交订单列表
export const FECTH_BARCODE = 'FECTH_BARCODE';			// 条码/拼音码/品名
export const FECTH_NOBARCODE = 'FECTH_NOBARCODE';       // 输入价格无码收银
export const FECTH_CASHIER = 'FECTH_CASHIER';		    // 会员号/手机号
export const FECTH_POSORDERSUBMIT = 'FECTH_POSORDERSUBMIT';		    // 提交订单 
export const FECTH_POSORDERPAY = 'FECTH_POSORDERPAY';		    // 支付订单 
export const FECTH_SEARCHORDERINFO = 'FECTH_SEARCHORDERINFO';		    // 销售单据 
export const FECTH_PRINTGETMODEL = 'FECTH_PRINTGETMODEL';		    // 打印小票
export const FECTH_PRINTGETGOODS = 'FECTH_PRINTGETGOODS';		    // 打印商品标签
export const FECTH_LOGIN = 'FECTH_LOGIN';		    // 登录
export const FECTH_LOGINOUT = 'FECTH_LOGINOUT';		    // 注销
export const FECTH_SENDMESSAGE = 'FECTH_SENDMESSAGE';		    // 推送副屏
export const FECTH_WARNING = 'FECTH_WARNING';		    // 库存预警
export const FECTH_REPORTEDLOSS = 'FECTH_REPORTEDLOSS';		    		// 商品报损 
export const FECTH_GETSTOREPRODUCTYPE = 'FECTH_GETSTOREPRODUCTYPE';		    // 门店分类   
export const FECTH_GETSTOREPRODUCLIST = 'FECTH_GETSTOREPRODUCLIST';		// 门店分类信息
export const FECTH_GETSTOREPRODUCLISTSEARCH = 'FECTH_GETSTOREPRODUCLISTSEARCH';		// 门店分类信息检索
export const FECTH_POSORDERRETURN = 'FECTH_POSORDERRETURN';		// 退货订单
export const FECTH_POSORDERLOGCOUNTS = 'FECTH_POSORDERLOGCOUNTS';		// 挂单总数 
export const FECTH_POSORDERLOGLIST = 'FECTH_POSORDERLOGLIST';		// 挂单列表 
export const FECTH_POSORDERLOGINFO = 'FECTH_POSORDERLOGINFO';		// 挂单详情 
export const FECTH_DELPOSORDERLOG = 'FECTH_DELPOSORDERLOG';		// 删除挂单
export const FECTH_ORDERPICKUPCOUNTS = 'FECTH_ORDERPICKUPCOUNTS';		// 门店自提总数
export const FECTH_ORDERPICKUPLIST = 'FECTH_ORDERPICKUPLIST';		// 门店自提列表
export const FECTH_ORDERPICKUPINFO = 'FECTH_ORDERPICKUPINFO';		// 门店自提详情
export const FECTH_ORDERPICKUPOPERA = 'FECTH_ORDERPICKUPOPERA';		// 门店自提操作
export const FECTH_VERIFYSKU = 'FECTH_VERIFYSKU';		// 采购入库扫码
export const FECTH_APPLYTYPE = 'FECTH_APPLYTYPE';		// 采购类型
export const FECTH_NEWAPPLMONAD = 'FECTH_NEWAPPLMONAD';		// 新建采购单
export const FECTH_PURCHASEHISTORY = 'FECTH_PURCHASEHISTORY';		// 采购单历史 
export const FECTH_NEWINSERTSTORAGE = 'FECTH_NEWINSERTSTORAGE';		// 新建入库
export const FECTH_WAREHISTORY = 'FECTH_WAREHISTORY';		// 入库单历史
export const FECTH_GETPOSCOUNT = 'FECTH_GETPOSCOUNT';		// Tip汇总
export const FECTH_GETPOSSKUUSESTOCK = 'FECTH_GETPOSSKUUSESTOCK';		// 库存占用明细

// mutstions types
export const TOGGLE_BARCODE_LIST = 'TOGGLE_BARCODE_LIST';		// 获取订单列表
export const TOGGLE_DELETE_BARCODE_LIST = 'TOGGLE_DELETE_BARCODE_LIST';		// 清空订单信息列表
export const TOGGLE_BARCODE = 'TOGGLE_BARCODE';		// 条码/拼音码/品名
export const TOGGLE_NOBARCODE = 'TOGGLE_NOBARCODE'; // 输入价格无码收银
export const TOGGLE_CASHIER = 'TOGGLE_CASHIER';	    // 会员号/手机号
export const TOGGLE_POSORDERSUBMIT = 'TOGGLE_POSORDERSUBMIT';	    // 提交订单 
export const TOGGLE_POSORDERPAY = 'TOGGLE_POSORDERPAY';	    // 支付订单 
export const TOGGLE_SEARCHORDERINFO = 'TOGGLE_SEARCHORDERINFO';	    // 销售单据 
export const TOGGLE_PRINTGETMODEL = 'TOGGLE_PRINTGETMODEL';		    // 打印小票
export const TOGGLE_PRINTGETGOODS = 'TOGGLE_PRINTGETGOODS';		    // 打印商品标签
export const TOGGLE_LOGIN = 'TOGGLE_LOGIN';		    // 登录
export const TOGGLE_TOLOGIN = 'TOGGLE_TOLOGIN';		    // 去登录
export const TOGGLE_LOGINOUT = 'TOGGLE_LOGINOUT';		    // 注销
export const TOGGLE_SENDMESSAGE = 'TOGGLE_SENDMESSAGE';		    // 推送副屏
export const TOGGLE_WARNING = 'TOGGLE_WARNING';		    // 库存预警
export const TOGGLE_REPORTEDLOSS = 'TOGGLE_REPORTEDLOSS';		    // 商品报损
export const TOGGLE_GETSTOREPRODUCTYPE = 'TOGGLE_GETSTOREPRODUCTYPE';		    // 门店分类   
export const TOGGLE_GETSTOREPRODUCLIST = 'TOGGLE_GETSTOREPRODUCLIST';		// 门店分类信息
export const TOGGLE_GETSTOREPRODUCLISTSEARCH = 'TOGGLE_GETSTOREPRODUCLISTSEARCH';		// 门店分类信息检索
export const TOGGLE_POSORDERRETURN = 'TOGGLE_POSORDERRETURN';		// 退货订单
export const TOGGLE_POSORDERLOGCOUNTS = 'TOGGLE_POSORDERLOGCOUNTS';		// 挂单总数 
export const TOGGLE_POSORDERLOGLIST = 'TOGGLE_POSORDERLOGLIST';		// 挂单列表 
export const TOGGLE_POSORDERLOGINFO = 'TOGGLE_POSORDERLOGINFO';		// 挂单详情 
export const TOGGLE_DELPOSORDERLOG = 'TOGGLE_DELPOSORDERLOG';		// 删除挂单
export const TOGGLE_ORDERPICKUPCOUNTS = 'TOGGLE_ORDERPICKUPCOUNTS';		// 门店自提总数
export const TOGGLE_ORDERPICKUPLIST = 'TOGGLE_ORDERPICKUPLIST';		// 门店自提列表
export const TOGGLE_ORDERPICKUPINFO = 'TOGGLE_ORDERPICKUPINFO';		// 门店自提详情
export const TOGGLE_ORDERPICKUPOPERA = 'TOGGLE_ORDERPICKUPOPERA';		// 门店自提操作
export const TOGGLE_VERIFYSKU = 'TOGGLE_VERIFYSKU';		// 采购入库扫码
export const TOGGLE_APPLYTYPE = 'TOGGLE_APPLYTYPE';		// 采购类型
export const TOGGLE_NEWAPPLMONAD = 'TOGGLE_NEWAPPLMONAD';		// 新建采购单
export const TOGGLE_PURCHASEHISTORY = 'TOGGLE_PURCHASEHISTORY';		// 采购单历史 
export const TOGGLE_NEWINSERTSTORAGE = 'TOGGLE_NEWINSERTSTORAGE';		// 新建入库
export const TOGGLE_WAREHISTORY = 'TOGGLE_WAREHISTORY';		// 入库单历史
export const TOGGLE_GETPOSCOUNT = 'TOGGLE_GETPOSCOUNT';		// Tip汇总
export const TOGGLE_GETPOSSKUUSESTOCK = 'TOGGLE_GETPOSSKUUSESTOCK';		// 库存占用明细

//  getters types
export const DONE_BARCODE_LIST = 'DONE_BARCODE_LIST';// 提交订单列表
export const DONE_BARCODE = 'DONE_BARCODE';		// 条码/拼音码/品名
export const DONE_NOBARCODE = 'DONE_NOBARCODE';	// 输入价格无码收银
export const DONE_CASHIER = 'DONE_CASHIER';		// 会员号/手机号  
export const DONE_POSORDERSUBMIT = 'DONE_POSORDERSUBMIT';		// 提交订单  
export const DONE_POSORDERPAY = 'DONE_POSORDERPAY';		// 支付订单  
export const DONE_SEARCHORDERINFO = 'DONE_SEARCHORDERINFO';		// 销售单据  
export const DONE_PRINTGETMODEL = 'DONE_PRINTGETMODEL';		    // 打印小票
export const DONE_PRINTGETGOODS = 'DONE_PRINTGETGOODS';		    // 打印商品标签
export const DONE_LOGIN = 'DONE_LOGIN';		    // 登录
export const DONE_TOLOGIN = 'DONE_TOLOGIN';		    // 去登录
export const DONE_LOGINOUT = 'DONE_LOGINOUT';		    // 注销
export const DONE_SENDMESSAGE = 'DONE_SENDMESSAGE';		    // 推送副屏
export const DONE_WARNING = 'DONE_WARNING';		    // 库存预警
export const DONE_REPORTEDLOSS= 'DONE_REPORTEDLOSS';		    // 商品报损
export const DONE_GETSTOREPRODUCTYPE = 'DONE_GETSTOREPRODUCTYPE';		    // 门店分类   
export const DONE_GETSTOREPRODUCLIST = 'DONE_GETSTOREPRODUCLIST';		// 门店分类信息
export const DONE_GETSTOREPRODUCLISTSEARCH = 'DONE_GETSTOREPRODUCLISTSEARCH';		// 门店分类信息检索
export const DONE_POSORDERRETURN = 'DONE_POSORDERRETURN';		// 退货订单
export const DONE_POSORDERLOGCOUNTS = 'DONE_POSORDERLOGCOUNTS';		// 挂单总数 
export const DONE_POSORDERLOGLIST = 'DONE_POSORDERLOGLIST';		// 挂单列表 
export const DONE_POSORDERLOGINFO = 'DONE_POSORDERLOGINFO';		// 挂单详情 
export const DONE_DELPOSORDERLOG = 'DONE_DELPOSORDERLOG';		// 删除挂单
export const DONE_ORDERPICKUPCOUNTS = 'DONE_ORDERPICKUPCOUNTS';		// 门店自提总数
export const DONE_ORDERPICKUPLIST = 'DONE_ORDERPICKUPLIST';		// 门店自提列表
export const DONE_ORDERPICKUPINFO = 'DONE_ORDERPICKUPINFO';		// 门店自提详情
export const DONE_ORDERPICKUPOPERA = 'DONE_ORDERPICKUPOPERA';		// 门店自提操作
export const DONE_VERIFYSKU = 'DONE_VERIFYSKU';		// 采购入库扫码
export const DONE_APPLYTYPE = 'DONE_APPLYTYPE';		// 采购类型
export const DONE_NEWAPPLMONAD = 'DONE_NEWAPPLMONAD';		// 新建采购单
export const DONE_PURCHASEHISTORY = 'DONE_PURCHASEHISTORY';		// 采购单历史 
export const DONE_NEWINSERTSTORAGE = 'DONE_NEWINSERTSTORAGE';		// 新建入库
export const DONE_WAREHISTORY = 'DONE_WAREHISTORY';		// 入库单历史
export const DONE_GETPOSCOUNT = 'DONE_GETPOSCOUNT';		// Tip汇总
export const DONE_GETPOSSKUUSESTOCK = 'DONE_GETPOSSKUUSESTOCK';		// 库存占用明细