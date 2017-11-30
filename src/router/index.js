import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'
//引用Router
Vue.use(Router)
export default new Router({
  linkActiveClass:'active',
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    }
  ]
})
