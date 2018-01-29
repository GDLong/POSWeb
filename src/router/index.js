import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Collection from '@/components/collection'
import SalesMemo from '@/components/salesMemo'
import OrderSelfYou from '@/components/orderSelfYou'
import Warning from '@/components/warning'
import Reported from '@/components/reported'
import Slassification from '@/components/classification'
import Procurement from '@/components/procurement'
import Warehousing from '@/components/warehousing'
import WareHistory from '@/components/wareHistory'
import PurchaseHistory from '@/components/purchaseHistory'
import RegisterOrderList from '@/components/registerOrderList'
import Login from '@/components/login'
import Subpanel from '@/components/subpanel'//副屏

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },{
      path: '/collection',
      name: 'Collection',
      component: Collection
    },{
      path: '/salesMemo',
      name: 'SalesMemo',
      component: SalesMemo
    },{
      path: '/warning',
      name: 'Warning',
      component: Warning
    },{
      path: '/reported',
      name: 'Reported',
      component: Reported
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/subpanel',
      name: 'Subpanel',
      component: Subpanel
    },{
      path: '/classification',
      name: 'Slassification',
      component: Slassification
    },{
      path: '/registerOrderList',
      name: 'RegisterOrderList',
      component: RegisterOrderList
    },{
      path: '/orderSelfYou',
      name: 'OrderSelfYou',
      component: OrderSelfYou
    },{
      path: '/procurement',
      name: 'Procurement',
      component: Procurement
    },{
      path: '/warehousing',
      name: 'Warehousing',
      component: Warehousing
    },{
      path: '/wareHistory',
      name: 'WareHistory',
      component: WareHistory
    },{
      path: '/purchaseHistory',
      name: 'PurchaseHistory',
      component: PurchaseHistory
    }
  ]
})
